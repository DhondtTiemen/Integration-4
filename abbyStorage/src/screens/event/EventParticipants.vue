<template>
  <div class="">
    <nav class="relative flex items-center justify-between p-4 h-[56px] bg-alphaYellow">
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
          <router-link :to="`/account/${user.id}`"
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
const router = useRouter();
const route = useRoute();
const loading = ref(true);
const participants = ref<any[]>([]);
function goBack() {
  router.back();
}
onMounted(async () => {
  // Haal eventId of participants uit de url
  const eventId = route.params.id;
  let participantIds: number[] = [];

  // Probeer participants direct uit de query te halen (bijv. ?participants=1,2,3)
  if (route.query.participants) {
    participantIds = String(route.query.participants)
      .split(",")
      .map((id) => Number(id));
  } else if (eventId) {
    // Anders: haal de event op en pak daar de participants uit
    const eventsRes = await fetch("/src/assets/data/events.json");
    const eventsData = await eventsRes.json();
    const event = eventsData.events.find(
      (e: any) => String(e.id) === String(eventId)
    );
    participantIds = event?.participants || [];
  }

  // Haal alle users op
  const usersRes = await fetch("/src/assets/data/users.json");
  const usersData = await usersRes.json();

  // Map de deelnemers naar user info, fallback naar "Unknown"
  participants.value = participantIds.map((pid: number) => {
    const user = usersData.users.find((u: any) => u.id === pid);
    return (
      user || {
        id: pid,
        name: "Unknown",
        avatar: "",
        bio: "",
      }
    );
  });

  loading.value = false;
});
</script>
