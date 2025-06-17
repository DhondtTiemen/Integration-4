<!-- filepath: d:\Integration-4\abbyStorage\src\views\post\PostDetail.vue -->
<template>
    <Popup :visible="showPopup" @close="showPopup = false" />

  <div v-bind="$attrs" class="pb-16">
    <PageHeader :title="'Post'" :post="post ?? undefined" />

    <router-link :to="`/account/${user?.id}`" class="flex gap-4 items-center bg-white px-4 py-2">
      <img :src="user?.avatar" alt="Avatar" class="w-12 h-12 rounded-full object-cover" />
      <p class="font-bold">{{ user?.name }}</p>
    </router-link>

    <PostImages v-if="post?.images?.length" :images="post.images" :postId="post?.id" />

    <div class="p-4 border-b border-gray-300">
      <p class="pb-2">{{ post?.content }}</p>
      <p>Created in {{ post?.location }}</p>
      <p class="text-gray-600 mt-2">
        {{ formatTimeAgo(post?.timestamp ?? "") }}
      </p>
    </div>

    <PostActions v-if="post" :postId="post?.id" :initial-likes="post?.likes" :commentsCount="post?.comments.length"
      :views="post?.views" />

    <div class="p-4 border-b-2 border-gray-200 bg-white" v-if="post && !loading">

      <div class="flex justify-between items-center">
        <p>{{ commentLabel }}</p>
      </div>

      <div class="flex gap-4 items-center mt-4">
        <div class="w-12">
          <ImageTemplate :path="currentUser?.avatar" :screen="'nav'" />

        </div>
        <form @submit.prevent="handleSubmitComment" class="relative w-full">
          <input v-model="newCommentText"
            class="bg-gray-100 px-4 py-2 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-primary-500"
            name="comment" id="comment" type="text" placeholder="Add a comment..." enterkeyhint="send"
            autocomplete="off" />
          <button type="submit"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer bg-transparent border-0 p-0"
            :disabled="!newCommentText.trim()" aria-label="Submit comment">
            <svg xmlns="http://www.w3.org/2000/svg" class="rotate-180" width="21" height="18" viewBox="0 0 21 18"
              fill="none">
              <path
                d="M21 6.07521L4.34696 9.11281L21 12.1504L21 18L0.0393824 11.9026L-2.8975e-07 6.62871L21 0L21 6.07521Z"
                fill="#222222" />
            </svg>
          </button>
        </form>
      </div>

      <div class="flex gap-4 items-start mt-4" v-for="(comment, index) in comments" :key="index">
        <router-link :to="`/account/${comment.userId}`">
          <img :src="commentUsers[comment.userId]?.avatar" alt="User avatar"
            class="w-12 h-12 rounded-full object-cover" />
        </router-link>
        <div>
          <div class="flex items-baseline gap-2">
            <router-link :to="`/account/${comment.userId}`">
              <p class="font-bold">@{{ commentUsers[comment.userId]?.name }}</p>
            </router-link>
            <p class="text-sm">{{ formatTimeAgo(comment.timestamp) }}</p>
          </div>
          <p class="text-sm">{{ comment.text }}</p>
          <div class="flex items-center gap-2 mt-2 text-sm">
            <button class="flex items-center gap-1" @click="handleToggleCommentLike(comment, index)"
              :aria-pressed="hasLikedComment(comment)" :disabled="commentLiking[index]" style="
                background: none;
                border: none;
                padding: 0;
                cursor: pointer;
              ">
              <HeartOutline :class="[
                commentLiking[index] ? 'animate-like' : '',
                hasLikedComment(comment)
                  ? 'text-alphaPurple fill-alphaPurple stroke-alphaPurple'
                  : 'text-gray-600 stroke-black',
              ]" />
              <p>{{ comment.likes ? comment.likes.length : 0 }}</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";
import Popup from "../../components/generic/popUp.vue";

import PageHeader from "../../components/layout/PageHeader.vue";
import PostActions from "../../components/post/PostActions.vue";
import PostImages from "../../components/post/PostImages.vue";
import ImageTemplate from "/src/components/images/ImageTemplate.vue";

import type User from "../../interfaces/interface.user";
import type Post from "../../interfaces/interface.post";

import {
  getPostById,
  toggleLikeForComment,
  fetchCommentAuthors,
  addCommentToPost,
} from "../../firebase/postService";
import { getUserById } from "../../firebase/userService";
import { formatTimeAgo } from "../../utils/date";
import HeartOutline from "../../assets/icons/HeartOutline.vue";

const route = useRoute();
const currentUserId = String(route.params.id);
const storedIdRaw = localStorage.getItem("userId");
const loading = ref(true);
const post = ref<Post | null>(null);
const user = ref<User | null>(null);
const newCommentText = ref("");
const commentUsers = ref<Record<string, any>>({});
const commentLiking = ref<{ [key: string]: boolean }>({});
const currentUser = ref<User | null>(null);
const showPopup = ref(false);

const comments = computed(() => {
  if (!post.value?.comments) return [];
  return [...post.value.comments].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
});
function hasLikedComment(comment: any) {
  return (
    storedIdRaw !== null &&
    (comment.likes || []).map(String).includes(String(storedIdRaw))
  );
}
async function handleToggleCommentLike(comment: any, index: number) {
  if (!post.value?.id) return;
        if (!storedIdRaw) {
    console.error("User ID not found in localStorage");
    showPopup.value = true; // Show popup if user is not logged in

    return;
  }
  commentLiking.value[index] = true;
  try {
    await toggleLikeForComment(
      post.value.id,
      comment,
      storedIdRaw,
      comments.value
    );
  } catch (err) {
    console.error("Failed to update comment likes in Firestore", err);
  } finally {
    setTimeout(() => {
      commentLiking.value[index] = false;
    }, 400);
  }
}
const commentsCount = computed(() => comments.value.length);

const commentLabel = computed(
  () => `${commentsCount.value} comment${commentsCount.value !== 1 ? "s" : ""}`
);

onMounted(async () => {
  if (!currentUserId) return;

  post.value = await getPostById(currentUserId);

  if (post.value?.userId) {
    user.value = await getUserById(post.value.userId);
  }

  if (post.value?.comments) {
    await preloadCommentUsers(post.value.comments);
  }

  loading.value = false;

  if (!currentUser.value) {
    currentUser.value = await getUserById(String(storedIdRaw));
  }
});

async function preloadCommentUsers(commentsArr: any) {
  commentUsers.value = await fetchCommentAuthors(commentsArr);
}

type Comment = {
  userId: string;
  text: string;
  timestamp: string;
  likes: string[];
};

async function handleSubmitComment() {
  if (!storedIdRaw) {
    console.error("User ID not found in localStorage");
    showPopup.value = true; // Show popup if user is not logged in
    return;
  }
  if (!newCommentText.value.trim() || !user.value || !post.value) return;
  // console.log("userid", user.value.id);
  const comment: Comment = {
    userId: String(storedIdRaw),
    text: newCommentText.value.trim(),
    timestamp: new Date().toISOString(),
    likes: [],
  };

  try {
    await addCommentToPost(post.value.id, comment, post.value.comments);
    newCommentText.value = "";
    await preloadCommentUsers(post.value.comments);
  } catch (err) {
    console.error("Failed to update comments in Firestore", err);
  }
}
</script>
<style scoped>
@keyframes pop {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.4);
  }

  100% {
    transform: scale(1);
  }
}

.animate-like {
  animation: pop 0.4s cubic-bezier(0.36, 1.64, 0.56, 1) both;
}
</style>
