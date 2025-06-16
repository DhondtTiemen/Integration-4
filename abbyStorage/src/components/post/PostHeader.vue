<template>
  <!-- POST - HEADER -->
  <div v-if="user" class="flex items-center justify-between mb-6">
    <!-- User Info -->
    <router-link :to="`/account/${user?.id}`" class="flex items-center">
      <img
        :src="user?.avatar"
        alt="User Avatar"
        class="w-16 h-16 rounded-full mr-6 object-cover"
      />
      <div>
        <p class="font-bold text-lg">{{ user?.name }}</p>
        <p class="text-base font-medium text-gray-400">
          {{ formatTimeAgo(post.timestamp) }}
          <span v-if="post.location"> • {{ post.location }}</span>
        </p>
      </div>
    </router-link>

    <!-- Report Button -->
    <div class="relative">
      <button @click="emit('toggle-options', post.id)">
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
        v-if="showOptionsId === post.id"
        class="absolute top-6 right-0 bg-white border z-10 border-gray-400"
      >
        <button
          @click="emit('report-post', post.id)"
          class="block px-4 py-2.5 text-red-600 w-full"
        >
          Report Post
        </button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from "vue";
import type UserType from "../../interfaces/interface.user";
import type PostType from "../../interfaces/interface.post";

import { formatTimeAgo } from "../../utils/date";
import { getUserById } from "../../firebase/userService";

const props = defineProps<{
  userId: string;
  post: PostType;
  showOptionsId?: string;
}>();

const emit = defineEmits<{
  (e: "toggle-options", id: string): void;
  (e: "report-post", id: string): void;
}>();

const user = ref<UserType | null>(null);

onMounted(async () => {
  user.value = await getUserById(props.userId);
});
</script>
