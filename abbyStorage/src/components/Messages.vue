<template>
  <section class="max-w-md mx-auto mt-8 space-y-4">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 px-4">Messages</h1>

    <div v-for="conversation in conversations" :key="conversation.id" class="flex items-center px-4 py-3 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer">
      <!-- Avatar -->
      <img :src="conversation.avatar" alt="avatar" class="w-12 h-12 rounded-full mr-4" />

      <!-- Conversation info -->
      <div class="flex-1 min-w-0">
        <p class="font-medium text-gray-900 dark:text-white truncate">{{ conversation.name }}</p>
        <p class="text-sm text-gray-500 dark:text-gray-400 truncate">{{ conversation.lastMessage }}</p>
      </div>

      <!-- Timestamp -->
      <span class="text-xs text-gray-400 ml-2">{{ conversation.time }}</span>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const conversations = ref([
  {
    id: 1,
    name: 'John Doe',
    avatar: 'https://randomuser.me/api/portraits/men/32.jpg',
    lastMessage: 'Hey, are you coming tonight?',
    time: '2m',
  },
  {
    id: 2,
    name: 'Emily Smith',
    avatar: 'https://randomuser.me/api/portraits/women/44.jpg',
    lastMessage: 'I sent you the photos 📸',
    time: '10m',
  },
  {
    id: 3,
    name: 'Michael Johnson',
    avatar: 'https://randomuser.me/api/portraits/men/65.jpg',
    lastMessage: 'Let’s catch up soon!',
    time: '1h',
  },
  {
    id: 4,
    name: 'Sarah Williams',
    avatar: 'https://randomuser.me/api/portraits/women/25.jpg',
    lastMessage: 'Awesome, thank you!',
    time: '3h',
  },
])
</script>