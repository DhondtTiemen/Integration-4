<template>
  <div v-bind="$attrs" :key="eventId">
    <nav class="flex items-center justify-between bg-white shadow-md p-4">
      <ArrowLeft @click="goBack" class="cursor-pointer" />
      <p>Event</p>
      <Share2 />
    </nav>

    <div class="w-full">
      <img
        v-if="event?.images?.[0]"
        :src="event.images[0]"
        class="w-full object-cover"
        alt="Event image"
      />
    </div>

    <div
      class="flex flex-col justify-between mt-4 px-4 border-b-2 border-gray-200 pb-4"
    >
      <h1 class="font-bold text-2xl">{{ event?.title }}</h1>
      <div class="flex text-sm text-gray-600 gap-2 items-center mt-4">
        <CalendarDays />
        <p>{{ formattedDate }}</p>
      </div>
      <div class="flex text-sm text-gray-600 gap-2 items-center mt-2">
        <MapPin />
        <p>{{ event?.place }}</p>
      </div>
      <div class="flex text-sm text-gray-600 gap-2 items-center mt-4">
        <p>
          Hosted by
          <a class="underline text-black" href="#">
            {{ getUserInfo(event?.createdBy ?? -1)?.name || "Unknown" }}
          </a>
        </p>
      </div>

      <button
        class="w-full bg-gray-600 text-white py-2 mt-4 rounded-full hover:bg-primary-700 transition-colors duration-200"
      >
        Join event
      </button>
    </div>

    <div class="px-4 border-b-2 border-gray-200 pb-4">
      <div class="flex justify-between items-center mt-4">
        <p class="text-lg font-bold">
          Participants ({{ event?.participants?.length || 0 }})
        </p>
        <p class="text-gray-600 cursor-pointer">See all</p>
      </div>

      <div class="flex items-center mt-2">
        <div
          v-for="(id, index) in event?.participants.slice(0, 5)"
          :key="id"
          :class="[
            'w-12 h-12 rounded-full border-2 border-white overflow-hidden z-20 flex items-center justify-center',
            index > 0 ? '-ml-4' : '',
          ]"
        >
          <img
            v-if="getUserInfo(id)?.avatar"
            :src="getUserInfo(id).avatar"
            alt="User avatar"
            class="w-full h-full object-cover"
          />
          <CircleUserRound v-else class="text-gray-600 w-full h-full" />
        </div>

        <div
          v-if="event?.participants?.length > 5"
          class="bg-gray-300 w-12 h-12 z-20 flex items-center justify-center rounded-full -ml-4 text-sm font-semibold"
        >
          +{{ event.participants.length - 5 }}
        </div>
      </div>
    </div>

    <div
      class="p-4 border-b-2 border-gray-200"
      v-if="event?.achievements?.length"
    >
      <p class="text-lg font-bold">Event rewards</p>
      <div class="grid grid-cols-2 gap-4 mt-2">
        <div
          v-for="(badge, index) in event.achievements"
          :key="index"
          class="border-2 border-gray-200 gap-3 rounded-lg flex flex-col items-center py-8"
        >
          <img
            :src="badge"
            alt="Achievement badge"
            class="w-16 h-16 object-contain"
          />
          <p class="text-xs text-gray-600 text-center">
            Complete this event <br />to collect the reward
          </p>
        </div>
      </div>
    </div>

    <div class="p-4 border-b-2 border-gray-200" v-if="event?.about">
      <p class="text-lg font-bold">About</p>
      <p class="mt-4 text-gray-600">{{ event.about }}</p>
    </div>

    <div class="p-4 border-b-2 border-gray-200" v-if="event?.materials?.length">
      <p class="text-lg font-bold">Material to bring</p>
      <ul>
        <li
          v-for="(material, index) in event.materials"
          :key="index"
          class="flex items-center gap-2 mt-4"
        >
          <Check class="text-gray-600 inline-block mr-2" />
          <p>{{ material }}</p>
        </li>
      </ul>
    </div>

    <div class="p-4 border-b-2 border-gray-200" v-if="suggestedEvents.length">
      <p class="text-lg font-bold">You might also like</p>
      <router-link
        :to="`/event/${suggestedEvent.id}`"
        v-for="suggestedEvent in suggestedEvents"
        :key="suggestedEvent.id"
        class="border-2 border-gray-300 mt-4 block rounded-lg"
      >
        <img
          v-if="suggestedEvent.images?.[0]"
          :src="suggestedEvent.images[0]"
          alt="Suggested event image"
          class="w-full h-36 object-cover"
        />
        <div class="p-4">
          <p class="font-semibold">{{ suggestedEvent.title }}</p>
          <p class="text-xs text-gray-600 mt-1">
            {{
              new Date(suggestedEvent.date).toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
                year: "numeric",
              })
            }}
            - {{ suggestedEvent.place }}
          </p>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  CircleUserRound,
  ArrowLeft,
  Share2,
  CalendarDays,
  MapPin,
  Check,
} from "lucide-vue-next";
import { ref, onMounted, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";

import type Event from "../../interfaces/interface.event";
import type { User as IUser } from "../../interfaces/interface.user";

const route = useRoute();
const router = useRouter();

const userId = ref<number | null>(null); // logged in user id
const event = ref<Event | null>(null);
const users = ref<IUser[]>([]);
const events = ref<Event[]>([]); // all events loaded
const loading = ref(true);

// Get dynamic event ID as computed so it updates when route changes
const eventId = computed(() => Number(route.params.id));

const formattedDate = computed(() => {
  if (!event.value) return "";
  const date = new Date(`${event.value.date}T${event.value.time}`);
  return date.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
});

function getUserInfo(userId: number) {
  const foundUser = users.value.find((u: IUser) => u.id === userId);
  if (!foundUser) {
    return {
      name: "Unknown",
      avatar: "default-avatar.jpg", // fallback avatar
    };
  }
  return {
    name: foundUser.name,
    avatar: foundUser.avatar,
  };
}

async function fetchData() {
  try {
    loading.value = true;

    const usersResponse = await fetch("/src/assets/data/users.json");
    const eventsResponse = await fetch("/src/assets/data/events.json");

    if (!usersResponse.ok || !eventsResponse.ok) {
      throw new Error("Failed to fetch users or events");
    }

    const usersData = await usersResponse.json();
    const eventsData = await eventsResponse.json();

    users.value = usersData.users;
    events.value = Array.isArray(eventsData) ? eventsData : eventsData.events;

    const foundEvent = events.value.find((e: Event) => e.id === eventId.value);
    event.value = foundEvent ?? null;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
    console.log("Event data loaded:", event.value);
  }
}

// Get logged-in user ID from localStorage
const storedId = localStorage.getItem("userId");
if (storedId) {
  userId.value = Number(storedId);
}

// Suggested events (exclude current and ones user is already in)
const suggestedEvents = computed(() => {
  if (!events.value.length || !userId.value) return [];

  return events.value.filter(
    (e) => e.id !== event.value?.id && !e.participants.includes(userId.value!)
  );
});

function goBack() {
  router.back();
}

onMounted(() => {
  fetchData();
});

// Re-fetch data when the route changes
watch(
  () => route.params.id,
  () => {
    fetchData();
  }
);
</script>
