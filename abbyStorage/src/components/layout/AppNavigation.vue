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
          <img
            :src="profileImageUrl"
            @error="onImgError"
            alt="Profile"
            class="h-full w-full object-cover"
          />
        </div>
      </router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";

import type User from "../../interfaces/interface.user";
import { getUserById } from "../../firebase/userService";

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

// TODO: Add default image to assets
const profileImageUrl = computed(() => {
  return user.value?.avatar || "/assets/users/default.jpg";
});

const onImgError = (event: Event) => {
  (event.target as HTMLImageElement).src = "/assets/users/default.jpg";
};

onMounted(async () => {
  const storedId = localStorage.getItem("userId");
  if (storedId) {
    userId.value = storedId;
    user.value = await getUserById(storedId);
  }
});
</script>
