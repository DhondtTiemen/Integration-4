<template>
    <section class="max-w-md mx-auto p-4">
        <h1 class="text-2xl font-bold text-gray-900 dark:text-white mb-6">Events</h1>

        <div v-if="loading" class="text-center text-gray-500">Loading events...</div>

        <div v-else>
            <div
                v-for="event in events"
                :key="event.id"
                class="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-4"
            >
                <p class="text-lg font-bold text-gray-900 dark:text-white mb-1">{{ event.title }}</p>
                <p class="text-sm text-gray-500 mb-1">📅 {{ event.date }} • {{ event.time }}</p>
                <p class="text-sm text-gray-500 mb-1">📍 {{ event.place }}</p>
                <p class="text-sm text-gray-700 dark:text-gray-300 mb-2">{{ event.about }}</p>

                <div v-if="event.materials && event.materials.length > 0" class="text-sm text-gray-600 dark:text-gray-400">
                    <p class="font-medium mb-1">Materials to bring:</p>
                    <ul class="list-disc list-inside">
                        <li v-for="(material, index) in event.materials" :key="index">{{ material }}</li>
                    </ul>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

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