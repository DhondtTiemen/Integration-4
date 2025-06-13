<template>
  <section class="min-h-screen mb-16">
    <!-- Header -->
    <nav class="relative flex items-center justify-between p-4 bg-alphaYellow">
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

async function getEvents() {
  try {
    events.value = []; // reset!
    const eventsQuery = query(collection(db, "events"));
    const querySnap = await getDocs(eventsQuery);
    const now = new Date();

    const fetchedEvents = [];
    querySnap.forEach((doc) => {
      const data = { id: doc.id, ...doc.data() };
      // Zorg dat event.date een Date object is
      const eventDate = new Date(data.date);
      // Alleen toekomstige events
      if (eventDate >= now) {
        data.dateObj = eventDate;
        fetchedEvents.push(data);
      }
    });

    // Sorteer op datum (dichtstbijzijnde eerst)
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
