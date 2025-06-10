<template>
  <section class="min-h-screen">
    <!-- Header -->
    <nav class="relative flex items-center justify-between p-4 bg-alphaYellow">
        <ArrowLeft class="z-10" />
        <p class="absolute left-1/2 transform -translate-x-1/2 text-center font-medium">
            Events
        </p>
        <button @click="shareEvent">
          <PlusIcon class="w-6 h-6 mr-2 inline-block" />
        </button>
    </nav>

    <div v-if="loading" class="text-center text-gray-500">Loading events...</div>

    <div v-else class="space-y-4">
      <div
        v-for="event in events"
        :key="event.id"
        class="rounded-xl overflow-hidden border border-gray-200 shadow-sm"
      >
        <!-- Image placeholder + Event label -->
        <div class="relative aspect-[4/3] bg-gray-200 flex items-center justify-center">
          <span class="absolute top-2 right-2 border text-xs px-2 py-0.5 text-black bg-white">Event</span>
          <svg class="w-10 h-10 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3H5c-1.1 0-2 .9-2 2v14l4-4h12c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"/>
          </svg>
        </div>

        <!-- Purple info section -->
        <div class="bg-[#BB7CD2] p-4">
          <p class="text-base font-semibold text-black mb-2">{{ event.title }}</p>
          <div class="text-sm text-black flex items-center gap-1 mb-1">
            <span>📅</span>
            <span>{{ event.date }} • {{ event.time }}</span>
          </div>
          <div class="text-sm text-black flex items-center gap-1 mb-3">
            <span>📍</span>
            <span>{{ event.place }}</span>
          </div>
          <button class="bg-[#FEBE4F] w-full text-black font-medium py-1.5 rounded">Learn more</button>
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