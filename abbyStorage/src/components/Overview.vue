<template>
  <section class="max-w-md mx-auto mt-8 space-y-4">
    <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-4 px-4">Overview: Latest Posts</h1>

    <div v-if="loading" class="text-center text-gray-500">Loading...</div>
    <div v-else>
      <div
        v-for="post in posts"
        :key="post.id"
        class="bg-white dark:bg-gray-800 rounded-lg shadow p-4"
      >
        <p class="font-medium text-gray-900 dark:text-white mb-2">{{ post.content }}</p>
        <img
          v-if="post.images.length"
          :src="'/assets/images/' + post.images[0]"
          alt="post image"
          class="w-full rounded-lg mb-2"
        />
        <p class="text-sm text-gray-500">Likes: {{ post.likes.length }} | Views: {{ post.views }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const posts = ref([])
const loading = ref(true)

async function fetchPosts() {
  try {
    const response = await fetch('/src/assets/data/posts.json')
    if (!response.ok) {
      throw new Error('Failed to fetch posts')
    }
    const data = await response.json()
    posts.value = data.posts
  } catch (error) {
    console.error(error)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchPosts()
})
</script>