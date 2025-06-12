<template>
  <!-- Post -->
  <div class="border-b border-gray-400">
    <div class="p-4">
      <!-- POST - HEADER -->

      <!-- USER INFO -->
      <div class="flex items-center justify-between mb-6">
        <router-link :to="`/account/${user?.id}`" class="flex items-center">
          <img
            :src="user?.avatar"
            alt="avatar"
            class="w-16 h-16 rounded-full mr-6"
          />
          <div>
            <p class="font-bold text-lg">{{ user?.name }}</p>
            <p class="text-base font-medium text-gray-400">
              {{ formatTimeAgo(post?.timestamp) }}
              <span v-if="post?.location"> • {{ post?.location }}</span>
            </p>
          </div>
        </router-link>

        <!-- USER INFO - REPORT BUTTON -->
        <div class="relative">
          <button @click="emit('toggle-options', post?.id)">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-6 w-auto fill-alphaDark"
              viewBox="0 0 30 30"
            >
              <path
                d="M15 17.8125C16.5533 17.8125 17.8125 16.5533 17.8125 15C17.8125 13.4467 16.5533 12.1875 15 12.1875C13.4467 12.1875 12.1875 13.4467 12.1875 15C12.1875 16.5533 13.4467 17.8125 15 17.8125Z"
              />
              <path
                d="M24.375 17.8125C25.9283 17.8125 27.1875 16.5533 27.1875 15C27.1875 13.4467 25.9283 12.1875 24.375 12.1875C22.8217 12.1875 21.5625 13.4467 21.5625 15C21.5625 16.5533 22.8217 17.8125 24.375 17.8125Z"
              />
              <path
                d="M5.625 17.8125C7.1783 17.8125 8.4375 16.5533 8.4375 15C8.4375 13.4467 7.1783 12.1875 5.625 12.1875C4.0717 12.1875 2.8125 13.4467 2.8125 15C2.8125 16.5533 4.0717 17.8125 5.625 17.8125Z"
              />
            </svg>
          </button>
          <div
            v-if="showOptionsId === post?.id"
            class="absolute top-6 right-0 bg-white border z-10 border-gray-400"
          >
            <button
              @click="emit('report-post', post?.id)"
              class="block px-4 py-2.5 text-red-600 w-full"
            >
              Report Post
            </button>
          </div>
        </div>
      </div>

      <!-- POST - CONTENT -->
      <router-link :to="`/post/${post?.id}`" class="block">
        <!-- Description -->
        <p class="mb-4">{{ post?.content }}</p>

        <!-- Images -->
        <div v-if="post?.images?.length === 1" class="mb-6">
          <!-- TODO: Images: Check routes + check if 2 images are next to each other -->
          <!-- <img :src="'/assets/posts/' + post?.images[0]" alt="post image" class="w-full" /> -->
          <img
            :src="'https://images.pexels.com/photos/7585762/pexels-photo-7585762.jpeg'"
            alt="post image"
            class="w-full h-80 object-cover m-auto"
          />
        </div>
        <div
          v-else-if="post?.images?.length > 1"
          class="grid grid-cols-2 gap-2 mb-6"
        >
          <img
            v-for="img in post?.images"
            :key="img"
            :src="'/assets/images/' + img"
            class=""
          />
        </div>
      </router-link>

      <!-- POST - CONTENT - IF EVENT -->
      <Event v-if="event" :event="event" />

      <PostActions
        :postId="post?.id"
        :initial-likes="post?.likes"
        :commentsCount="post?.comments.length"
        :views="post?.views"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed, ref, watch } from "vue";
import type User from "../../interfaces/interface.user";
import type Event from "../../interfaces/interface.event";
import Event from "./Event.vue";
import PostActions from "./PostActions.vue"

import { formatTimeAgo } from "../../utils/date.ts";

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
// import users from "../../assets/data/users.json";
// import events from "../../assets/data/events.json";

const myUserId = localStorage.getItem("userId");
const isLiking = ref(false);
const props = defineProps({
  post: Object,
  showOptionsId: [String, Number],
  getEventById: Function,
});
const likes = ref<string[]>(
  props.post?.likes ? props.post.likes.map(String) : []
);
const event = ref<Event | null>(null);
const emit = defineEmits(["toggle-options", "report-post"]);
const user = ref<User | null>(null);
function hasLikedPost() {
  return myUserId !== null && likes.value.includes(myUserId);
}

async function togglePostLike() {
  if (!props.post || !myUserId) return;
  const idx = likes.value.indexOf(myUserId);
  if (idx === -1) {
    likes.value.push(myUserId);
  } else {
    likes.value.splice(idx, 1);
  }
  isLiking.value = true;
  setTimeout(() => {
    isLiking.value = false;
  }, 400);

  // Update likes in Firestore als string-array
  try {
    const postRef = doc(db, "posts", String(props.post.id));
    await updateDoc(postRef, { likes: [...likes.value] });
  } catch (err) {
    console.error("Failed to update likes in Firestore", err);
  }
}

async function getUserById(docId: string) {
  try {
    const userRef = doc(db, "users", docId);
    const docSnap = await getDoc(userRef);

    if (!docSnap.exists()) {
      console.warn("No user found with document ID:", docId);
      user.value = null;
      return null;
    }

    const userData = { id: docSnap.id, ...docSnap.data() };
    user.value = userData as User;
    return userData;
  } catch (error) {
    console.error("Error fetching user data:", error);
    user.value = null;
    return null;
  } finally {
    // loading.value = false; // Uncomment if you have a loading state
  }
}

async function getEventById(eventId: string | number) {
  try {
    // Forceer eventId naar string
    const eventRef = doc(db, "events", String(eventId));
    const docSnap = await getDoc(eventRef);

    if (!docSnap.exists()) {
      console.warn("No event found with document ID:", eventId);
      event.value = null;
      return null;
    }

    const eventData = { id: docSnap.id, ...docSnap.data() };
    event.value = eventData;
    return eventData;
  } catch (error) {
    console.error("Error fetching event data:", error);
    event.value = null;
    return null;
  }
}
function formatTimeAgo(timestamp: any) {
  const postDate = new Date(timestamp);
  const now = new Date();
  const diffMs = now.getTime() - postDate.getTime();
  const diffMinutes = Math.floor(diffMs / (1000 * 60));
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  const diffWeeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7));

  if (diffMinutes < 1) return "1 min ago";
  else if (diffMinutes < 60) return `${diffMinutes} min ago`;
  else if (diffHours < 24) return `${diffHours}h ago`;
  else if (diffDays < 7) return `${diffDays}d ago`;
  else return `${diffWeeks}w ago`;
}
watch(
  () => props.post?.userId,
  (newUserId) => {
    if (newUserId) getUserById(newUserId);
    else user.value = null;
  },
  { immediate: true }
);

watch(
  () => props.post?.eventId,
  (newEventId) => {
    if (newEventId) getEventById(newEventId);
    else event.value = null;
  },
  { immediate: true }
);
watch(
  () => props.post?.likes,
  (newLikes) => {
    likes.value = newLikes ? newLikes.map(String) : [];
  }
);

const props = defineProps({
  post: Object,
  showOptionsId: [String, Number],
  getEventById: Function,
});

const emit = defineEmits(["toggle-options", "report-post"]);

const user = computed(() => {
  return props.post
    ? users.users.find((u) => u.id === props.post?.userId)
    : null;
});

const event = computed(() => {
  return props.post && props.post.eventId
    ? events.events.find((e) => e.id === props.post?.eventId)
    : null;
});
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