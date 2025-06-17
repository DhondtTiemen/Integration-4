<template>
  <Popup :visible="showPopup" @close="showPopup = false" />

  <ul
    class="fixed bottom-0 grid grid-cols-5 w-full items-center text-center h-16 bg-alphaYellow"
  >
    <li>
      <router-link
        class="inline-block px-3 outline-none"
        to="/"
        aria-label="View homepage"
      >
        <component
          :is="isActive('/') ? HomeFilled : HomeOutline"
          class="h-6 w-auto mx-auto"
        />
      </router-link>
    </li>
    <li>
      <router-link
        class="inline-block px-3 outline-none"
        to="/search"
        aria-label="View searchpage"
      >
        <component
          :is="isActive('/search') ? SearchFilled : SearchOutline"
          class="h-6 w-auto mx-auto"
        />
      </router-link>
    </li>
    <li>
      <router-link
        class="inline-block px-3 outline-none"
        to="/post/create"
        aria-label="Add post"
      >
        <component
          :is="isActive('/post/create') ? AddFilled : AddOutline"
          class="h-6 w-auto mx-auto"
        />
      </router-link>
    </li>
    <li>
      <router-link
        class="inline-block px-3 outline-none"
        to="/chat"
        aria-label="View messages"
      >
        <component
          :is="isActive('/chat') ? TextBalloonFilled : TextBalloonOutline"
          class="h-6 w-auto mx-auto"
        />
      </router-link>
    </li>
    <li>
      <a
        class="inline-block px-3 outline-none cursor-pointer"
        @click="handleAccountClick"
        aria-label="View account"
      >
        <div
          :class="[
            'h-8 w-8 mx-auto rounded-full overflow-hidden border-2',
            isActive(`/account/${userId}`)
              ? 'border-alphaDark'
              : 'border-transparent',
          ]"
        >
          <ImageTemplate :path="user?.avatar" :screen="'nav'" />
        </div>
      </a>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { useRoute } from "vue-router";

import type User from "../../interfaces/interface.user";
import { getUserById } from "../../firebase/userService";

import ImageTemplate from "/src/components/images/ImageTemplate.vue";
// Icon Imports
import HomeFilled from "../../assets/icons/HomeFilled.vue";
import HomeOutline from "../../assets/icons/HomeOutline.vue";
import SearchFilled from "../../assets/icons/SearchFilled.vue";
import SearchOutline from "../../assets/icons/SearchOutline.vue";
import AddFilled from "../../assets/icons/AddFilled.vue";
import AddOutline from "../../assets/icons/AddOutline.vue";
import Popup from "../generic/popUp.vue";
import router from "../../router";
import TextBalloonFilled from "../../assets/icons/TextBalloonFilled.vue";
import TextBalloonOutline from "../../assets/icons/TextBalloonOutline.vue";

const user = ref<User | null>(null);
const userId = ref<string | null>(null);
const route = useRoute();
const storedId = ref<string | null>(null);
const showPopup = ref(false);
function handleAccountClick() {
  if (route.path !== `/account/${userId.value}`) {
  router.push(`/account/${userId.value}`);
} else {
  // Force reload van de component
  router.replace({ path: '/refresh', query: { redirect: `/account/${userId.value}` } });
}
}
const isActive = (path: string) => route.path === path;

async function refreshUser() {
  if (userId.value) {
    user.value = null;
    user.value = await getUserById(userId.value);
  }
}

onMounted(async () => {
  storedId.value = localStorage.getItem("userId");
  if (storedId) {
    userId.value = storedId.value;
    await refreshUser();
  }
  window.addEventListener("profile-updated", refreshUser);
});
watch(
  () => route.fullPath,
  async () => {
    await refreshUser();
  }
);
watch(userId, async (newId, oldId) => {
  if (newId && newId !== oldId) {
    await refreshUser();
  }
});

</script>
