<template>
  <section class="max-w-md mx-auto mt-8 space-y-6">
    <div v-for="post in posts" :key="post.id" class="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
      <!-- User Info -->
      <div class="flex items-center mb-4">
        <img :src="post.userAvatar" alt="avatar" class="w-10 h-10 rounded-full mr-3" />
        <div>
          <p class="font-medium text-gray-900 dark:text-white">{{ post.userName }}</p>
          <p class="text-sm text-gray-500">{{ post.time }}</p>
        </div>
      </div>

      <!-- Image or Content -->
      <div class="mb-4">
        <img :src="post.image" alt="post image" class="w-full rounded-lg" />
      </div>

      <!-- Actions -->
      <div class="flex items-center space-x-4 mb-2">
        <button class="text-gray-500 hover:text-red-500">❤️ Like</button>
        <button class="text-gray-500 hover:text-blue-500">💬 Comment</button>
        <button class="text-gray-500 hover:text-green-500">↗️ Share</button>
      </div>

      <!-- Caption -->
      <p class="text-gray-800 dark:text-gray-300 mb-2"><span class="font-medium">{{ post.userName }}</span> {{ post.caption }}</p>

      <!-- Comments -->
      <div class="space-y-1">
        <p v-for="(comment, index) in post.comments" :key="index" class="text-sm text-gray-600 dark:text-gray-400">
          <span class="font-medium">{{ comment.user }}</span> {{ comment.text }}
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const posts = ref([
  {
    id: 1,
    userName: 'John Doe',
    userAvatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    time: '2 hours ago',
    image: 'https://source.unsplash.com/random/400x300',
    caption: 'Beautiful day in the city! 🌆',
    comments: [
      { user: 'Jane', text: 'Wow, nice photo!' },
      { user: 'Alex', text: 'Love this ❤️' },
    ],
  },
  {
    id: 2,
    userName: 'Emily Smith',
    userAvatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    time: '5 hours ago',
    image: 'https://source.unsplash.com/random/400x301',
    caption: 'Nature walk 🌳',
    comments: [
      { user: 'Michael', text: 'So peaceful!' },
    ],
  },
])
</script>