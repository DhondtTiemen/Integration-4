<template>
  <div class="flex items-center justify-between mt-6 px-4">
    <Popup :visible="showPopup" @close="showPopup = false" />
    <div class="flex items-center gap-6">
      <!-- POST - CONTENT - ACTIONS - LIKES -->
      <button
        aria-label="Like post"
        class="flex items-center gap-2 mb-0.5 "
        @click="toggleLike"
      >
        <HeartOutline
          :class="[
            isLiking ? 'animate-like' : '',
            hasLiked()
              ? 'text-alphaPurple fill-alphaPurple stroke-alphaPurple'
              : 'text-gray-400 stroke-alphaDark',
            'h-6 w-auto align-middle',
          ]"
        />
        <span class="leading-none">{{ likes.length }}</span>
      </button>

      <!-- POST - CONTENT - ACTIONS - COMMENTS -->
      <router-link
        :to="`/post/${postId}`"
        class="flex items-center gap-2"
        aria-label="View comments"
      >
        <TextBalloon class="h-6 w-auto stroke-alphaDark align-middle" />
        <span class="leading-none">{{ commentsCount }}</span>
      </router-link>

      <button @click="shareEvent" class="flex items-center pb-1">
        <svg
          width="24"
          height="24"
          viewBox="0 0 28 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M25 14.3308L24.0557 15.2331L19.4372 19.6465L14.189 24.6616V18.1791C14.0809 18.1757 13.9723 18.1742 13.8634 18.1742C8.41632 18.1742 3.91046 22.0102 3.16178 27C2.41667 25.4981 2 23.8197 2 22.0488C2 15.6384 7.45726 10.4419 14.189 10.4419V4L25 14.3308Z"
            stroke="black"
            stroke-width="3"
            stroke-miterlimit="10"
          />
        </svg>
      </button>
    </div>

    <!-- POST - CONTENT - ACTIONS - VIEWS -->
    <div class="flex items-center gap-2">
      <Eye class="h-6 w-auto" />
      <p>{{ views }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import {
  toggleLikeForPost,
  hasUserLikedPost,
} from "../../firebase/postService";
import Eye from "../../assets/icons/Eye.vue";
import TextBalloon from "../../assets/icons/TextBalloon.vue";
import HeartOutline from "../../assets/icons/HeartOutline.vue";
import Popup from "../../components/generic/popUp.vue";

const showPopup = ref(false);

const props = defineProps<{
  postId: string;
  initialLikes: string[];
  commentsCount: number;
  views: number;
  url?: string;
  postTitle?: string;
}>();

const likes = ref<string[]>(props.initialLikes?.map(String) || []);
function shareEvent() {
  if (navigator.share && props.postTitle) {
    navigator
      .share({
        title: "Check out this event",
        text: props.postTitle,
        url: props.url,
      })
      .catch((err) => {
        console.warn("Share canceled or failed:", err);
      });
  } else {
    alert("Sharing not supported in this browser.");
  }
}
watch(
  () => props.initialLikes,
  (newLikes) => {
    likes.value = newLikes ? newLikes.map(String) : [];
  }
);

const storedId = ref<string | null>(localStorage.getItem("userId"));
const isLiking = ref(false);

function hasLiked() {
  return hasUserLikedPost(likes.value, storedId.value);
}

async function toggleLike() {
  if (!props.postId) return;
  if (!storedId.value) {
    console.error("User ID not found in localStorage");
    showPopup.value = true; // Show popup if user is not logged in

    return;
  }
  isLiking.value = true;
  await toggleLikeForPost(props.postId, storedId.value, likes);

  setTimeout(() => {
    isLiking.value = false;
  }, 400);
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
