<template>
  <div v-bind="$attrs">
    <nav
      class="p-2 bg-white shadow-md border-b border-gray-200 flex items-center"
    >
      <button @click="goBack">
        <ArrowLeft class="w-6 h-6 text-gray-600 m-2" />
      </button>
    </nav>

    <div v-if="loading" class="text-center text-gray-500">Loading...</div>

    <div v-else class="mb-8 mt-4">
      <div class="flex flex-col items-center justify-center">
        <img
          :src="user?.avatar"
          alt="Avatar"
          class="w-24 h-24 rounded-full object-cover"
        />
        <h1 class="text-xl font-bold text-center text-gray-900">
          {{ user?.name }}
        </h1>
        <p class="text-center text-sm text-gray-600 mb-4 w-48">
          {{ user?.bio }}
        </p>
        <button
          class="flex items-center justify-center text-white bg-gray-600 border rounded-full shadow-sm px-4 py-2 mb-4 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
        >
          <Pencil class="w-5 h-5 mr-2 inline-block" />
          <p>Edit profile</p>
        </button>
        <div class="flex gap-4 text-gray-600">
          <p>{{ user?.following }} following</p>
          <p>|</p>
          <p>{{ user?.followers }} followers</p>
        </div>
      </div>

      <div class="bg-white mx-4 mt-8 rounded-xl p-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-lg font-semibold text-gray-900">My box</h2>

          <router-link
            :to="`/box/${user?.id}`"
            class="text-white bg-gray-600 rounded-full px-4 py-2"
          >
            View box
          </router-link>
        </div>
        <div class="grid grid-cols-2 gap-4 w-full max-w-md mx-auto">
          <div
            class="aspect-square bg-gray-300 flex justify-center items-center rounded-lg shadow-sm"
          >
            <Image class="w-16 h-16 text-gray-400" />
          </div>
          <div
            class="aspect-square bg-gray-100 flex justify-center items-center rounded-lg shadow-sm"
          >
            <p class="text-gray-500">All photos</p>
          </div>
        </div>
      </div>

      <div class="bg-white mx-4 mt-4 rounded-xl p-4">
        <div class="flex">
          <UserIcon class="w-6 h-6 mr-2" />
          <h2 class="text-lg font-semibold mb-4">About me</h2>
        </div>
        <p class="text-gray-700 text-sm">
          {{ user?.bio }}
        </p>
      </div>

      <div class="bg-white mx-4 mt-4 rounded-xl p-4">
        <div class="flex justify-between">
          <div class="flex">
            <Award class="w-6 h-6 mr-2" />
            <h2 class="text-lg font-semibold mb-4">Achievements</h2>
          </div>
          <p class="text-gray-600 text-sm mt-1">
            {{ user?.achievements.length }} badges
          </p>
        </div>
        <div class="flex justify-center gap-2">
          <template v-for="(badge, index) in user?.achievements" :key="index">
            <img :src="badge" alt="badge" class="w-10 h-10 object-contain" />
          </template>
        </div>
      </div>

      <div class="bg-white mx-4 mt-4 rounded-xl p-4">
        <div class="flex">
          <CalendarDays class="w-6 h-6 mr-2" />
          <h2 class="text-lg font-semibold mb-4">Events</h2>
        </div>

        <div v-if="events.length" class="space-y-4">
          <div
            v-for="event in events"
            :key="event.id"
            class="flex items-center gap-4"
          >
            <img
              v-if="event.images?.length"
              :src="`${event.images[0]}`"
              alt="Event"
              class="w-12 h-12 object-cover rounded-lg"
            />
            <div class="flex flex-col">
              <p class="text-sm font-medium text-gray-900">{{ event.title }}</p>
              <p class="text-gray-600 text-xs italic">
                {{ event.type }} –
                {{
                  new Date(event.date).toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "short",
                    year: "numeric",
                  })
                }}
              </p>
            </div>
          </div>
        </div>

        <div v-else class="text-sm text-gray-500">No events to display.</div>
      </div>

      <div class="bg-white mx-4 mt-8 rounded-xl p-4">
        <div class="flex">
          <Image class="w-6 h-6 mr-2" />
          <h2 class="text-lg font-semibold mb-4">My posts</h2>
        </div>

        <div class="grid grid-cols-3 grid-rows-2 gap-4 justify-center">
          <div
            v-for="post in posts.slice(0, 5)"
            :key="post.id"
            class="bg-gray-100 w-24 h-24 flex justify-center items-center rounded-lg shadow-sm overflow-hidden"
          >
            <img
              v-if="post.images?.length"
              :src="post.images[0]"
              alt="Post image"
              class="w-full h-full object-cover"
            />
            <Image v-else class="w-10 h-10 text-gray-400" />
          </div>

          <div
            class="bg-gray-100 w-24 h-24 flex justify-center items-center rounded-lg shadow-sm"
          >
            <p class="text-gray-500 text-xs text-center">All photos</p>
          </div>
        </div>
      </div>
    </div>

    <!-- <div v-else class="text-center text-red-500 mt-4">User not found.</div> -->
  </div>
</template>

<script setup lang="ts">
import {
  CircleUserRound,
  Pencil,
  ArrowLeft,
  Image,
  Award,
  User as UserIcon,
  CalendarDays,
} from "lucide-vue-next";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import type User from "../interfaces/interface.user";
import type Event from "../interfaces/interface.event";
import type Post from "../interfaces/interface.post";
const user = ref<User | null>(null);
const events = ref<Event[]>([]);
const posts = ref<Post[]>([]);
const loading = ref(true);

const route = useRoute();
const currentUserId = Number(route.params.id);

const router = useRouter();
function goBack() {
  router.back();
}

async function fetchData() {
  try {
    const usersResponse = await fetch("/src/assets/data/users.json");
    const eventsResponse = await fetch("/src/assets/data/events.json");
    const postsResponse = await fetch("/src/assets/data/posts.json");

    if (!usersResponse.ok || !eventsResponse.ok || !postsResponse.ok) {
      throw new Error("Failed to fetch users, events, or posts");
    }

    const usersData = await usersResponse.json();
    const eventsData = await eventsResponse.json();
    const postsData = await postsResponse.json();

    user.value =
      usersData.users.find((u: User) => u.id === currentUserId) || null;

    const created = eventsData.events
      .filter((event: any) => event.createdBy === currentUserId)
      .map((event: any) => ({ ...event, type: "Organised" }));

    const attended = eventsData.events
      .filter((event: any) => event.participants.includes(currentUserId))
      .map((event: any) => ({ ...event, type: "Attended" }));

    events.value = [...created, ...attended];

    posts.value = postsData.posts.filter(
      (post: any) => post.userId === currentUserId
    );
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchData();
});
</script>
