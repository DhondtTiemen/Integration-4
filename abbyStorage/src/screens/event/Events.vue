<template>
  <section class="min-h-screen">
    <!-- Header -->
    <nav class="relative flex items-center justify-between p-4 bg-alphaYellow">
      <ArrowLeft class="z-10" />
      <p
        class="absolute left-1/2 transform -translate-x-1/2 text-center font-medium"
      >
        Events
      </p>
      <router-link to="/event/create">
        <PlusIcon class="w-6 h-6 mr-2 inline-block" />
      </router-link>
    </nav>

    <div v-if="loading" class="text-center text-gray-500">
      Loading events...
    </div>

    <div v-else class="space-y-4" v-for="event in events">
      <Event v-if="event" :event="event" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { PlusIcon } from "lucide-vue-next";
import router from "../../bootstrap/router";
import Event from "../../components/generic/EventCard.vue";

const events = ref([]);
const loading = ref(true);

async function fetchEvents() {
  try {
    // 1️⃣ fetch standaard events.json
    const response = await fetch("/src/assets/data/events.json");
    const data = await response.json();
    const jsonEvents = data.events || [];

    // 2️⃣ fetch localStorage events
    const storedEvents = JSON.parse(localStorage.getItem("events") || "[]");

    // 3️⃣ combineer beide
    events.value = [...jsonEvents, ...storedEvents];
  } catch (error) {
    console.error("Error loading events:", error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchEvents();
});
</script>
