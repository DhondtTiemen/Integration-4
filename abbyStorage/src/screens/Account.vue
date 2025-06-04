<template>
  <nav class="">
    <ArrowLeft class="w-10 h-10 text-gray-600 m-2" />
  </nav>
  <div class="mb-8">
    <div class="flex flex-col items-center justify-center">
      <CircleUserRound class="w-24 h-24 text-primary-600 mx-auto mb-1" />
      <h1 class="text-xl font-bold text-center text-gray-900">Jamie Parker</h1>
      <p class="text-center text-sm text-gray-600 mb-4">
        Dreamer, painter, coffee lover <br />
        Here to create and connect
      </p>
      <button
        class="flex items-center justify-center text-white bg-gray-600 border rounded-full shadow-sm px-4 py-2 mb-4 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
      >
        <Pencil class="w-5 h-5 mr-2 inline-block" />
        <p>Edit profile</p>
      </button>
      <div class="flex gap-4 text-gray-600">
        <p>15 following</p>
        <p>|</p>
        <p>22 followers</p>
      </div>
    </div>
    <div class="bg-white mx-4 mt-8 rounded-xl p-4">
      <div class="flex justify-between items-center">
        <h2 class="text-lg font-semibold text-gray-900 mb-4">My box</h2>
        <button
          class="flex items-center justify-center text-white bg-gray-600 border rounded-full shadow-sm px-4 py-2 mb-4 focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-colors"
        >
          View box
        </button>
      </div>
      <div class="grid grid-cols-2 gap-4 w-full max-w-md mx-auto">
        <div
          class="aspect-square bg-gray-300 flex justify-center items-center rounded-lg shadow-sm"
        >
          <!-- <p class="text-gray-700">No items in your box yet.</p> -->
          <Image class="w-16 h-16 text-gray-400" />
        </div>

        <div
          class="aspect-square bg-gray-100 flex justify-center items-center rounded-lg shadow-sm"
        >
          <p class="text-gray-500">All photos</p>
          <!-- <Image class="w-16 h-16 m-10 text-gray-400" /> -->
        </div>
      </div>
    </div>
    <div class="bg-white mx-4 mt-4 rounded-xl p-4">
      <div class="flex">
        <User class="w-6 h-6 mr-2" />
        <h2 class="text-lg font-semibold mb-4">About me</h2>
      </div>
      <div class="flex justify-center">
        <p class="text-gray-700 text-sm">
          Painter from Berlin, studying in Kortrijk. Exploring colors and
          looking for the best coffee in town. Always ready to collaborate and
          make new friends. Let’s create something beautiful together!
        </p>
      </div>
    </div>
    <div class="bg-white mx-4 mt-4 rounded-xl p-4">
      <div class="flex justify-between">
        <div class="flex">
          <Award class="w-6 h-6 mr-2" />
          <h2 class="text-lg font-semibold mb-4">Achievments</h2>
        </div>
        <p class="text-gray-600 text-sm mt-1">6 badges</p>
      </div>
      <div class="flex justify-center">
        <Image class="w-16 h-16 text-gray-400" />
        <Image class="w-16 h-16 text-gray-400" />
        <Image class="w-16 h-16 text-gray-400" />
        <Image class="w-16 h-16 text-gray-400" />
        <Image class="w-16 h-16 text-gray-400" />
      </div>
    </div>
    <div class="bg-white mx-4 mt-4 rounded-xl p-4">
      <div class="flex">
        <CalendarDays class="w-6 h-6 mr-2" />
        <h2 class="text-lg font-semibold mb-4">Events</h2>
      </div>
      <div>
        <div class="flex items-center">
          <Image class="w-16 h-16 text-gray-400" />
          <div>
            <p class="text-sm">Workshop: Morning painting & Coffee</p>
            <p class="text-gray-600 text-xs">Organised - Mar 22, 2025</p>
          </div>
        </div>
        <div class="flex items-center">
          <Image class="w-16 h-16 text-gray-400" />
          <div>
            <p class="text-sm">Lecture: History of modern art</p>
            <p class="text-gray-600 text-xs">Attended - Feb 10, 2025</p>
          </div>
        </div>
      </div>
    </div>
    <div class="bg-white mx-4 mt-8 rounded-xl p-4">
      <div class="flex">
        <Image class="w-6 h-6 mr-2" />
        <h2 class="text-lg font-semibold mb-4">My creations</h2>
      </div>
      <div class="grid grid-cols-3 grid-rows-2 gap-4 justify-center">
        <div
          class="bg-gray-300 w-20 h-20 flex justify-center items-center rounded-lg shadow-sm"
        >
          <Image class="w-16 h-16 text-gray-400" />
        </div>
        <div
          class="bg-gray-300 w-20 h-20 flex justify-center items-center rounded-lg shadow-sm"
        >
          <Image class="w-16 h-16 text-gray-400" />
        </div>
        <div
          class="bg-gray-300 w-20 h-20 flex justify-center items-center rounded-lg shadow-sm"
        >
          <Image class="w-16 h-16 text-gray-400" />
        </div>
        <div
          class="bg-gray-300 w-20 h-20 flex justify-center items-center rounded-lg shadow-sm"
        >
          <Image class="w-16 h-16 text-gray-400" />
        </div>
        <div
          class="bg-gray-300 w-20 h-20 flex justify-center items-center rounded-lg shadow-sm"
        >
          <Image class="w-16 h-16 text-gray-400" />
        </div>
        <div
          class="bg-gray-100 w-20 h-20 flex justify-center items-center rounded-lg shadow-sm"
        >
          <p class="text-gray-500 text-xs text-center">All photos</p>
        </div>
      </div>
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
