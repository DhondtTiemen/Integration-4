<template>
  <section class="min-h-screen">
    <!-- Header -->
    <header class="flex items-center justify-between h-16 bg-alphaYellow">
      <h1 class="text-xl font-bold h-6 px-6">
        Events
      </h1>
      <div class="flex items-center px-6 gap-6">
        <button>
          <PlusIcon class="w-6 h-6 mr-2 inline-block" />
        </button>
      </div>
    </header>

    <div v-if="loading" class="text-center text-gray-500">Loading events...</div>

    <div v-else class="space-y-4">
      <div
        v-for="event in events"
        :key="event.id"
        class="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl shadow-sm p-4"
      >
        <p class="text-lg font-semibold text-gray-900 dark:text-white mb-1">{{ event.title }}</p>
        <div class="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2 mb-1">
          <span>📅</span>
          <span>{{ event.date }} • {{ event.time }}</span>
        </div>
        <div class="text-sm text-gray-600 dark:text-gray-400 flex items-center gap-2 mb-2">
          <span>📍</span>
          <span>{{ event.place }}</span>
        </div>
        <p class="text-sm text-gray-700 dark:text-gray-300 mb-3">{{ event.about }}</p>

        <div v-if="event.materials && event.materials.length > 0" class="text-sm text-gray-600 dark:text-gray-400 bg-gray-50 dark:bg-gray-700 rounded p-3">
          <p class="font-medium mb-1">Materials to bring:</p>
          <ul class="list-disc list-inside space-y-1">
            <li v-for="(material, index) in event.materials" :key="index">{{ material }}</li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { PlusIcon } from 'lucide-vue-next'

const events = ref([])
const loading = ref(true)

async function fetchEvents() {
    try {
        // 1️⃣ fetch standaard events.json
        const response = await fetch('/src/assets/data/events.json')
        const data = await response.json()
        const jsonEvents = data.events || []

        // 2️⃣ fetch localStorage events
        const storedEvents = JSON.parse(localStorage.getItem('events') || '[]')

        // 3️⃣ combineer beide
        events.value = [...jsonEvents, ...storedEvents]
    } catch (error) {
        console.error('Error loading events:', error)
    } finally {
        loading.value = false
    }
}

onMounted(() => {
    fetchEvents()
})
</script>