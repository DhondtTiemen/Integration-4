<template>
  <div class="min-h-screen">
    <nav class="relative flex items-center bg-white shadow-md p-4 mb-4 h-12">
      <svg
        @click="goBack"
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="18"
        viewBox="0 0 21 18"
        fill="none"
        class="z-10 cursor-pointer"
      >
        <path
          d="M21 6.07521L4.34696 9.11281L21 12.1504L21 18L0.0393824 11.9026L-2.8975e-07 6.62871L21 0L21 6.07521Z"
          fill="#222222"
        />
      </svg>
      <p
        class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 m-0 font-medium"
      >
        Edit Profile
      </p>
      <!-- <p class="font-bold">Save</p> -->
    </nav>

    <div class="relative w-24 h-24 mx-auto mb-4">
      <!-- User Icon -->
      <img
        v-if="avatarPreview"
        :src="avatarPreview"
        alt="Box main"
        class="w-24 h-24 object-cover rounded-full"
      />
      <ImageTemplate v-else :path="user?.avatar" :screen="'edit'" />

      <!-- <img
        v-else
        :src="user?.avatar"
        alt="Main Image"
        class="w-24 h-24 object-cover rounded-full"
      /> -->
      <!-- Pencil Icon -->
      <div
        class="absolute bottom-0 right-0 bg-black rounded-full w-9 h-9 flex items-center justify-center"
      >
        <label
          class="relative cursor-pointer flex items-center justify-center w-full h-full"
        >
          <input
            @change="onAvatarChange"
            type="file"
            class="absolute inset-0 opacity-0 cursor-pointer"
          />
          <Pencil class="w-5 h-5 text-white" />
        </label>
      </div>
    </div>

    <form v-if="user" @submit.prevent="handleSave" class="mx-6">
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1" for="name"
          >Username</label
        >
        <input
          v-model="user.name"
          id="name"
          type="text"
          class="w-full border bg-white border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
        />
      </div>
      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-700 mb-1" for="bio"
          >Bio</label
        >
        <textarea
          v-model="user.bio"
          id="aboutMe"
          rows="2"
          class="w-full border bg-white border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Describe yourself in a few words, e.g. 'Painter from Berlin, studying in Kortrijk. Exploring colors and looking for the best coffee in town.'"
        ></textarea>
      </div>

      <!-- About Me -->
      <div class="mb-6">
        <label
          class="block text-sm font-medium text-gray-700 mb-1"
          for="aboutMe"
          >About Me</label
        >
        <textarea
          v-model="user.aboutMe"
          id="aboutMe"
          rows="5"
          class="w-full border h-42 bg-white border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          placeholder="Describe yourself in more detail, e.g. 'I am a painter from Berlin, currently studying in Kortrijk. I love exploring colors and am always on the lookout for the best coffee spots in town.'"
        ></textarea>
      </div>

      <!-- Save Button -->
      <div class="flex gap-4">
        <button type="button" @click="changeCancel()"
          class="w-full bg-primary-600 border text-gray-600 bg-white py-2 rounded-full hover:bg-primary-700 transition-colors duration-200"
        >
          Cancel
        </button>
        <button
          type="submit"
          class="w-full bg-gray-600 text-white py-2 rounded-full hover:bg-primary-700 transition-colors duration-200"
        >
          Save Changes
        </button>
      </div>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import {
  Pencil,
} from "lucide-vue-next";
import type User from "../../interfaces/interface.user";
import {
  doc,
  updateDoc,
} from "firebase/firestore";
import ImageTemplate from "/src/components/images/ImageTemplate.vue";

import db from "../../firebase/firebase.ts";
import { getUserById } from "../../firebase/userService.ts";
import { uploadImage } from "../../firebase/imageService.ts";
const route = useRoute();
const router = useRouter();
const userId: string = String(route.params.id);
const avatarFile = ref<File | null>(null);
const avatarPreview = ref<string | null>(null);
function goBack() {
  history.back();
}
const user = ref<User | null>(null);
function changeCancel() {
  console.log("Edit cancelled");
  console.log("User before reset:", user.value);
  // zet alle inputs terug naar de originele waarden
  if (user.value) {
    user.value.name = user.value.name || "";
    user.value.bio = user.value.bio || "";
    user.value.aboutMe = user.value.aboutMe || "";
    avatarFile.value = null;
    avatarPreview.value = null;
  }
  router.back()
}
async function handleSave() {
  if (!userId || !user.value) return;

  let avatarUrl = user.value.avatar;

  if (avatarFile.value) {
    avatarUrl = await uploadImage(
      avatarFile.value,
      `users/${userId}/avatar.jpg`
    );
  }

  const userRef = doc(db, "users", userId);
  await updateDoc(userRef, {
    avatar: avatarUrl,
    name: user.value.name,
    bio: user.value.bio,
    aboutMe: user.value.aboutMe,
  });

  router.push("/account/" + userId);
}
function onAvatarChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    avatarFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      avatarPreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
}
import { onMounted } from "vue";

onMounted(async () => {
  user.value = await getUserById(userId);
});
</script>
