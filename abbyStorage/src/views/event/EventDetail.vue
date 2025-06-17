<template>
  <Popup :visible="showPopup" @close="showPopup = false" />

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
          <router-link
            :to="`/account/${event?.createdBy}`"
            class="underline text-black"
          >
            {{ getUserInfo(event?.createdBy ?? -1)?.name || "Unknown" }}
          </router-link>
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
                  class="w-10 h-10 rounded-full border-2 border-white bg-gray-200 text-gray-600"
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
        <div class="flex justify-center mt-4 items-center gap-4 p-3">
          <div class="flex flex-col items-center text-xs">
            <svg
              width="52"
              height="52"
              viewBox="0 0 52 52"
              class="fill-alphaBlue mb-2"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M41.263 6.53913C36.88 2.48071 31.0156 0 24.5717 0C11.0009 0 0 11.0009 0 24.5717C0 38.1424 11.0009 49.1433 24.5717 49.1433C25.9518 49.1433 27.3052 49.0297 28.6239 48.8106L27.4988 44.6098C25.5934 37.4974 29.6774 30.1924 36.6589 28.0465L36.6558 28.0363L41.263 26.8015V6.53913ZM9.01063 15.7658C11.5302 15.7658 13.5717 17.8083 13.5717 20.3269C13.5717 22.8455 11.5302 24.888 9.01063 24.888C6.49101 24.888 4.45054 22.8465 4.45054 20.3269C4.45054 17.8073 6.49204 15.7658 9.01063 15.7658ZM9.01063 35.893C7.01316 35.893 5.3945 34.2734 5.3945 32.2759C5.3945 30.2784 7.01316 28.6598 9.01063 28.6598C11.0081 28.6598 12.6278 30.2794 12.6278 32.2759C12.6278 34.2723 11.0081 35.893 9.01063 35.893ZM16.8592 44.0181C14.8618 44.0181 13.2431 42.3994 13.2431 40.4019C13.2431 38.4045 14.8618 36.7848 16.8592 36.7848C18.8567 36.7848 20.4764 38.4045 20.4764 40.4019C20.4764 42.3994 18.8567 44.0181 16.8592 44.0181ZM18.7154 16.0504C15.8149 16.0504 13.4642 13.6997 13.4642 10.7992C13.4642 7.89876 15.8149 5.54807 18.7154 5.54807C21.6159 5.54807 23.9666 7.89979 23.9666 10.7992C23.9666 13.6987 21.6149 16.0504 18.7154 16.0504ZM33.0253 19.343C29.6355 19.343 26.8875 16.5951 26.8875 13.2042C26.8875 9.8133 29.6355 7.0664 33.0253 7.0664C36.4152 7.0664 39.1641 9.81433 39.1641 13.2042C39.1641 16.5941 36.4162 19.343 33.0253 19.343Z"
              />
              <path
                d="M50 44.41C50 44.4428 50 44.4756 49.999 44.5083C49.9611 48.4531 47.5623 51.6341 44.6106 51.6341C44.0618 51.6341 43.5315 51.5246 43.0329 51.3188C43.3001 50.6359 43.4516 49.8578 43.4516 49.0346C43.4516 48.0477 43.2346 47.1273 42.8609 46.3563C42.8066 46.2427 42.7493 46.1331 42.6879 46.0277C42.4585 45.5363 42.3306 44.9875 42.3306 44.409C42.3306 42.9962 43.0943 41.7604 44.2328 41.0959H48.0977C49.2086 41.7461 49.9652 42.9388 49.999 44.3107C50 44.3435 50 44.3763 50 44.409V44.41Z"
              />
              <path d="M47.9515 0.0488281H44.3784V38.6355H47.9515V0.0488281Z" />
            </svg>
            <p class="font-bold">Clay & Coffee</p>
            <p>Complete this workshop</p>
          </div>
          <div class="flex flex-col items-center text-xs">
            <div class="relative">
              <svg
                width="52"
                height="52"
                viewBox="0 0 52 52"
                class="fill-alphaGreen mb-2"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M41.263 6.53913C36.88 2.48071 31.0156 0 24.5717 0C11.0009 0 0 11.0009 0 24.5717C0 38.1424 11.0009 49.1433 24.5717 49.1433C25.9518 49.1433 27.3052 49.0297 28.6239 48.8106L27.4988 44.6098C25.5934 37.4974 29.6774 30.1924 36.6589 28.0465L36.6558 28.0363L41.263 26.8015V6.53913ZM9.01063 15.7658C11.5302 15.7658 13.5717 17.8083 13.5717 20.3269C13.5717 22.8455 11.5302 24.888 9.01063 24.888C6.49101 24.888 4.45054 22.8465 4.45054 20.3269C4.45054 17.8073 6.49204 15.7658 9.01063 15.7658ZM9.01063 35.893C7.01316 35.893 5.3945 34.2734 5.3945 32.2759C5.3945 30.2784 7.01316 28.6598 9.01063 28.6598C11.0081 28.6598 12.6278 30.2794 12.6278 32.2759C12.6278 34.2723 11.0081 35.893 9.01063 35.893ZM16.8592 44.0181C14.8618 44.0181 13.2431 42.3994 13.2431 40.4019C13.2431 38.4045 14.8618 36.7848 16.8592 36.7848C18.8567 36.7848 20.4764 38.4045 20.4764 40.4019C20.4764 42.3994 18.8567 44.0181 16.8592 44.0181ZM18.7154 16.0504C15.8149 16.0504 13.4642 13.6997 13.4642 10.7992C13.4642 7.89876 15.8149 5.54807 18.7154 5.54807C21.6159 5.54807 23.9666 7.89979 23.9666 10.7992C23.9666 13.6987 21.6149 16.0504 18.7154 16.0504ZM33.0253 19.343C29.6355 19.343 26.8875 16.5951 26.8875 13.2042C26.8875 9.8133 29.6355 7.0664 33.0253 7.0664C36.4152 7.0664 39.1641 9.81433 39.1641 13.2042C39.1641 16.5941 36.4162 19.343 33.0253 19.343Z"
                />
                <path
                  d="M50 44.41C50 44.4428 50 44.4756 49.999 44.5083C49.9611 48.4531 47.5623 51.6341 44.6106 51.6341C44.0618 51.6341 43.5315 51.5246 43.0329 51.3188C43.3001 50.6359 43.4516 49.8578 43.4516 49.0346C43.4516 48.0477 43.2346 47.1273 42.8609 46.3563C42.8066 46.2427 42.7493 46.1331 42.6879 46.0277C42.4585 45.5363 42.3306 44.9875 42.3306 44.409C42.3306 42.9962 43.0943 41.7604 44.2328 41.0959H48.0977C49.2086 41.7461 49.9652 42.9388 49.999 44.3107C50 44.3435 50 44.3763 50 44.409V44.41Z"
                />
                <path
                  d="M47.9515 0.0488281H44.3784V38.6355H47.9515V0.0488281Z"
                />
              </svg>
              <div
                class="absolute bg-alphaYellow h-10 w-10 text-alphaBlack font-bold rounded-full -right-5 -top-5 text-[14px] flex items-center justify-center"
              >
                <p>2/5</p>
              </div>
            </div>
            <p class="font-bold">Join workshops</p>
            <p>Attend 3 more events</p>
          </div>
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
            <div v-if="uploading" class="text-sm text-gray-600 mt-2">
              Uploading...
            </div>
            <div v-if="uploadError" class="text-sm text-red-500 mt-2">
              {{ uploadError }}
            </div>
          </div>
          <div v-else class="text-center text-gray-600 py-4">
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
            <div v-if="uploading" class="text-sm text-gray-600 mt-2">
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
import Popup from "../../components/generic/popUp.vue";
import {
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
const showPopup = ref(false);
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
  if (!eventId) return;

  if (!storedIdRaw) {
    console.error("User ID not found in localStorage");
    showPopup.value = true; // Show popup if user is not logged in
    return;
  }
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
