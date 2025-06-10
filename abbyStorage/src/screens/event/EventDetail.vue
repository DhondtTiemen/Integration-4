<template>
  <div class="min-h-screen bg-white flex flex-col">

    <!-- Header -->
    <header class="flex justify-between items-center bg-alphaYellow px-4 py-3">
      <button @click="goBack">←</button>
      <h1 class="font-semibold">Event</h1>
      <Bell class="w-5 h-5" />
    </header>

    <section class="p-4 space-y-6">
      <!-- Cover image -->
      <div class="aspect-[4/3] bg-gray-200 flex items-center justify-center">
        <Image class="w-16 h-16 text-gray-400" />
      </div>

      <!-- Event info -->
      <div>
        <h2 class="text-xl font-bold mb-2">{{ event.title }}</h2>
        <p class="text-sm text-gray-600 flex items-center gap-1">
          <CalendarDays class="w-4 h-4" />
          {{ formatDate(event.date) }} • {{ event.time }}
        </p>
        <p class="text-sm text-gray-600 flex items-center gap-1 mt-1">
          <MapPin class="w-4 h-4" />
          {{ event.place }}
        </p>
        <p class="text-xs text-red-500 mt-2" v-if="isPast">This event already finished</p>
        <p class="text-xs text-green-600 mt-2" v-else>Upcoming</p>
        <p class="text-sm text-gray-500 mt-1">Hosted by <strong>{{ event.host }}</strong></p>
      </div>

      <!-- Participants -->
      <div>
        <div class="flex justify-between items-center mb-2">
          <h3 class="font-medium text-base">Participants ({{ participants.length }})</h3>
          <button class="text-sm text-gray-500">See all</button>
        </div>
        <div class="flex -space-x-3">
          <img v-for="(p, i) in participants.slice(0, 6)" :key="i" :src="p.avatar" class="w-10 h-10 rounded-full border-2 border-white" />
          <div v-if="participants.length > 6" class="w-10 h-10 rounded-full bg-alphaGreen text-white flex items-center justify-center text-sm font-medium">+{{ participants.length - 6 }}</div>
        </div>
      </div>

      <!-- Achievements -->
      <div>
        <h3 class="font-medium mb-2">Event Achievements</h3>
        <div class="flex items-center gap-4 bg-gray-100 p-3 rounded">
          <Image class="w-10 h-10 text-gray-400" />
          <p class="text-sm">Expressive drawing<br /><span class="text-xs text-gray-500">Complete this workshop</span></p>
        </div>
      </div>

      <!-- About -->
      <div>
        <h3 class="font-medium mb-2">About</h3>
        <p class="text-sm text-gray-700">{{ event.description }}</p>
      </div>

      <!-- Gallery -->
      <div>
        <div class="flex justify-between items-center mb-2">
          <h3 class="font-medium">Event gallery</h3>
          <button class="text-sm text-gray-500">See all</button>
        </div>
        <div class="grid grid-cols-4 gap-2">
          <div v-for="(img, i) in gallery.slice(0, 3)" :key="i" class="aspect-square bg-gray-200"></div>
          <div class="aspect-square bg-alphaGreen text-white flex items-center justify-center font-medium">+{{ gallery.length - 3 }}</div>
        </div>
      </div>

      <!-- Suggestions -->
      <div>
        <h3 class="font-medium mb-2">You might also like</h3>
        <div class="space-y-4">
          <div
            v-for="related in relatedEvents"
            :key="related.id"
            class="bg-gray-100 p-3 rounded flex flex-col"
          >
            <div class="aspect-[4/2] bg-gray-300 mb-2"></div>
            <p class="text-sm font-semibold">{{ related.title }}</p>
            <p class="text-xs text-gray-600">{{ formatDate(related.date) }} • {{ related.place }}</p>
            <button class="bg-alphaYellow w-fit px-4 py-1 mt-2 text-sm font-medium">Learn more</button>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { Image, Bell, CalendarDays, MapPin } from 'lucide-vue-next'

const route = useRoute()
const router = useRouter()
function goBack() {
  router.back()
}

const event = ref({
  id: route.params.id,
  title: "Expressive Portrait Drawing Workshop",
  date: "2025-05-27",
  time: "5:00 PM",
  place: "Atelier, ABBY Creative Space",
  host: "Jana Vermeulen",
  description:
    "Join us for an immersive portrait drawing workshop where you’ll learn how to capture emotion and personality in your artwork...",
})

const participants = ref([
  { avatar: '/avatars/a1.jpg' }, { avatar: '/avatars/a2.jpg' },
  { avatar: '/avatars/a3.jpg' }, { avatar: '/avatars/a4.jpg' },
  { avatar: '/avatars/a5.jpg' }, { avatar: '/avatars/a6.jpg' },
  { avatar: '/avatars/a7.jpg' }
])

const gallery = ref([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}])
const relatedEvents = ref([
  {
    id: 101,
    title: 'Morning crocheting with Emily',
    date: '2025-06-12',
    place: 'Atelier, ABBY Creative Space',
  },
  {
    id: 102,
    title: 'Yoga for beginners',
    date: '2025-07-03',
    place: 'Atelier, ABBY Creative Space',
  },
])

const isPast = new Date(event.value.date) < new Date()

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  })
}
</script>