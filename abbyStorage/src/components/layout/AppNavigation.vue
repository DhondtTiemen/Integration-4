<template>
  <ul
    class="fixed bottom-0 grid grid-cols-5 w-full items-center text-center h-16 bg-alphaYellow"
  >
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
          <ImageTemplate
            :path="user?.avatar"
            :screen="'nav'"
          />
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
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
import EventFilled from "../../assets/icons/EventFilled.vue";
import EventOutline from "../../assets/icons/EventOutline.vue";

const user = ref<User | null>(null);
const userId = ref<string | null>(null);
const route = useRoute();

const isActive = (path: string) => route.path === path;
// const profileImageUrl = computed(() => {
//   return user.value?.avatar || "/src/assets/users/default.png";
// });

async function refreshUser() {
  if (userId.value) {
    user.value = null;
    user.value = await getUserById(userId.value);
  }
}

onMounted(async () => {
  const storedId = localStorage.getItem("userId");
  if (storedId) {
    userId.value = storedId;
    await refreshUser();
  }
  // Luister naar profiel-updates
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
