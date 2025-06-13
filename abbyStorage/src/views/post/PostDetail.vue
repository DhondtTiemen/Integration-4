<template>
  <div v-bind="$attrs">
    <PageHeader :title="'Post'" :post="post ?? undefined" />

    <router-link
      :to="`/account/${user?.id}`"
      class="flex gap-4 items-center bg-white px-4 py-2"
    >
      <img
        :src="user?.avatar"
        alt="Avatar"
        class="w-12 h-12 rounded-full object-cover"
      />
      <p class="font-bold">{{ user?.name }}</p>
    </router-link>

    <div class="w-full max-w-md mx-auto">
      <div
        class="aspect-square bg-gray-300 flex justify-center items-center rounded-lg shadow-sm"
      >
        <img
          :src="post?.images[0]"
          alt="Post image"
          class="w-full h-full object-cover"
        />
        <Image v-if="!post?.images.length" class="w-24 h-24 text-gray-400" />
      </div>
    </div>

    <!-- ACTIONS -->
    <PostActions
      v-if="post"
      :postId="post?.id"
      :initial-likes="post?.likes"
      :commentsCount="post?.comments.length"
      :views="post?.views"
    />

    <div class="p-4 border-b border-gray-300">
      <p class="">{{ post?.content }}</p>
      <p class="text-gray-400 mt-2">
        {{ formatTimeAgo(post?.timestamp ?? "") }}
      </p>
    </div>

    <!-- TODO: COMMENTS -->
    <div
      class="p-4 border-b-2 border-gray-200 bg-white"
      v-if="post && !loading"
    >
      <div v-if="comments.length === 0" class="text-gray-400 py-2">
        No comments yet.
      </div>
      <div class="flex justify-between items-center">
        <p>{{ commentLabel }}</p>
      </div>

      <div class="flex gap-4 items-center mt-4">
        <div class="w-fit flex-shrink-0">
          <img
            :src="user?.avatar"
            alt="Avatar"
            class="w-12 h-12 rounded-full object-cover"
          />
        </div>
        <form @submit.prevent="handleSubmitComment" class="relative w-full">
          <input
            v-model="newCommentText"
            class="bg-gray-100 px-4 py-2 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-primary-500"
            name="comment"
            id="comment"
            type="text"
            placeholder="Add a comment..."
            enterkeyhint="send"
            autocomplete="off"
          />
          <button
            type="submit"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer bg-transparent border-0 p-0"
            :disabled="!newCommentText.trim()"
            aria-label="Submit comment"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="rotate-180"
              width="21"
              height="18"
              viewBox="0 0 21 18"
              fill="none"
            >
              <path
                d="M21 6.07521L4.34696 9.11281L21 12.1504L21 18L0.0393824 11.9026L-2.8975e-07 6.62871L21 0L21 6.07521Z"
                fill="#222222"
              />
            </svg>
          </button>
        </form>
      </div>

      <div
        class="flex gap-4 items-start mt-4"
        v-for="(comment, index) in comments"
        :key="index"
      >
        <router-link :to="`/account/${comment.userId}`">
          <img
            :src="commentUsers[comment.userId]?.avatar"
            alt="User avatar"
            class="w-12 h-12 rounded-full object-cover"
          />
        </router-link>
        <div>
          <div class="flex items-baseline gap-2">
            <router-link :to="`/account/${comment.userId}`">
              <p class="font-bold">@{{ commentUsers[comment.userId]?.name }}</p>
            </router-link>
            <!-- Usernaam kan je nog mappen als je wilt -->
            <p class="text-sm">{{ formatTimeAgo(comment.timestamp) }}</p>
          </div>
          <p class="text-sm">{{ comment.text }}</p>
          <div class="flex items-center gap-2 mt-2 text-sm">
            <div class="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="28"
                height="24"
                viewBox="0 0 28 25"
                fill="none"
                :class="[
                  commentLiking[comment.timestamp] ? 'animate-pulse' : '',
                  currentUserId
                    ? 'text-alphaPurple fill-alphaPurple stroke-alphaPurple'
                    : 'text-gray-600 stroke-black',
                ]"
                @click="toggleCommentLike(comment)"
                style="cursor: pointer"
              >
                <path
                  d="M11.4436 23.9877L16.5567 24C19.5793 21.4085 21.967 18.968 23.4492 17.3631C25.1715 15.4981 26.3404 13.1944 26.7822 10.708C27.1995 8.36087 27.0717 5.90859 25.9183 4.12869C23.1341 -0.168074 16.9841 0.0585967 14.3474 4.3125C14.2944 4.39823 14.2338 4.48162 14.1922 4.57499C14.147 4.67658 14.0126 5.02892 14.0001 5.0618C14.0001 5.0618 13.8557 4.66777 13.8081 4.56266C13.7695 4.47751 13.7148 4.40117 13.6666 4.32248C11.037 0.0474394 4.87039 -0.18804 2.08141 4.11636C1.18365 5.50164 0.907191 7.29504 1.0261 9.12896C1.22765 12.2466 2.57428 15.1839 4.75862 17.443C6.31691 19.0543 8.70577 21.4585 11.4436 23.9877Z"
                  stroke-width="2"
                />
              </svg>
              <p>{{ comment.likes ? comment.likes.length : 0 }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Image } from "lucide-vue-next";
import { ref, onMounted, computed } from "vue";
import { useRoute } from "vue-router";

import PageHeader from "../../components/layout/PageHeader.vue";
import PostActions from "../../components/post/PostActions.vue";

import type User from "../../interfaces/interface.user";
import type Post from "../../interfaces/interface.post";

import {
  getPostById,
  // hasUserLikedComment,
  toggleLikeForComment,
  fetchCommentAuthors,
  addCommentToPost,
} from "../../firebase/postService";

import { getUserById } from "../../firebase/userService";
import { formatTimeAgo } from "../../utils/date";

// Top-level refs and constants
const route = useRoute();
const currentUserId = String(route.params.id);

const loading = ref(true);
const post = ref<Post | null>(null);
const user = ref<User | null>(null);
const newCommentText = ref("");
const commentUsers = ref<Record<string, any>>({});
const commentLiking = ref<{ [key: string]: boolean }>({});

// Computed properties
const comments = computed<Comment[]>(() => {
  if (!post.value?.comments) return [];
  return [...post.value.comments].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
});

const commentsCount = computed(() => comments.value.length);

const commentLabel = computed(
  () => `${commentsCount.value} comment${commentsCount.value !== 1 ? "s" : ""}`
);

// Lifecycle hook
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
});

// TODO: Fix this stupid Heart thing
// Helper functions
// function hasUserLikedComment(commentLikes: string[], userId: string | null) {
//   if (!userId) return false;
//   return commentLikes.includes(userId);
// }

async function toggleCommentLike(comment: Comment) {
  if (!currentUserId || !post.value || !post.value.comments) return;

  commentLiking.value[comment.timestamp] = true;

  await toggleLikeForComment(
    currentUserId,
    comment,
    String(user.value?.id),
    post.value.comments
  );

  setTimeout(() => {
    commentLiking.value[comment.timestamp] = false;
  }, 400);
}

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
  if (!newCommentText.value.trim() || !user.value || !post.value) return;

  const comment: Comment = {
    userId: String(user.value.id),
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
