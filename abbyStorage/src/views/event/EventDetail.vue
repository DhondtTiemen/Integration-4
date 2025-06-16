<template>
  <div class="min-h-screen bg-white flex flex-col pb-16">
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

    <section v-if="event" class="p-4 mb-4 flex flex-col gap-4">
      <!-- Cover image -->
      <div class="aspect-[4/3] bg-gray-200 flex items-center justify-center">
        <ImageTemplate :path="event.image" screen="boxDetail" />
      </div>

      <!-- Event info -->
      <div>
        <h2 class="text-xl font-bold">{{ event.title }}</h2>
        <p
          v-if="event.status == 'Pending'"
          class="text-sm text-gray-600 flex mt-1 items-center gap-1"
        >
          <Clock class="w-4 h-4" />
          {{ event.status }}
        </p>
        <p class="text-sm text-gray-600 flex items-center gap-1 mt-1">
          <CalendarDays class="w-4 h-4" />
          {{ formatDateTime(event.date) }}
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
          class="mt-3 px-5 py-2.5 w-full text-sm font-medium transition-all"
          :class="[
            isPast
              ? 'bg-gray-400 cursor-not-allowed'
              : hasParticipate()
              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
              : 'bg-alphaGreen hover:bg-green-700',
          ]"
          :disabled="isPast"
          @click="toggleParticipateEvent"
        >
          <span v-if="isPast">Event finished</span>
          <span v-else-if="hasParticipate()">Already joined</span>
          <span v-else>Join event</span>
        </button>
      </div>

      <!-- Participants -->
      <router-link :to="`/event/${event.id}/participants`">
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
      </router-link>

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

      <div>
        <h3 class="font-medium mb-2">Materials to bring</h3>
        <ul>
          <li
            v-for="(m, index) in event.materials"
            :key="index"
            class="flex items-center gap-2 mb-1"
          >
            <Check class="text-alphaGreen w-8 h-8"></Check>
            <p class="w-full">{{ m }}</p>
          </li>
        </ul>
      </div>

      <!-- Gallery -->
      <div v-if="isPast">
        <div class="flex justify-between items-center mb-2">
          <h3 class="font-medium">Event gallery</h3>
          <button class="text-sm text-gray-500">See all</button>
        </div>
        <div v-if="gallery.length === 0">
          <div
            v-if="event?.createdBy === storedIdRaw"
            class="text-center text-gray-500 py-4"
          >
            <button
              class="bg-alphaGreen text-white px-4 py-2 rounded font-medium"
              @click="triggerFileInput"
              :disabled="uploading"
            >
              Add photos
            </button>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              multiple
              class="hidden"
              @change="handleGalleryUpload"
            />
            <div v-if="uploading" class="text-sm text-gray-400 mt-2">
              Uploading...
            </div>
            <div v-if="uploadError" class="text-sm text-red-500 mt-2">
              {{ uploadError }}
            </div>
          </div>
          <div v-else class="text-center text-gray-400 py-4">
            No photos yet.
          </div>
        </div>
        <div v-else class="grid grid-cols-4 gap-2">
          <div
            v-for="(img, i) in gallery.slice(0, 3)"
            :key="i"
            class="aspect-square bg-gray-200"
          >
            <img :src="img" class="w-full h-full object-cover rounded" />
          </div>
          <div
            v-if="gallery.length > 3"
            class="aspect-square bg-alphaGreen text-white flex items-center justify-center font-medium"
          >
            +{{ gallery.length - 3 }}
          </div>
          <div
            v-if="event?.createdBy === storedIdRaw"
            class="col-span-4 text-center mt-2"
          >
            <button
              class="bg-alphaGreen text-white px-4 py-2 rounded font-medium"
              @click="triggerFileInput"
              :disabled="uploading"
            >
              Add more photos
            </button>
            <input
              ref="fileInput"
              type="file"
              accept="image/*"
              multiple
              class="hidden"
              @change="handleGalleryUpload"
            />
            <div v-if="uploading" class="text-sm text-gray-400 mt-2">
              Uploading...
            </div>
            <div v-if="uploadError" class="text-sm text-red-500 mt-2">
              {{ uploadError }}
            </div>
          </div>
        </div>
      </div>
      <div>
        <h3 class="font-medium mb-2">You might also like</h3>
        <div v-if="relatedEvents.length === 0" class="text-gray-500 text-sm">
          No related events found.
        </div>
        <div v-else class="space-y-4">
          <router-link
            :to="`/event/${related.id}`"
            v-for="related in relatedEvents.slice(0, 3)"
            :key="related.id"
            class="bg-gray-100 p-3 rounded flex flex-col"
          >
            <div class="aspect-[4/2] bg-gray-300 mb-2">
              <ImageTemplate :path="related.image" screen="default" />
            </div>
            <p class="text-sm font-semibold">{{ related.title }}</p>
            <p class="text-xs text-gray-600">
              {{ formatDateTime(related.date) }} • {{ related.place }}
            </p>
            <button
              class="bg-alphaYellow w-fit px-4 py-1 mt-2 text-sm font-medium"
            >
              Learn more
            </button>
          </router-link>
          <router-link
            v-if="relatedEvents.length > 3"
            :to="`/events`"
            class="block text-center text-alphaGreen font-medium mt-2"
          >
            See all
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
  Clock,
  Check,
} from "lucide-vue-next";
import {
  collection,
  doc,
  query,
  updateDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";

import type User from "../../interfaces/interface.user";
import type Event from "../../interfaces/interface.event";
import db from "../../firebase/firebase.ts";
import ImageTemplate from "../../components/images/ImageTemplate.vue";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../firebase/firebase";
import { formatDateTime } from "../../utils/date.ts";
const route = useRoute();
const router = useRouter();
const users = ref<User[]>([]);

const storedIdRaw = localStorage.getItem("userId");
const eventId: string = route.params.id as string;
function goBack() {
  router.back();
}

const participants = ref<string[]>([]);
const event = ref<Event | null>(null);
const relatedEvents = ref<Event[]>([]);
const uploading = ref(false);
const uploadError = ref("");
const fileInput = ref<HTMLInputElement | null>(null);

import { computed } from "vue";
const isPast = computed(() => {
  return event.value?.date ? new Date(event.value.date) < new Date() : false;
});

const gallery = ref<string[]>([]);
function triggerFileInput() {
  fileInput.value?.click();
}
async function handleGalleryUpload() {
  if (
    !fileInput.value ||
    !fileInput.value.files ||
    fileInput.value.files.length ||
    !eventId
  )
    return;
  uploading.value = true;
  uploadError.value = "";
  try {
    const urls: string[] = [];
    for (const file of Array.from(fileInput.value.files)) {
      const fileRef = storageRef(
        storage,
        `events/${eventId}/gallery/${Date.now()}_${file.name}`
      );
      await uploadBytes(fileRef, file);
      const url = await getDownloadURL(fileRef);
      urls.push(url);
    }
    // Voeg toe aan bestaande gallery
    const eventRef = doc(db, "events", eventId);
    const eventSnap = await getDoc(eventRef);
    let currentGallery: string[] = [];
    if (eventSnap.exists()) {
      currentGallery = eventSnap.data().gallery || [];
    }
    const newGallery = [...currentGallery, ...urls];
    await updateDoc(eventRef, { gallery: newGallery });
    gallery.value = newGallery;
  } catch (err) {
    uploadError.value = "Upload failed. Try again.";
    console.error(err);
  } finally {
    uploading.value = false;
    if (fileInput.value) fileInput.value.value = "";
  }
}
async function loadEventPageData(eventId: string) {
  await getEventById(eventId);
  await getUsersData();
  if (event.value) {
    await getRelatedEvents();
    await loadParticipantsFromEvent(eventId);
  }
}
async function loadParticipantsFromEvent(eventId: string) {
  try {
    const eventRef = doc(db, "events", eventId);
    const eventSnap = await getDoc(eventRef);

    if (eventSnap.exists()) {
      participants.value = eventSnap.data().participants ?? [];
    } else {
      participants.value = [];
    }
  } catch (error) {
    console.error("Error loading participants:", error);
    participants.value = [];
  }
}

function hasParticipate(): boolean {
  return (
    storedIdRaw !== null && participants.value.includes(String(storedIdRaw))
  );
}

async function toggleParticipateEvent() {
  if (!eventId || !storedIdRaw) return;

  try {
    const eventRef = doc(db, "events", String(eventId));
    const eventSnap = await getDoc(eventRef);
    let currentParticipants: string[] = [];

    if (eventSnap.exists()) {
      currentParticipants = eventSnap.data().participants ?? [];
    } else {
      return;
    }

    if (!currentParticipants.includes(String(storedIdRaw))) {
      currentParticipants.push(String(storedIdRaw));
      await updateDoc(eventRef, {
        participants: currentParticipants,
      });
    }

    await getEventById(eventId);
    await loadParticipantsFromEvent(eventId);
  } catch (err) {
    console.error("Failed to update event participants", err);
  }
}

async function getUsersData() {
  users.value = [];
  const usersQuery = query(collection(db, "users"));
  const querySnap = await getDocs(usersQuery);
  querySnap.forEach((doc) => {
    users.value.push({ id: doc.id, ...doc.data() });
  });
}
function getUserInfo(userId: string) {
  const foundUser = users.value.find((u: User) => u.id === userId);
  if (!foundUser) {
    return {
      name: "Unknown",
      avatar: "default-avatar.jpg",
    };
  } else {
    return {
      name: foundUser.name,
      avatar: foundUser.avatar,
    };
  }
}
async function getEventById(eventId: string) {
  try {
    const eventRef = doc(db, "events", String(eventId));
    const docSnap = await getDoc(eventRef);

    if (!docSnap.exists()) {
      console.warn("No event found with document ID:", eventId);
      event.value = null;
      return null;
    }

    const eventData = { id: docSnap.id, ...docSnap.data() } as Event;
    event.value = eventData;
    gallery.value = eventData.gallery || [];
    return eventData;
  } catch (error) {
    console.error("Error fetching event data:", error);
    event.value = null;
    return null;
  }
}
async function getRelatedEvents() {
  const events: Event[] = [];
  const eventsQuery = query(collection(db, "events"));
  const querySnap = await getDocs(eventsQuery);
  querySnap.forEach((doc) => {
    const { id, ...data } = doc.data() as Event & { id?: string };
    events.push({ id: doc.id, ...data });
  });
  relatedEvents.value = events.filter(
    (e: Event) =>
      event.value &&
      e.id !== event.value.id &&
      new Date(e.date) >= new Date() &&
      e.status === "Approved"
  );
}
// async function getRelatedEvents() {
//   const events: Event[] = [];
//   const eventsQuery = query(collection(db, "events"));
//   const querySnap = await getDocs(eventsQuery);
//   querySnap.forEach((doc) => {
//     events.push({
//       id: doc.id,
//       ...doc.data(),
//       title: "",
//       about: "",
//       date: "",
//       time: "",
//       place: "",
//       achievements: [],
//       materials: [],
//       image: "",
//       createdBy: "",
//       participants: [],
//       status: "",
//     });
//   });
//   relatedEvents.value = events.filter(
//     (e: Event) =>
//       event.value &&
//       e.id !== event.value.id &&
//       new Date(e.date) >= new Date() &&
//       e.status === "Approved"
//   );
//   console.log("Related events fetched:", relatedEvents.value);
// }

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
onMounted(async () => {
  await loadEventPageData(String(route.params.id));
});

watch(
  () => route.params.id,
  async (newId) => {
    if (newId) {
      await loadEventPageData(String(newId));
    }
  }
);
</script>
