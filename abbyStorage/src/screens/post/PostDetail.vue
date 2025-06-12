<template>
  <div v-bind="$attrs">
    <nav class="relative flex items-center justify-between p-4 bg-alphaYellow">
      <svg @click="goBack" xmlns="http://www.w3.org/2000/svg" width="21" height="18" viewBox="0 0 21 18" fill="none">
        <path d="M21 6.07521L4.34696 9.11281L21 12.1504L21 18L0.0393824 11.9026L-2.8975e-07 6.62871L21 0L21 6.07521Z"
          fill="#222222" />
      </svg>
      <p class="absolute left-1/2 transform -translate-x-1/2 text-center font-medium">
        Post
      </p>
      <button @click="sharePost">
        <Share class="z-10" />
      </button>
    </nav>

    <router-link :to="`/account/${user?.id}`" class="flex gap-4 items-center bg-white px-4 py-2">
      <img :src="user?.avatar" alt="Avatar" class="w-12 h-12 rounded-full object-cover" />
      <p class="font-bold">{{ user?.name }}</p>
    </router-link>

    <div class="w-full max-w-md mx-auto">
      <div class="aspect-square bg-gray-300 flex justify-center items-center rounded-lg shadow-sm">
        <img :src="post?.images[0]" alt="Post image" class="w-full h-full object-cover" />
        <Image v-if="!post?.images.length" class="w-24 h-24 text-gray-400" />
      </div>
    </div>

    <div class="flex justify-between items-center mt-4 px-4">
      <!-- Left/center group -->
      <div class="flex gap-4 justify-center">
        <button class="flex items-center gap-2 mb-0.5" @click="togglePostLike">
          <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 28 25" fill="none" :class="[
            isLiking ? 'animate-like' : '',
            hasLikedPost() ? 'text-alphaPurple fill-alphaPurple stroke-alphaPurple' : 'text-gray-600 stroke-black'
          ]">
            <path
              d="M11.4436 23.9877L16.5567 24C19.5793 21.4085 21.967 18.968 23.4492 17.3631C25.1715 15.4981 26.3404 13.1944 26.7822 10.708C27.1995 8.36087 27.0717 5.90859 25.9183 4.12869C23.1341 -0.168074 16.9841 0.0585967 14.3474 4.3125C14.2944 4.39823 14.2338 4.48162 14.1922 4.57499C14.147 4.67658 14.0126 5.02892 14.0001 5.0618C14.0001 5.0618 13.8557 4.66777 13.8081 4.56266C13.7695 4.47751 13.7148 4.40117 13.6666 4.32248C11.037 0.0474394 4.87039 -0.18804 2.08141 4.11636C1.18365 5.50164 0.907191 7.29504 1.0261 9.12896C1.22765 12.2466 2.57428 15.1839 4.75862 17.443C6.31691 19.0543 8.70577 21.4585 11.4436 23.9877Z"
              stroke-width="2" />
          </svg>
          <p>{{ post?.likes.length }}</p>
        </button>
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26" fill="none">
            <path d="M23 1.5H1V17.5507H5.3048V23.5L11.7703 17.5507H23V1.5Z" stroke="#222222" stroke-width="2" />
          </svg>
          <p>{{ post?.comments.length }}</p>
        </div>
      </div>

      <!-- Eye (fully right-aligned) -->
      <div class="flex items-center gap-2">
        <Eye class="w-8 h-8 text-gray-600" />
        <p>{{ post?.views }}</p>
      </div>
    </div>

    <div class="p-4 border-b border-gray-300">
      <p class="">{{ post?.content }}</p>
      <p class="text-gray-400 mt-2">{{ timeAgo(post?.timestamp ?? "") }}</p>
    </div>
    <div class="p-4 border-b-2 border-gray-200 bg-white" v-if="user && !loading">
      <div class="flex justify-between items-center">
        <p>{{ commentsCount }} comment{{ commentsCount !== 1 ? "s" : "" }}</p>
        <!-- <p class="text-primary-600 font-semibold">See all</p> -->
      </div>

      <div class="flex gap-4 items-center mt-4">
        <div class="w-fit flex-shrink-0">
          <img :src="user?.avatar" alt="Avatar" class="w-12 h-12 rounded-full object-cover" />
        </div>
        <form @submit.prevent="submitComment" class="relative w-full">
          <input v-model="newCommentText"
            class="bg-gray-100 rounded-xl px-4 py-2 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-primary-500"
            name="comment" id="comment" type="text" placeholder="Add a comment..." enterkeyhint="send"
            autocomplete="off" />
          <button type="submit"
            class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer bg-transparent border-0 p-0"
            :disabled="!newCommentText.trim()" aria-label="Submit comment">
            <SendHorizonal class="w-6 h-6 text-gray-600" />
          </button>
        </form>
      </div>

      <div class="flex gap-4 items-start mt-4" v-for="(comment, index) in comments" :key="index">
        <router-link :to="`/account/${comment.userId}`">
          <!-- Als je avatars van gebruikers beschikbaar hebt, kun je die hier dynamisch laden -->
          <img :src="getUserInfo(comment.userId).avatar" alt="User avatar"
            class="w-12 h-12 rounded-full object-cover" />
        </router-link>
        <div>
          <div class="flex items-baseline gap-2">
            <router-link :to="`/account/${comment.userId}`">
              <p class="font-bold">@{{ getUserInfo(comment.userId).name }}</p>
            </router-link>
            <!-- Usernaam kan je nog mappen als je wilt -->
            <p class="text-sm">{{ timeAgo(comment.timestamp) }}</p>
          </div>
          <p class="text-sm">{{ comment.text }}</p>
          <div class="flex items-center gap-2 mt-2 text-sm">
            <div class="flex items-center gap-1">
              <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 28 25" fill="none" :class="[
                commentLiking[index] ? 'animate-like' : '',
                hasLikedComment(comment) ? 'text-alphaPurple fill-alphaPurple stroke-alphaPurple' : 'text-gray-600 stroke-black'
              ]" @click="toggleCommentLike(comment, index)" style="cursor:pointer">
                <path
                  d="M11.4436 23.9877L16.5567 24C19.5793 21.4085 21.967 18.968 23.4492 17.3631C25.1715 15.4981 26.3404 13.1944 26.7822 10.708C27.1995 8.36087 27.0717 5.90859 25.9183 4.12869C23.1341 -0.168074 16.9841 0.0585967 14.3474 4.3125C14.2944 4.39823 14.2338 4.48162 14.1922 4.57499C14.147 4.67658 14.0126 5.02892 14.0001 5.0618C14.0001 5.0618 13.8557 4.66777 13.8081 4.56266C13.7695 4.47751 13.7148 4.40117 13.6666 4.32248C11.037 0.0474394 4.87039 -0.18804 2.08141 4.11636C1.18365 5.50164 0.907191 7.29504 1.0261 9.12896C1.22765 12.2466 2.57428 15.1839 4.75862 17.443C6.31691 19.0543 8.70577 21.4585 11.4436 23.9877Z"
                  stroke-width="2" />
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
import {
  CircleUserRound,
  ArrowLeft,
  Image,
  Share2,
  Star,
  Heart,
  Share,
  MessageSquare,
  Eye,
  SendHorizonal,
} from "lucide-vue-next";
import { ref, onMounted, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import type User from "../../interfaces/interface.user";
import type Post from "../../interfaces/interface.post";
const route = useRoute();
const router = useRouter();

const postId = route.params.id;
const loading = ref(true);
const post = ref<Post | null>(null);
const user = ref<User | null>(null);
const users = ref<User[]>([]); // alle users om usernames en avatars op te halen
const newCommentText = ref("");
const myUserId = localStorage.getItem("userId") 
const isLiking = ref(false);

const commentLiking = ref<{ [key: number]: boolean }>({});

function hasLikedComment(comment: any) {
  const myUserId = Number(localStorage.getItem("userId"));
  return comment.likes && comment.likes.includes(myUserId);
}
function toggleCommentLike(comment: any, index: number) {
  const myUserId = localStorage.getItem("userId");
  if (!comment.likes) comment.likes = [];
  const idx = comment.likes.indexOf(myUserId);
  if (idx === -1) {
    comment.likes.push(myUserId);
  } else {
    comment.likes.splice(idx, 1);
  }
  // Trigger animatie
  commentLiking.value[index] = true;
  setTimeout(() => {
    commentLiking.value[index] = false;
  }, 400);
}

function hasLikedPost() {
  return post.value?.likes && post.value.likes.includes(myUserId ?? "");
}

function togglePostLike() {
  if (!post.value) return;
  if (!post.value.likes) post.value.likes = [];
  const idx = post.value.likes.indexOf(myUserId ?? "");
  if (idx === -1) {
    post.value.likes.push(myUserId ?? "");
  } else {
    post.value.likes.splice(idx, 1);
  }
  isLiking.value = true;
  setTimeout(() => {
    isLiking.value = false;
  }, 400);
}
function timeAgo(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
}

// Haal de naam en avatar op van een user op basis van id
function getUserInfo(userId: string) {
  const foundUser = users.value.find((u) => u.id === userId);
  if (!foundUser) {
    return {
      name: "Unknown",
      avatar: "default-avatar.jpg", // fallback avatar
    };
  }
  return {
    name: foundUser.name,
    avatar: foundUser.avatar,
  };
}
async function fetchData() {
  try {
    const usersResponse = await fetch("/src/assets/data/users.json");
    const postsResponse = await fetch("/src/assets/data/posts.json");

    if (!usersResponse.ok || !postsResponse.ok) {
      throw new Error("Failed to fetch users or events");
    }

    const usersData = await usersResponse.json();
    const postsData = await postsResponse.json();

    user.value = usersData.users.find((u: User) => u.id === postId) || null;

    users.value = usersData.users;
    const foundPost = postsData.posts.find((p: Post) => p.id === postId);
    if (foundPost) {
      post.value = foundPost;
      user.value =
        usersData.users.find((u: User) => u.id === foundPost.userId) || null;
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

function submitComment() {
  if (!newCommentText.value.trim() || !post.value) return;

  const newComment = {
    userId: String(user.value?.id || ""),
    text: newCommentText.value.trim(),
    timestamp: new Date().toISOString(),
    likes: [],
  };

  post.value.comments.push(newComment);
  newCommentText.value = "";
}

function goBack() {
  router.back();
}

function sharePost() {
  if (navigator.share && post.value) {
    navigator
      .share({
        title: "Check out this post",
        text: post.value.content,
        url: window.location.href,
      })
      .catch((err) => {
        console.warn("Share canceled or failed:", err);
      });
  } else {
    alert("Sharing not supported in this browser.");
  }
}

onMounted(() => {
  fetchData();
});
const comments = computed(() => {
  if (!post.value?.comments) return [];
  return [...post.value.comments].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
});
const commentsCount = computed(() => comments.value.length);
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
  animation: pop 0.4s cubic-bezier(.36, 1.64, .56, 1) both;
}
</style>