<template>
  <div v-if="loading" class="text-center p-4">Loading...</div>
  <div v-else v-bind="$attrs">
    <nav
      class="flex items-center justify-between bg-white shadow-md p-4 border-b border-gray-200"
    >
      <button @click="goBack">
        <ArrowLeft class="w-6 h-6 text-gray-600 m-2" />
      </button>

      <p class="text-lg font-medium text-center flex-1">Box</p>

      <Share2 class="w-6 h-6 text-gray-600 m-2" />
    </nav>

    <div class="flex gap-4 items-center bg-white p-4 border-b border-gray-200">
      <img
        :src="user?.avatar"
        alt="Avatar"
        class="w-12 h-12 rounded-full object-cover"
      />
      <div class="flex flex-col">
        <p class="text-lg font-bold">{{ user?.name }}</p>
        <p class="text-xs">{{ user?.bio }}</p>
      </div>
      <router-link
        :to="`/account/${user?.id}`"
        class="bg-gray-600 font-medium text-white py-2 px-3 w-fit rounded-full hover:bg-primary-700 transition-colors duration-200 whitespace-nowrap"
      >
        View profile
      </router-link>
    </div>

    <div
      class="flex gap-4 justify-between items-center text-sm text-gray-600 bg-white p-4 border-b border-gray-200"
    >
      <div class="flex items-center gap-2">
        <p>Box #{{ user?.box.boxNumber }}</p>
      </div>
      <div class="flex items-center gap-2">
        <p>
          Created on <br />
          {{ new Date(user?.box.createdAt ?? "").toLocaleDateString() }}
        </p>
      </div>
    </div>

    <div class="w-full max-w-md mx-auto">
      <div
        class="aspect-square bg-gray-300 flex justify-center items-center rounded-lg shadow-sm"
      >
        <img
          :src="user?.box.mainImage"
          alt="Box main"
          class="w-24 h-24 object-cover rounded-lg"
        />
      </div>
    </div>

    <div
      class="flex justify-between bg-white items-center p-4 border-b border-gray-200"
    >
      <div class="flex gap-4 justify-center">
        <div class="flex items-center gap-2">
          <Heart class="w-8 h-8 text-gray-600" />
          <p>{{ user?.box.likes }}</p>
        </div>
        <div class="flex items-center gap-2">
          <MessageSquare class="w-8 h-8 text-gray-600" />
          <p>{{ user?.box.comments.length }}</p>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <Eye class="w-8 h-8 text-gray-600" />
        <p>{{ user?.box.views }}</p>
      </div>
    </div>

    <div class="p-4 border-b-2 border-gray-200 bg-white">
      <p class="text-lg font-bold">Items inside</p>
      <div class="grid grid-cols-2 gap-4">
        <div
          v-for="(item, index) in user?.box.items"
          :key="index"
          class="border-2 border-gray-300 rounded-lg mt-4"
        >
          <div class="bg-gray-300 p-4">
            <img
              :src="item.image"
              :alt="item.name"
              class="w-full h-14 object-cover text-gray-600 rounded-lg"
            />
          </div>
          <div class="p-4">
            <p>{{ item.name }}</p>
          </div>
        </div>
      </div>
    </div>
    <div
      class="p-4 border-b-2 border-gray-200 bg-white"
      v-if="user && !loading"
    >
      <div class="flex justify-between items-center">
        <p>{{ commentsCount }} comment{{ commentsCount !== 1 ? "s" : "" }}</p>
        <p class="text-primary-600 font-semibold">See all</p>
      </div>

      <div class="flex gap-4 items-center mt-4">
  <div class="w-fit flex-shrink-0">
    <img
      :src="user?.avatar"
      alt="Avatar"
      class="w-12 h-12 rounded-full object-cover"
    />
  </div>
  <div class="relative w-full">
    <textarea
      class="bg-gray-100 rounded-xl px-4 py-2 pr-10 w-full resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
      name="comment"
      id="comment"
      rows="1"
      placeholder="Add a comment..."
    ></textarea>

    <SendHorizonal
      class="w-6 h-6 text-gray-600 absolute right-3 top-5 transform -translate-y-1/2 cursor-pointer"
    />
  </div>
</div>


      <div
        class="flex gap-4 items-start mt-4"
        v-for="(comment, index) in comments"
        :key="index"
      >
        <div>
          <!-- Als je avatars van gebruikers beschikbaar hebt, kun je die hier dynamisch laden -->
          <img
            :src="getUserInfo(comment.userId).avatar"
            alt="User avatar"
            class="w-12 h-12 rounded-full object-cover"
          />
        </div>
        <div>
          <div class="flex items-baseline gap-2">
            <p class="font-bold">@{{ getUserInfo(comment.userId).name }}</p>
            <!-- Usernaam kan je nog mappen als je wilt -->
            <p class="text-sm">{{ timeAgo(comment.timestamp) }}</p>
          </div>
          <p class="text-sm">{{ comment.text }}</p>
          <div class="flex items-center gap-2 mt-2 text-sm">
            <div class="flex items-center gap-1">
              <Heart class="w-6 h-6 text-gray-600" />
              <p>{{ comment.likes }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <p v-else>Loading...</p>
  </div>

  <!-- <div v-else class="p-4 text-center text-red-600">User not found.</div> -->
</template>

<script lang="ts" setup>
import {
  ArrowLeft,
  Share2,
  Heart,
  MessageSquare,
  Eye,
  CircleUserRound,
  SendHorizonal,
} from "lucide-vue-next";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted, computed } from "vue";

const route = useRoute();
const userID = Number(route.params.id);
import type User from "../interfaces/interface.user";

const user = ref<User | null>(null);
const users = ref<User[]>([]); // alle users om usernames en avatars op te halen
const loading = ref(true);
const router = useRouter();

function goBack() {
  router.back();
}

function timeAgo(dateString: string) {
  const now = new Date();
  const date = new Date(dateString);
  const seconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  const intervals = [
    { label: "year", seconds: 31536000 },
    { label: "month", seconds: 2592000 },
    { label: "day", seconds: 86400 },
    { label: "hour", seconds: 3600 },
    { label: "minute", seconds: 60 },
    { label: "second", seconds: 1 },
  ];

  for (const interval of intervals) {
    const count = Math.floor(seconds / interval.seconds);
    if (count >= 1) {
      return `${count} ${interval.label}${count !== 1 ? "s" : ""} ago`;
    }
  }
  return "just now";
}

// Haal de naam en avatar op van een user op basis van id
function getUserInfo(userId: number) {
  const foundUser = users.value.find((u) => u.id === userId);
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

async function fetchUser() {
  try {
    const res = await fetch("/src/assets/data/users.json");
    if (!res.ok) throw new Error("Failed to load users data");
    const data = await res.json();
    users.value = data.users;
    user.value = data.users.find((u: any) => u.id === userID) || null;
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchUser();
});

// computed om comments van de box te krijgen
const comments = computed(() => user.value?.box?.comments || []);
const commentsCount = computed(() => comments.value.length);
</script>
