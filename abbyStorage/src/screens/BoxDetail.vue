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

      <Share2 class="w-6 h-6 text-gray-600 m-2 " />
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
          <p>{{ user?.box.comments }}</p>
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
  </div>

  <!-- <div v-else class="p-4 text-center text-red-600">User not found.</div> -->
</template>

<script lang="ts" setup>
import { ArrowLeft, Share2, Heart, MessageSquare, Eye } from "lucide-vue-next";
import { useRoute, useRouter } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const userID = Number(route.params.id);
import type User from "../interfaces/interface.user";
const user = ref<User | null>(null);
const loading = ref(true);
const router = useRouter();
function goBack() {
  router.back();
}
async function fetchUser() {
  try {
    const res = await fetch("/src/assets/data/users.json");
    if (!res.ok) throw new Error("Failed to load users data");
    const data = await res.json();
    // console.log(data.users);
    // Let op: de users zitten in data.users
    user.value = data.users.find((u: any) => u.id === userID) || null;
    console.log(user);
  } catch (error) {
    console.error(error);
  } finally {
    // console.log(user)
    loading.value = false;
  }
  console.log(user);
}

onMounted(() => {
  fetchUser();
  console.log(user);
});
</script>
