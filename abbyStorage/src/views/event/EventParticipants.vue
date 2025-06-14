<template>
  <div>
    <nav
      class="relative flex items-center justify-between p-4 h-[56px] bg-alphaYellow"
    >
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
        Participants
      </p>
    </nav>
    <div v-if="loading" class="text-gray-500">Loading...</div>
    <div v-else>
      <div v-if="participants.length">
        <router-link
          :to="`/account/${user.id}`"
          v-for="user in participants"
          :key="user.id"
          class="flex items-center gap-4 border-b border-gray-400 px-4 py-3"
        >
          <template v-if="user.name === 'Unknown'">
            <CircleUserRound
              class="w-10 h-10 text-gray-400 bg-gray-200 rounded-full"
            />
          </template>
          <template v-else>
            <img
              :src="user.avatar"
              :alt="user.name"
              class="w-10 h-10 rounded-full object-cover"
            />
          </template>
          <div>
            <div class="font-medium">{{ user.name }}</div>
            <div class="text-xs text-gray-500">
              {{ user.bio || "No bio" }}
            </div>
          </div>
        </router-link>
      </div>
      <div v-else class="text-gray-500">No participants found.</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { CircleUserRound } from "lucide-vue-next";
import { getEventById } from "../../firebase/eventService";
import { getUserById } from "../../firebase/userService";

const router = useRouter();
const route = useRoute();
const loading = ref(true);
const participants = ref<any[]>([]);

function goBack() {
  router.back();
}

onMounted(async () => {
  loading.value = true;
  const eventId = String(route.params.id);
  let participantIds: string[] = [];

  // Haal het event op uit Firestore
  const event = await getEventById(eventId);
  if (event && Array.isArray(event.participants)) {
    participantIds = event.participants.map(String);
  }

  // Haal alle user info op voor de deelnemers
  const users: any[] = [];
  for (const pid of participantIds) {
    try {
      const user = await getUserById(pid);
      users.push(
        user || {
          id: pid,
          name: "Unknown",
          avatar: "",
          bio: "",
        }
      );
    } catch {
      users.push({
        id: pid,
        name: "Unknown",
        avatar: "",
        bio: "",
      });
    }
  }
  participants.value = users;
  loading.value = false;
});
</script>
