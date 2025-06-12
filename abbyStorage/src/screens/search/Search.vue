<template>
  <div>
    <div class="flex gap-2 p-4 bg-alphaYellow">
      <input
        v-model="input"
        type="text"
        placeholder="Search for people or events..."
        class="flex-1 px-3 py-2 border border-alphaDark text-gray-600 text-sm block w-full p-2.5 focus:ring-alphaDark focus:border-alphaDark"
      />
    </div>
    <!-- Zet de filters in een eigen container met vaste achtergrond -->
    <div class="flex gap-4 items-center mb-4 px-4 pt-4 z-10 relative">
      <span
        :class="[
          'cursor-pointer px-4 py-2 font-medium transition',
          filter === 'all'
            ? 'bg-alphaGreen border-1 border-alphaGreen'
            : 'text-alphaDark border border-alphaDark hover:bg-alphaLight',
        ]"
        @click="filter = 'all'"
        style="min-width: 80px; text-align: center"
        >All</span
      >
      <span
        :class="[
          'cursor-pointer px-4 py-2  font-medium transition',
          filter === 'people'
            ? 'bg-alphaGreen border-1 border-alphaGreen'
            : 'text-alphaDark border border-alphaDark hover:bg-alphaLight',
        ]"
        @click="filter = 'people'"
        style="min-width: 80px; text-align: center"
        >People</span
      >
      <span
        :class="[
          'cursor-pointer px-4 py-2  font-medium transition',
          filter === 'events'
            ? 'bg-alphaGreen border-1 border-alphaGreen'
            : 'text-alphaDark border border-alphaDark hover:bg-alphaLight',
        ]"
        @click="filter = 'events'"
        style="min-width: 80px; text-align: center"
        >Events</span
      >
    </div>

    <!-- Resultaten in een aparte container -->
    <div>
      <div v-if="filteredResults.length === 0" class="text-gray-500 mt-8">
        No results found.
      </div>

      <div v-else>
        <div v-for="item in filteredResults" :key="itemKey(item)" class="">
          <template v-if="item.type === 'user'">
            <div
              class="flex items-center justify-between border-b border-gray-300 mb-4 pb-4 px-4 gap-4"
            >
              <router-link
                :to="`/account/${item.id}`"
                class="flex items-center gap-4"
              >
                <img
                  :src="item.avatar"
                  alt="avatar"
                  class="w-12 h-12 rounded-full object-cover"
                />
                <div class="font-semibold">{{ item.name }}</div>
              </router-link>
              <button
                :class="[
                  'flex items-center justify-center py-2.5 px-5 font-medium text-sm transition',
                  isFollowing(item.id)
                    ? 'border-1'
                    : 'bg-alphaGreen border-1 border-alphaGreen',
                ]"
                @click.stop="toggleFollow(item)"
                style="min-width: 100px"
              >
                <p>
                  {{ isFollowing(item.id) ? "Unfollow" : "Follow" }}
                </p>
              </button>
            </div>
          </template>
          <template v-else>
            <router-link
              :to="`/event/${item.id}`"
              v-if="item.id"
              class="relative block mb-4"
            >
              <span
                class="absolute top-4 right-4 border border-black text-black text-xs px-2 py-1"
                >Event</span
              >

              <EventCard v-if="item" :event="item" />
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, watch } from "vue";
import EventCard from "../../components/generic/EventCard.vue";
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
import type User from "../../interfaces/interface.user";
import type Event from "../../interfaces/interface.event";
const filter = ref("all");
const input = ref("");
const users = ref<User[]>([]);
const events = ref<Event[]>([]);

async function getUsersData() {
  users.value = []; // reset!
  const usersQuery = query(collection(db, "users"));
  const querySnap = await getDocs(usersQuery);
  querySnap.forEach((doc) => {
    users.value.push({ id: doc.id, ...doc.data() });
  });
}
async function getEvents() {
  events.value = []; // reset!
  const eventsQuery = query(collection(db, "events"));
  const querySnap = await getDocs(eventsQuery);
  querySnap.forEach((doc) => {
    events.value.push({ id: doc.id, ...doc.data() });
  });
}
const loggedInUser = ref<User | null>(null);
async function getLoggedInUser() {
  const storedId = localStorage.getItem("userId");
  if (!storedId) return;
  const userRef = doc(db, "users", storedId);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    loggedInUser.value = { id: docSnap.id, ...docSnap.data() } as User;
    // console.log("Logged in user fetched:", loggedInUser.value);
  }
}
function isFollowing(userId: string) {
  if (!loggedInUser.value) return false;
  return (loggedInUser.value.following || [])
    .map(String)
    .includes(String(userId));
}
async function toggleFollow(profile: any) {
  if (!loggedInUser.value || !profile) return;

  const myId = loggedInUser.value.id;
  const profileId = String(profile.id);

  if (!myId || !profileId) {
    console.error("No logged in user id or profile id found!");
    return;
  }

  const following = (loggedInUser.value.following || []).map(String);
  const followers = (profile.followers || []).map(String);

  const idx = following.indexOf(profileId);

  if (idx === -1) {
    following.push(profileId);
    followers.push(myId);
  } else {
    following.splice(idx, 1);
    const followerIdx = followers.indexOf(myId);
    if (followerIdx !== -1) followers.splice(followerIdx, 1);
  }

  // Update refs zodat UI direct reageert
  loggedInUser.value = { ...loggedInUser.value, following: [...following] };
  profile.followers = [...followers];

  try {
    const userRef = doc(db, "users", myId);
    await updateDoc(userRef, {
      following: following,
    });
    const profileRef = doc(db, "users", profileId);
    await updateDoc(profileRef, {
      followers: followers,
    });
  } catch (err) {
    console.error("Failed to update follows in Firestore", err);
  }
}
const filteredResults = computed(() => {
  let results = [];
  const i = input.value.trim().toLowerCase();
  const loggedInId = localStorage.getItem("userId");

  if (filter.value === "all" || filter.value === "people") {
    results.push(
      ...users.value
        .filter(
          (u: any) => u.id !== loggedInId && u.name?.toLowerCase().includes(i)
        )
        .map((u: any) => ({ ...u, type: "user" }))
    );
  }
  if (filter.value === "all" || filter.value === "events") {
    results.push(
      ...events.value
        .filter(
          (e: any) =>
            e.title?.toLowerCase().includes(i) ||
            e.about?.toLowerCase().includes(i) ||
            e.place?.toLowerCase().includes(i)
        )
        .map((e) => ({ ...e, type: "event" }))
    );
  }
  return results;
});

function itemKey(item: any) {
  return `${item.type}-${item.id}`;
}
onMounted(() => {
  getUsersData();
  getEvents();
  getLoggedInUser();
});
watch(input, () => {
  getLoggedInUser();
});
</script>
