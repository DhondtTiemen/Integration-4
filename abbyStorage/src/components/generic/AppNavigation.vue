<template>
  <ul class="grid grid-cols-5 w-full items-center text-center h-16">
    <li>
      <router-link class="inline-block px-3 outline-none" to="/">
        <component
          :is="isActive('/') ? HomeFilled : HomeOutline"
          class="h-6 w-auto mx-auto"
        />
      </router-link>
    </li>
    <li>
      <router-link class="inline-block px-3 outline-none" to="/search">
        <component
          :is="isActive('/search') ? SearchFilled : SearchOutline"
          class="h-6 w-auto mx-auto"
        />
      </router-link>
    </li>
    <li>
      <router-link class="inline-block px-3 outline-none" to="/post/create">
        <component
          :is="isActive('/post/create') ? AddFilled : AddOutline"
          class="h-6 w-auto mx-auto"
        />
      </router-link>
    </li>
    <li>
      <router-link class="inline-block px-3 outline-none" to="/events">
        <component
          :is="isActive('/events') ? EventFilled : EventOutline"
          class="h-6 w-auto mx-auto"
        />
      </router-link>
    </li>
    <li>
      <router-link
        class="inline-block px-3 outline-none"
        :to="`/account/${userId}`"
      >
        <div
          :class="[
            'h-8 w-8 mx-auto rounded-full overflow-hidden border-2',
            isActive(`/account/${userId}`)
              ? 'border-alphaDark'
              : 'border-transparent',
          ]"
        >
          <img
            :src="profileImageUrl"
            alt="Profile"
            class="h-full w-full object-cover"
          />
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute } from "vue-router";
import type User from "../../interfaces/interface.user";
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
import db from "../../firebase/init.ts";
const user = ref<User | null>(null);
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
import users from "../../assets/data/users.json";

import HomeFilled from "../../assets/icons/HomeFilled.vue";
import HomeOutline from "../../assets/icons/HomeOutline.vue";

import SearchFilled from "../../assets/icons/SearchFilled.vue";
import SearchOutline from "../../assets/icons/SearchOutline.vue";

import AddFilled from "../../assets/icons/AddFilled.vue";
import AddOutline from "../../assets/icons/AddOutline.vue";

import EventFilled from "../../assets/icons/EventFilled.vue";
import EventOutline from "../../assets/icons/EventOutline.vue";

let userId = ref<string | null>(null);

if (typeof window !== "undefined") {
  const storedId = localStorage.getItem("userId");
  if (storedId) {
    userId.value = storedId;
  }
}

const route = useRoute();
const isActive = (path: string) => route.path === path;

const profileImageUrl = computed(() => {
  if (!userId.value || !user.value) {
    return "/assets/users/default.jpg";
  }
  return user.value.avatar || "/assets/users/default.jpg";
});

// Fetch user data when userId changes
import { watch } from "vue";
watch(
  userId,
  async (newId) => {
    if (newId) {
      await getUserById(newId);
    } else {
      user.value = null;
    }
  },
  { immediate: true }
);
</script>
