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
      <router-link
        class="inline-block px-3 outline-none"
        to="/search"
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
        to="/events"
      >
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
            isActive(`/account/${userId}`) ? 'border-alphaDark' : 'border-transparent'
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

import users from '../../assets/data/users.json'

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
  const user = users.users.find((u) => u.id === userId.value)
  return user?.avatar || '/assets/users/default.jpg'
})
</script>