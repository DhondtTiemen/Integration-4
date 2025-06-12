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
import router from "../../bootstrap/router";
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

import db from "../../firebase/init.ts";

const events = ref([]);
const loading = ref(true);

async function getEvents() {
  try{
    events.value = []; // reset!
  const eventsQuery = query(collection(db, "events"));
  const querySnap = await getDocs(eventsQuery);
  querySnap.forEach((doc) => {
    events.value.push({ id: doc.id, ...doc.data() });
  

  });
}catch (error) {
    console.error("Error fetching user data:", error);
    user.value = null;
    return null;
  } finally {
    loading.value = false; // Uncomment if you have a loading state
  }
}

onMounted(() => {
  getEvents();
});
</script>
