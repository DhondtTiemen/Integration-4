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
          <div class="flex items-center gap-4" v-else>
            <img
              :src="user.avatar"
              alt="avatar"
              class="w-12 h-12 rounded-full object-cover"
            />
            <div class="font-semibold">{{ user.name }}</div>
          </div>
          <button
            :class="[
              'flex items-center justify-center py-2.5 px-5 font-medium text-sm transition',
              isFollowing(user.id)
                ? 'border-1'
                : 'bg-alphaGreen border-1 border-alphaGreen',
            ]"
            @click.stop="toggleFollow(user)"
            style="min-width: 100px"
          >
            <p>
              {{ isFollowing(user.id) ? "Unfollow" : "Follow" }}
            </p>
          </button>
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
  updateDoc,
} from "firebase/firestore";
import type User from "../interfaces/interface.user";

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

  const following = [...(loggedInUser.value.following || [])].map(String);
  const followers = [...(profile.followers || [])].map(String);

  const idx = following.indexOf(profileId);

  if (idx === -1) {
    following.push(profileId);
    followers.push(myId);
  } else {
    following.splice(idx, 1);
    const followerIdx = followers.indexOf(myId);
    if (followerIdx !== -1) followers.splice(followerIdx, 1);
  }

  try {
    // Update Firestore
    const userRef = doc(db, "users", myId);
    await updateDoc(userRef, { following });
    const profileRef = doc(db, "users", profileId);
    await updateDoc(profileRef, { followers });

    loggedInUser.value = { ...loggedInUser.value, following: [...following] };
    const idxInList = followingList.value.findIndex(
      (u) => String(u.id) === profileId
    );
    if (idxInList !== -1) {
      followingList.value[idxInList] = {
        ...followingList.value[idxInList],
        followers: [...followers],
      };
    }
  } catch (err) {
    console.error("Failed to update follows in Firestore", err);
  }
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
        mutualUsers.push({ id: userSnap.id, ...userSnap.data() });
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
