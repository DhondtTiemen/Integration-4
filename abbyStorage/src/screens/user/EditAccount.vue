<template>
  <nav class="flex items-center justify-between bg-white shadow-md p-4 mb-4">
    <ArrowLeft></ArrowLeft>
    <p>Edit Profile</p>
    <p class="font-bold">Save</p>
  </nav>

  <div class="relative w-24 h-24 mx-auto mb-4">
    <!-- User Icon -->
    <CircleUserRound class="w-24 h-24 text-primary-600 text-gray-600" />

    <!-- Pencil Icon -->
    <div class="absolute bottom-0 right-0 bg-black rounded-full p-2">
      <Pencil class="w-4 h-4 text-white" />
    </div>
  </div>

  <div class="mx-6">
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1" for="fullName"
        >Full Name</label
      >
      <input
        id="fullName"
        type="text"
        class="w-full border bg-white border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
        placeholder="Jamie Parker"
      />
    </div>
    <div class="mb-4">
      <label class="block text-sm font-medium text-gray-700 mb-1" for="bio"
        >Bio</label
      >
      <textarea
        id="aboutMe"
        rows="2"
        class="w-full border bg-white border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
        placeholder="Dreamer, painter, coffee lover
Here to create and connect"
      ></textarea>
    </div>

    <!-- About Me -->
    <div class="mb-6">
      <label class="block text-sm font-medium text-gray-700 mb-1" for="aboutMe"
        >About Me</label
      >
      <textarea
        id="aboutMe"
        rows="5"
        class="w-full border h-42 bg-white border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
        placeholder="Painter from Berlin, studying in Kortrijk. Exploring colors and looking for the best coffee in town. Always ready to collaborate and make new friends. 
Let’s create something beautiful together!"
      ></textarea>
    </div>

    <!-- Save Button -->
    <div class="flex gap-4">
      <button
        class="w-full bg-primary-600 text-gray-600 bg-white py-2 rounded-full hover:bg-primary-700 transition-colors duration-200"
      >
        Cancel
      </button>
      <button
        class="w-full bg-gray-600 text-white py-2 rounded-full hover:bg-primary-700 transition-colors duration-200"
      >
        Save Changes
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import {
  CircleUserRound,
  Pencil,
  ArrowLeft,
  Image,
  User,
  Award,
  CalendarDays,
} from "lucide-vue-next";

export default {
  components: {
    CircleUserRound,
    Pencil,
    ArrowLeft,
    Image,
    User,
    Award,
    CalendarDays,
  },

  setup() {
    return {};
  },
};
</script>
