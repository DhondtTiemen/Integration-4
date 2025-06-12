<template>
  <!-- Posts -->
  <div class="p-4 border-b-[1px] border-gray-200">
    <!-- User Info -->
    <div class="flex items-center justify-between mb-6">
      <router-link
        :to="`/account/${user?.id}`"
        class="flex items-center space-x-3"
      >
        <img
          :src="user?.avatar"
          alt="avatar"
          class="w-12 h-12 rounded-full mr-6"
        />
        <div>
          <p class="font-bold text-lg">{{ user?.name }}</p>
          <p class="text-base font-medium text-gray-500">
            {{ formatTimeAgo(post?.timestamp) }}
            <span v-if="post?.location"> • {{ post?.location }}</span>
          </p>
        </div>
      </router-link>

      <div class="relative">
        <button @click="emit('toggle-options', post?.id)" class="text-gray-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 30 30"
            fill="none"
          >
            <path
              d="M15 17.8125C16.5533 17.8125 17.8125 16.5533 17.8125 15C17.8125 13.4467 16.5533 12.1875 15 12.1875C13.4467 12.1875 12.1875 13.4467 12.1875 15C12.1875 16.5533 13.4467 17.8125 15 17.8125Z"
              fill="#222222"
            />
            <path
              d="M24.375 17.8125C25.9283 17.8125 27.1875 16.5533 27.1875 15C27.1875 13.4467 25.9283 12.1875 24.375 12.1875C22.8217 12.1875 21.5625 13.4467 21.5625 15C21.5625 16.5533 22.8217 17.8125 24.375 17.8125Z"
              fill="#222222"
            />
            <path
              d="M5.625 17.8125C7.1783 17.8125 8.4375 16.5533 8.4375 15C8.4375 13.4467 7.1783 12.1875 5.625 12.1875C4.0717 12.1875 2.8125 13.4467 2.8125 15C2.8125 16.5533 4.0717 17.8125 5.625 17.8125Z"
              fill="#222222"
            />
          </svg>
        </button>

        <div
          v-if="showOptionsId === post?.id"
          class="absolute top-6 right-0 bg-white border shadow-md z-10"
        >
          <button
            @click="emit('report-post', post?.id)"
            class="block px-4 py-2 text-red-600 hover:bg-gray-100"
          >
            Report Post
          </button>
        </div>
      </div>
    </div>

    <!-- Link to Post -->
    <router-link :to="`/post/${post?.id}`" class="block mb-6">
      <!-- Content -->
      <p class="mb-6">{{ post?.content }}</p>

      <!-- Images -->
      <div v-if="post?.images.length === 1" class="mb-6">
        <!-- TODO: Images -->
        <!-- <img :src="'/assets/posts/' + post?.images[0]" alt="post image" class="w-full rounded-lg" /> -->
        <img
          :src="'https://images.pexels.com/photos/7585762/pexels-photo-7585762.jpeg'"
          alt="post image"
          class="h-40 w-44 object-cover"
        />
      </div>
      <div
        v-else-if="post?.images.length > 1"
        class="grid grid-cols-2 gap-2 mb-2"
      >
        <img
          v-for="img in post?.images"
          :key="img"
          :src="'/assets/images/' + img"
          class="rounded-lg"
        />
      </div>
    </router-link>
  </div>

  <!-- Event box if eventId exists -->
  <router-link
    :to="`/event/${event?.id}`"
    v-if="post?.eventId && event"
    class="mb-2 relative"
  >
    <span
      class="absolute top-2 right-4 border border-black text-black text-xs px-2 py-1"
      >Event</span
    >
    <template v-if="event">
      <img
        :src="'https://images.pexels.com/photos/7585762/pexels-photo-7585762.jpeg'"
        alt="post image"
        class="h-44 w-full object-cover"
      />

      <div class="bg-purple-300 p-4">
        <p class="font-bold mb-1">{{ event.title }}</p>

        <div class="my-2">
          <p class="text-sm flex items-center gap-2 mb-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path d="M16 7.21509H0V15.9999H16V7.21509Z" fill="black" />
              <path
                d="M12.8069 2.41138V0H11.2107V2.41138H4.78935V0H3.19315V2.41138H0V5.60184H16V2.41138H12.8069Z"
                fill="black"
              />
            </svg>
            {{ event.date }} • {{ event.time }}
          </p>
          <p class="text-sm flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
            >
              <path
                d="M7.53625 0.00962665C8.9137 -0.0483006 9.96353 0.143329 11.1337 0.909534C13.5873 2.51615 14.3486 5.69088 13.054 8.26066C11.3915 10.8389 9.71973 13.4121 8.03847 15.9803C7.97403 16.0163 7.86641 16.0007 7.81942 15.9515L2.91629 8.41471C1.0793 4.93906 3.46821 0.180824 7.53625 0.00962665ZM5.48166 7.05953C6.52547 8.83743 9.11846 8.92823 10.2912 7.22893C11.5035 5.4717 10.3677 3.04502 8.23434 2.84055C5.93055 2.6198 4.31215 5.06715 5.48166 7.05953Z"
                fill="black"
              />
            </svg>
            {{ event.place }}
          </p>
        </div>
        <button
          class="mt-3 bg-amber-300 text-black font-medium w-full py-1.5 rounded"
        >
          Learn more
        </button>
      </div>
    </template>
  </router-link>

  <!-- Actions -->
  <div class="flex items-center justify-between mt-2 text-sm">
    <div class="flex items-center gap-6">
      <!-- likes -->
      <button class="flex items-center gap-2 mb-0.5" @click="togglePostLike()">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="28"
          height="24"
          viewBox="0 0 28 25"
          fill="none"
          :class="[
            isLiking ? 'animate-like' : '',
            hasLikedPost()
              ? 'text-alphaPurple fill-alphaPurple stroke-alphaPurple'
              : 'text-gray-600 stroke-black',
          ]"
        >
          <path
            d="M11.4436 23.9877L16.5567 24C19.5793 21.4085 21.967 18.968 23.4492 17.3631C25.1715 15.4981 26.3404 13.1944 26.7822 10.708C27.1995 8.36087 27.0717 5.90859 25.9183 4.12869C23.1341 -0.168074 16.9841 0.0585967 14.3474 4.3125C14.2944 4.39823 14.2338 4.48162 14.1922 4.57499C14.147 4.67658 14.0126 5.02892 14.0001 5.0618C14.0001 5.0618 13.8557 4.66777 13.8081 4.56266C13.7695 4.47751 13.7148 4.40117 13.6666 4.32248C11.037 0.0474394 4.87039 -0.18804 2.08141 4.11636C1.18365 5.50164 0.907191 7.29504 1.0261 9.12896C1.22765 12.2466 2.57428 15.1839 4.75862 17.443C6.31691 19.0543 8.70577 21.4585 11.4436 23.9877Z"
            stroke-width="2"
          />
        </svg>
        <p>{{ likes.length }}</p>
      </button>

      <!-- comments -->
      <router-link :to="`/post/${post?.id}`" class="flex items-center gap-2">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 26"
          fill="none"
        >
          <path
            d="M23 1.5H1V17.5507H5.3048V23.5L11.7703 17.5507H23V1.5Z"
            stroke="#222222"
            stroke-width="2"
          />
        </svg>
        <p v-if="post?.comments.length > 0">{{ post?.comments.length }}</p>
      </router-link>

      <!-- saved TODO: Why do we want this-->
      <!-- <button>🔖 {{ post?.bookmarks }}</button> -->
    </div>
    <div class="flex items-center gap-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="30"
        height="21"
        viewBox="0 0 30 21"
        fill="none"
      >
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M0.356776 9.38611C4.42329 3.55705 9.69595 0.500488 14.9782 0.500488C21.182 0.500488 26.526 4.54205 29.6789 9.41164L29.6804 9.41393C29.8891 9.73812 30 10.1155 30 10.501C30 10.8859 29.8895 11.2626 29.6815 11.5864C26.5314 16.5187 21.2219 20.4997 14.9782 20.4997C8.66806 20.4997 3.46094 16.5269 0.31851 11.609C0.104986 11.2774 -0.00576109 10.8901 0.000230905 10.4958C0.0062378 10.1004 0.129296 9.71575 0.353855 9.39032L0.356776 9.38611ZM1.99993 10.5262L2.0027 10.5305C4.90516 15.0738 9.55713 18.4998 14.9782 18.4998C20.3386 18.4998 25.0908 15.0593 27.9968 10.5088L27.9987 10.5058C27.9996 10.5044 28.0001 10.5027 28.0001 10.501C28.0001 10.5003 28 10.4996 27.9998 10.4989C27.9996 10.4981 27.9993 10.4973 27.9988 10.4965C25.0818 5.99247 20.2907 2.50041 14.9782 2.50041C10.5195 2.50041 5.8001 5.08105 1.99993 10.5262Z"
          fill="#222222"
        />
        <path
          fill-rule="evenodd"
          clip-rule="evenodd"
          d="M14.9995 6.50017C12.7905 6.50017 10.9997 8.29096 10.9997 10.5C10.9997 12.7091 12.7905 14.4998 14.9995 14.4998C17.2086 14.4998 18.9994 12.7091 18.9994 10.5C18.9994 8.29096 17.2086 6.50017 14.9995 6.50017ZM8.99976 10.5C8.99976 7.18643 11.6859 4.50024 14.9995 4.50024C18.3131 4.50024 20.9993 7.18643 20.9993 10.5C20.9993 13.8136 18.3131 16.4998 14.9995 16.4998C11.6859 16.4998 8.99976 13.8136 8.99976 10.5Z"
          fill="#222222"
        />
      </svg>
      <p>{{ post?.views }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, computed, ref, watch } from "vue";
import type User from "../../interfaces/interface.user";
import type Event from "../../interfaces/interface.event";

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
