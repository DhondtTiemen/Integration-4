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
      <router-link :to="`/event/${event?.id}`" v-if="event" class="relative">
        <!-- POST - CONTENT - EVENT - LABEL -->
        <span
          class="absolute top-4 right-4 bg-alphaGreen font-medium px-2.5 py-2"
          >Event</span
        >

        <img
          :src="'https://images.pexels.com/photos/7585762/pexels-photo-7585762.jpeg'"
          alt="post image"
          class="h-40 w-full object-cover"
        />

        <!-- POST - CONTENT - EVENT -->
        <div class="bg-alphaPurple p-4">
          <p class="font-bold mb-1">{{ event.title }}</p>

          <div class="py-2 mb-4">
            <p class="flex items-center gap-2 mb-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="fill-alphaDark h-4 w-auto"
                viewBox="0 0 16 16"
              >
                <path d="M16 7.21509H0V15.9999H16V7.21509Z" fill="black" />
                <path
                  d="M12.8069 2.41138V0H11.2107V2.41138H4.78935V0H3.19315V2.41138H0V5.60184H16V2.41138H12.8069Z"
                  fill="black"
                />
              </svg>
              {{ formatDateTime(event.date + "T" + event.time) }}
            </p>
            <p class="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="fill-alphaDark h-4 w-auto"
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

          <!-- POST - CONTENT - EVENT - BUTTON -->
          <button class="bg-alphaYellow font-medium w-full py-2.5">
            Learn more
          </button>
        </div>
      </router-link>

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
import { defineProps, defineEmits, computed } from "vue";

import users from "../../assets/data/users.json";
import events from "../../assets/data/events.json";

import PostActions from "../../components/generic/PostActions.vue"

import { formatTimeAgo, formatDateTime } from "../../utils/date.ts";

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
