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
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-auto stroke-alphaDark"
          viewBox="0 0 28 25"
          fill="none"
          :class="[
            isLiking ? 'animate-like' : '',
            hasLiked()
              ? 'text-alphaPurple fill-alphaPurple stroke-alphaPurple'
              : 'text-gray-400 stroke-alphaDark',
          ]"
        >
          <path
            d="M11.4436 23.9877L16.5567 24C19.5793 21.4085 21.967 18.968 23.4492 17.3631C25.1715 15.4981 26.3404 13.1944 26.7822 10.708C27.1995 8.36087 27.0717 5.90859 25.9183 4.12869C23.1341 -0.168074 16.9841 0.0585967 14.3474 4.3125C14.2944 4.39823 14.2338 4.48162 14.1922 4.57499C14.147 4.67658 14.0126 5.02892 14.0001 5.0618C14.0001 5.0618 13.8557 4.66777 13.8081 4.56266C13.7695 4.47751 13.7148 4.40117 13.6666 4.32248C11.037 0.0474394 4.87039 -0.18804 2.08141 4.11636C1.18365 5.50164 0.907191 7.29504 1.0261 9.12896C1.22765 12.2466 2.57428 15.1839 4.75862 17.443C6.31691 19.0543 8.70577 21.4585 11.4436 23.9877Z"
            stroke-width="2"
          />
        </svg>
        {{ likes.length }}
      </button>

      <!-- POST - CONTENT - ACTIONS - COMMENTS -->
      <router-link :to="`/post/${postId}`" class="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-auto stroke-alphaDark"
          viewBox="0 0 24 26"
          fill="none"
        >
          <path
            d="M23 1.5H1V17.5507H5.3048V23.5L11.7703 17.5507H23V1.5Z"
            stroke-width="2"
          />
        </svg>
        <p v-if="commentsCount > 0">{{ commentsCount }}</p>
      </router-link>
    </div>

    <!-- POST - CONTENT - ACTIONS - VIEWS -->
    <div class="flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-5 w-auto fill-alphaDark"
        viewBox="0 0 30 21"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0.356776 9.38611C4.42329 3.55705 9.69595 0.500488 14.9782 0.500488C21.182 0.500488 26.526 4.54205 29.6789 9.41164L29.6804 9.41393C29.8891 9.73812 30 10.1155 30 10.501C30 10.8859 29.8895 11.2626 29.6815 11.5864C26.5314 16.5187 21.2219 20.4997 14.9782 20.4997C8.66806 20.4997 3.46094 16.5269 0.31851 11.609C0.104986 11.2774 -0.00576109 10.8901 0.000230905 10.4958C0.0062378 10.1004 0.129296 9.71575 0.353855 9.39032L0.356776 9.38611ZM1.99993 10.5262L2.0027 10.5305C4.90516 15.0738 9.55713 18.4998 14.9782 18.4998C20.3386 18.4998 25.0908 15.0593 27.9968 10.5088L27.9987 10.5058C27.9996 10.5044 28.0001 10.5027 28.0001 10.501C28.0001 10.5003 28 10.4996 27.9998 10.4989C27.9996 10.4981 27.9993 10.4973 27.9988 10.4965C25.0818 5.99247 20.2907 2.50041 14.9782 2.50041C10.5195 2.50041 5.8001 5.08105 1.99993 10.5262Z"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14.9995 6.50017C12.7905 6.50017 10.9997 8.29096 10.9997 10.5C10.9997 12.7091 12.7905 14.4998 14.9995 14.4998C17.2086 14.4998 18.9994 12.7091 18.9994 10.5C18.9994 8.29096 17.2086 6.50017 14.9995 6.50017ZM8.99976 10.5C8.99976 7.18643 11.6859 4.50024 14.9995 4.50024C18.3131 4.50024 20.9993 7.18643 20.9993 10.5C20.9993 13.8136 18.3131 16.4998 14.9995 16.4998C11.6859 16.4998 8.99976 13.8136 8.99976 10.5Z"
        />
      </svg>
      <p>{{ views }}</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import db from "../../firebase/init.ts";

import {
  collection,
  addDoc,
  setDoc,
  doc,
  query,
  getDocs,
  where,
  getDoc,
  updateDoc,
} from "firebase/firestore";
const props = defineProps<{
  postId: string;
  initialLikes: string[]; // vervangt 'likes'
  commentsCount: number;
  views: number;
}>();

const storedIdRaw = localStorage.getItem("userId");
const likes = ref<string[]>([...props.initialLikes]);
const isLiking = ref(false);
// const postLikes = computed(() => likes.value?.map(String) ?? []);

function hasLiked() {
  return storedIdRaw !== null && likes.value.includes(String(storedIdRaw));
}

async function toggleLike() {
  if (!props.postId || !storedIdRaw) return;
  const userIdStr = String(storedIdRaw);
  const idx = likes.value.indexOf(userIdStr);
  if (idx === -1) {
    likes.value.push(userIdStr);
  } else {
    likes.value.splice(idx, 1);
  }
  isLiking.value = true;
  setTimeout(() => {
    isLiking.value = false;
  }, 400);

  try {
    const postRef = doc(db, "posts", props.postId);
    await updateDoc(postRef, {
      likes: [...likes.value],
    });
    console.log("Post likes updated in Firestore:", likes.value);
  } catch (err) {
    console.error("Failed to update post likes in Firestore", err);
  }
}
</script>
