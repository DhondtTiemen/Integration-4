<template>
  <div v-bind="$attrs">
    <nav class="relative flex items-center justify-between p-4 bg-alphaYellow">
      <svg
        @click="goBack"
        xmlns="http://www.w3.org/2000/svg"
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
      <p
        class="absolute left-1/2 transform -translate-x-1/2 text-center font-medium"
      >
        Post
      </p>
      <button @click="sharePost">
        <Share class="z-10" />
      </button>
    </nav>

    <div class="flex gap-4 items-center bg-white px-4 py-2">
      <img
        :src="user?.avatar"
        alt="Avatar"
        class="w-12 h-12 rounded-full object-cover"
      />
      <p class="font-bold">{{ user?.name }}</p>
    </div>

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

    <div class="flex justify-between items-center mt-4 px-4">
      <!-- Left/center group -->
      <div class="flex gap-4 justify-center">
        <div class="flex items-center gap-2">
          <Heart class="w-8 h-8 text-gray-600" />
          <p>{{ post?.likes.length }}</p>
        </div>
        <div class="flex items-center gap-2">
          <MessageSquare class="w-8 h-8 text-gray-600" />
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
    <div
      class="p-4 border-b-2 border-gray-200 bg-white"
      v-if="user && !loading"
    >
      <div class="flex justify-between items-center">
        <p>{{ commentsCount }} comment{{ commentsCount !== 1 ? "s" : "" }}</p>
        <p class="text-primary-600 font-semibold">See all</p>
      </div>

      <div class="flex gap-4 items-center mt-4">
        <div class="w-fit flex-shrink-0">
          <img
            :src="user?.avatar"
            alt="Avatar"
            class="w-12 h-12 rounded-full object-cover"
          />
        </div>
        <div class="relative w-full">
          <textarea
            v-model="newCommentText"
            class="bg-gray-100 rounded-xl px-4 py-2 pr-10 w-full resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
            name="comment"
            id="comment"
            rows="1"
            placeholder="Add a comment..."
          ></textarea>

          <SendHorizonal
            class="w-6 h-6 text-gray-600 absolute right-3 top-5 transform -translate-y-1/2 cursor-pointer"
            @click="submitComment"
          />
        </div>
      </div>

      <div
        class="flex gap-4 items-start mt-4"
        v-for="(comment, index) in comments"
        :key="index"
      >
        <div>
          <!-- Als je avatars van gebruikers beschikbaar hebt, kun je die hier dynamisch laden -->
          <img
            :src="getUserInfo(comment.userId).avatar"
            alt="User avatar"
            class="w-12 h-12 rounded-full object-cover"
          />
        </div>
        <div>
          <div class="flex items-baseline gap-2">
            <p class="font-bold">@{{ getUserInfo(comment.userId).name }}</p>
            <!-- Usernaam kan je nog mappen als je wilt -->
            <p class="text-sm">{{ timeAgo(comment.timestamp) }}</p>
          </div>
          <p class="text-sm">{{ comment.text }}</p>
          <div class="flex items-center gap-2 mt-2 text-sm">
            <div class="flex items-center gap-1">
              <Heart class="w-6 h-6 text-gray-600" />
              <p>{{ comment.likes.length }}</p>
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

const postId = Number(route.params.id);
const loading = ref(true);
const post = ref<Post | null>(null);
const user = ref<User | null>(null);
const users = ref<User[]>([]); // alle users om usernames en avatars op te halen
const newCommentText = ref("");

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
function getUserInfo(userId: number) {
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
    console.log(foundPost);
    if (foundPost) {
      post.value = foundPost;
      user.value =
        usersData.users.find((u: User) => u.id === foundPost.userId) || null;
      console.log(user);
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
    userId: user.value?.id || 0,
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
const comments = computed(() => post.value?.comments || []);
const commentsCount = computed(() => comments.value.length);
</script>
