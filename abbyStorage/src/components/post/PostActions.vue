<template>
  <!-- POST - CONTENT - ACTIONS -->
  <div class="flex items-center justify-between mt-6 px-4">
    <div class="flex items-center gap-6">
      <!-- POST - CONTENT - ACTIONS - LIKES -->
      <button
        aria-label="Like post"
        class="flex items-center gap-2 mb-0.5"
        @click="toggleLike"
      >
        <HeartOutline :class="[
            isLiking ? 'animate-like' : '',
            hasLiked()
              ? 'text-alphaPurple fill-alphaPurple stroke-alphaPurple'
              : 'text-gray-400 stroke-alphaDark',
          ]"/>
        {{ likes.length }}
      </button>

      <!-- POST - CONTENT - ACTIONS - COMMENTS -->
      <router-link :to="`/post/${postId}`" class="flex items-center gap-2">
        <TextBalloon class="h-6 w-auto stroke-alphaDark"/>
        <p v-if="commentsCount > 0">{{ commentsCount }}</p>
      </router-link>
    </div>

    <!-- POST - CONTENT - ACTIONS - VIEWS -->
    <div class="flex items-center gap-2">
      <Eye class="h-6 w-auto"/>
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

const props = defineProps<{
  postId: string;
  initialLikes: string[]; 
  commentsCount: number;
  views: number;
}>();

const likes = ref<string[]>(props.initialLikes?.map(String) || []);

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
  if (!props.postId || !storedId.value) return;
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
