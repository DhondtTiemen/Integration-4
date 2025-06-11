<template>
  <div class="min-h-screen bg-white flex flex-col">
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
        Event
      </p>
      <button @click="shareEvent">
        <Share class="z-10" />
      </button>
    </nav>

    <section v-if="event" class="p-4 space-y-6">
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
        <p class="text-sm text-gray-500 mt-1">
          Hosted by
          <a class="underline text-black" href="#">
            {{ getUserInfo(event?.createdBy ?? -1)?.name || "Unknown" }}
          </a>
        </p>
        <button
          class="mt-3 px-5 py-2.5 w-full text-sm font-medium"
          :class="
            isPast
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-alphaGreen hover:bg-green-700'
          "
          :disabled="isPast"
        >
          {{ isPast ? "Event finished" : "Join event" }}
        </button>
      </div>

      <!-- Participants -->
      <div>
        <div class="flex justify-between items-center mb-2">
          <h3 class="font-medium text-base">
            Participants ({{ event.participants.length }})
          </h3>
          <button class="text-sm text-gray-500">See all</button>
        </div>
        <div class="flex -space-x-3">
          <div class="flex -space-x-3">
            <template v-for="(p, i) in event.participants.slice(0, 6)" :key="i">
              <template v-if="getUserInfo(p)?.name === 'Unknown'">
                <CircleUserRound
                  class="w-10 h-10 rounded-full border-2 border-white bg-gray-200 text-gray-400"
                />
              </template>
              <template v-else>
                <img
                  :src="getUserInfo(p)?.avatar"
                  class="w-10 h-10 rounded-full border-2 border-white"
                  :alt="getUserInfo(p)?.name"
                />
              </template>
            </template>
            <div
              v-if="event.participants.length > 6"
              class="w-10 h-10 rounded-full bg-alphaGreen text-white flex items-center justify-center text-sm font-medium"
            >
              +{{ event.participants.length - 6 }}
            </div>
          </div>
        </div>
      </div>

      <!-- Achievements -->
      <div>
        <h3 class="font-medium mb-2">Event Achievements</h3>
        <div class="flex items-center gap-4 bg-gray-100 p-3">
          <Image class="w-10 h-10 text-gray-400" />
          <p class="text-sm">
            Expressive drawing<br /><span class="text-xs text-gray-500"
              >Complete this workshop</span
            >
          </p>
        </div>
      </div>

      <!-- About -->
      <div>
        <h3 class="font-medium mb-2">About</h3>
        <p class="text-sm text-gray-700">{{ event.about }}</p>
      </div>

      <!-- Gallery -->
      <div>
        <div class="flex justify-between items-center mb-2">
          <h3 class="font-medium">Event gallery</h3>
          <button class="text-sm text-gray-500">See all</button>
        </div>
        <div class="grid grid-cols-4 gap-2">
          <div
            v-for="(img, i) in gallery.slice(0, 3)"
            :key="i"
            class="aspect-square bg-gray-200"
          ></div>
          <div
            class="aspect-square bg-alphaGreen text-white flex items-center justify-center font-medium"
          >
            +{{ gallery.length - 3 }}
          </div>
        </div>
      </div>

      <!-- Suggestions -->
      <div>
        <h3 class="font-medium mb-2">You might also like</h3>
        <div class="space-y-4">
          <router-link
            :to="`/event/${related.id}`"
            v-for="related in relatedEvents"
            :key="related.id"
            class="bg-gray-100 p-3 rounded flex flex-col"
          >
            <div class="aspect-[4/2] bg-gray-300 mb-2"></div>
            <p class="text-sm font-semibold">{{ related.title }}</p>
            <p class="text-xs text-gray-600">
              {{ formatDate(related.date) }} • {{ related.place }}
            </p>
            <button
              class="bg-alphaYellow w-fit px-4 py-1 mt-2 text-sm font-medium"
            >
              Learn more
            </button>
          </router-link>
        </div>
      </div>
    </section>
    <p v-else class="p-4 text-gray-500 text-sm">Loading event details...</p>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import {
  Image,
  CalendarDays,
  MapPin,
  Share,
  CircleUserRound,
} from "lucide-vue-next";

import type User from "../../interfaces/interface.user";
const route = useRoute();
const router = useRouter();
const users = ref<User[]>([]); // alle users om usernames en avatars op te halen

function goBack() {
  router.back();
}

import type Event from "../../interfaces/interface.event";
const event = ref<Event | null>(null);
const relatedEvents = ref<Event[]>([]);

async function fetchUser() {
  try {
    const res = await fetch("/src/assets/data/users.json");
    if (!res.ok) throw new Error("Failed to load users data");
    const data = await res.json();
    users.value = data.users;
  } catch (error) {
    console.error(error);
  }
}
function getUserInfo(userId: number) {
  const foundUser = users.value.find((u: User) => u.id === userId);
  if (!foundUser) {
    return {
      name: "Unknown",
      avatar: "default-avatar.jpg", // fallback avatar
    };
  } else {
    return {
      name: foundUser.name,
      avatar: foundUser.avatar || "default-avatar.jpg", // fallback avatar
    };
  }
}
async function fetchEvents() {
  const res = await fetch("/src/assets/data/events.json");
  const data = await res.json();
  const allEvents = data.events;

  event.value = allEvents.find(
    (e: Event) => String(e.id) === String(route.params.id)
  );

  // Suggestions: upcoming events in ABBY
  relatedEvents.value = allEvents.filter(
    (e: Event) =>
      event.value &&
      e.id !== event.value.id &&
      new Date(e.date) >= new Date() &&
      e.place?.toLowerCase().includes("abby")
  );
}

// fetchEvents();

// const participants = ref([
//   { avatar: "/avatars/a1.jpg" },
//   { avatar: "/avatars/a2.jpg" },
//   { avatar: "/avatars/a3.jpg" },
//   { avatar: "/avatars/a4.jpg" },
//   { avatar: "/avatars/a5.jpg" },
//   { avatar: "/avatars/a6.jpg" },
//   { avatar: "/avatars/a7.jpg" },
// ]);

const gallery = ref([{}, {}, {}, {}, {}, {}, {}, {}, {}, {}]);

const isPast = event.value?.date
  ? new Date(event.value.date) < new Date()
  : false;

function formatDate(dateStr: any) {
  return new Date(dateStr).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
}

function shareEvent() {
  if (navigator.share && event.value) {
    navigator
      .share({
        title: "Check out this event",
        text: event.value.title,
        url: window.location.href,
      })
      .catch((err) => {
        console.warn("Share canceled or failed:", err);
      });
  } else {
    alert("Sharing not supported in this browser.");
  }
}
onMounted(() => {
  fetchEvents();
  fetchUser();
  route.params.id;
});
</script>
