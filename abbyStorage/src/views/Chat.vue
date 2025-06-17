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
        Chats
      </p>
    </nav>
    <div v-if="loading" class="text-gray-500 p-4">Loading...</div>
    <div v-else>
      <div v-if="followingList.length">
        <router-link
          v-for="user in followingList"
          :key="user.id"
          :to="{ path: `/chat/${user.id}`, query: { name: user.name } }"
          class="flex items-center justify-between border-b border-gray-300 mb-4 pb-4 px-4 gap-4 py-3 no-underline text-inherit"
        >
          <template v-if="user.name === 'Unknown'">
            <CircleUserRound
              class="w-10 h-10 text-gray-400 bg-gray-200 rounded-full"
            />
          </template>
          <div class="flex items-center gap-4 w-full" v-else>
            <img
              :src="user.avatar"
              alt="avatar"
              class="w-12 h-12 rounded-full object-cover"
            />
            <div class="flex justify-between">
<div>
                <div class="font-semibold">{{ user.name }}</div>
              <div class="text-sm text-gray-600 truncate">
                {{ user.lastMessage !== "" ? user.lastMessage : "Send your first message" }}
              </div>
</div>
            </div>
            <div class="text-gray-600 ml-auto mt-1 self-start text-sm">
                {{ user.lastMessageTime ? formatTimestamp(user.lastMessageTime) : '' }}
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
import { useRouter } from "vue-router";
import { CircleUserRound } from "lucide-vue-next";
import db from "../firebase/firebase.ts";
import {
  doc,
  getDoc,
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
} from "firebase/firestore";
import type User from "../interfaces/interface.user";

function formatTimestamp(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffHours = diffMs / (1000 * 60 * 60);

  if (diffHours < 24) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  } else if (diffHours < 168) {
    return date.toLocaleDateString('nl-BE', { weekday: 'long' });
  } else {
    return date.toLocaleDateString('nl-BE', { day: '2-digit', month: '2-digit' });
  }
}

const router = useRouter();
const loading = ref(true);
const followingList = ref<any[]>([]);
function goBack() {
  router.back();
}

const loggedInUser = ref<User | null>(null);
async function getLoggedInUser() {
  const storedId = localStorage.getItem("userId");
  if (!storedId) return;
  const userRef = doc(db, "users", storedId);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    loggedInUser.value = { id: docSnap.id, ...docSnap.data() } as User;
  }
}

async function getLatestMessageBetween(userId1: string, userId2: string) {
  const chatId = [userId1, userId2].sort().join("_");
  const messagesRef = collection(db, "messages");
  const q = query(
    messagesRef,
    where("chatId", "==", chatId),
    orderBy("timestamp", "desc"),
    limit(1)
  );

  const querySnapshot = await getDocs(q);
  if (!querySnapshot.empty) {
    const data = querySnapshot.docs[0].data();
    return {
      message: data.message || "",
      timestamp: data.timestamp?.toDate?.() || null,
    };
  }
  return null;
}

async function getFollowing() {
  loading.value = true;
  

  await getLoggedInUser();
  const myUser = loggedInUser.value;
  if (!myUser || !myUser.following || !myUser.followers) {
    followingList.value = [];
    loading.value = false;
    return;
  }

  const mutualIds = myUser.following
    .map(String)
    .filter((id) => (myUser.followers ?? []).map(String).includes(id));

  const mutualUsers: any[] = [];

  for (const id of mutualIds) {
    try {
      const userRef = doc(db, "users", id);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const latest = await getLatestMessageBetween(myUser.id!, id);
        mutualUsers.push({
          id: userSnap.id,
          ...userSnap.data(),
          lastMessage: latest?.message || "",
          lastMessageTime: latest?.timestamp || null
        });
      }
    } catch (err) {
      console.error(`Failed to fetch user ${id}`, err);
    }
  }

  followingList.value = mutualUsers;
  loading.value = false;
}
onMounted(async () => {
  await getLoggedInUser();
  await getFollowing();
});
</script>
