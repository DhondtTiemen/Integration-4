<template>
  <section class="min-h-screen mb-16">
    <!-- Header -->
    <nav class="relative flex items-center justify-between p-4 bg-alphaYellow">
      <svg
        @click="goBack"
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="18"
        viewBox="0 0 21 18"
        fill="none"
      >
        <path
          d="M21 6.07521L4.34696 9.11281L21 12.1504L21 18L0.0393824 11.9026L-2.8975e-07 6.62871L21 0L21 6.07521Z"
          fill="#222222"
        />
      </svg>
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

    <div v-else class="px-4 py-2" v-for="event in events">
      <Event v-if="event" :event="event" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { PlusIcon } from "lucide-vue-next";
import router from "../../router/index.ts";

import Event from "../../components/generic/EventCard.vue";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  query,
  where,
  updateDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";

import db from "../../firebase/firebase.ts";

const events = ref([]);
const loading = ref(true);

const goBack = () => router.back();

async function getEvents() {
  try {
    events.value = [];
    const eventsQuery = query(
      collection(db, "events"),
      where("status", "==", "Approved")
    );
    const querySnap = await getDocs(eventsQuery);
    const now = new Date();

    const fetchedEvents = [];
    querySnap.forEach((doc) => {
      const data = { id: doc.id, ...doc.data() };
      const eventDate = new Date(data.date);
      if (eventDate >= now) {
        data.dateObj = eventDate;
        fetchedEvents.push(data);
      }
    });

    fetchedEvents.sort((a, b) => a.dateObj - b.dateObj);

    events.value = fetchedEvents;
  } catch (error) {
    console.error("Error fetching events data:", error);
    events.value = [];
    return null;
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  getEvents();
});
</script>
