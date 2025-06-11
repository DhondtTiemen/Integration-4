<template>
  <div>
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
      Following
      </p>
    </nav>
    <div v-if="loading" class="text-gray-500 p-4">Loading...</div>
    <div v-else>
      <div v-if="followingList.length">
        <router-link
          v-for="user in followingList"
          :key="user.id"
          :to="`/account/${user.id}`"
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
      <div v-else class="text-gray-500 p-4">Not following anyone yet.</div>
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
const followingList = ref<any[]>([]);
function goBack() {
  router.back();
}
onMounted(async () => {
  const userId = route.params.id;
  // Haal alle users op
  const usersRes = await fetch("/src/assets/data/users.json");
  const usersData = await usersRes.json();
  // Vind de huidige user
  const currentUser = usersData.users.find(
    (u: any) => String(u.id) === String(userId)
  );
  const followingIds: number[] = currentUser?.following || [];

  // Map de following naar user info, fallback naar "Unknown"
  followingList.value = followingIds.map((fid: number) => {
    const user = usersData.users.find((u: any) => u.id === fid);
    return (
      user || {
        id: fid,
        name: "Unknown",
        avatar: "",
        bio: "",
      }
    );
  });

  loading.value = false;
});
</script>
