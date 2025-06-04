<template>
  <nav
    class="flex items-center justify-between bg-white shadow-md p-4 border-b border-gray-200"
  >
    <!-- Linkerzijde: Terugknop -->
    <div class="w-[56px]">
      <ArrowLeft class="w-8 h-auto text-gray-700" />
    </div>

    <!-- Midden: Titel gecentreerd -->
    <p class="text-lg font-medium text-center flex-1">Creations</p>

    <!-- Rechterzijde: Iconen -->
    <div class="flex gap-2 w-[56px] justify-end">
      <Star class="w-6 h-6 text-gray-600" />
      <Share2 class="w-6 h-6 text-gray-600" />
    </div>
  </nav>
  <div class="flex gap-4 items-center bg-white px-4 py-2">
    <CircleUserRound class="w-12 h-12 text-gray-600"></CircleUserRound>
    <p class="font-bold">Jamie Parker</p>
  </div>
  <div class="w-full max-w-md mx-auto">
    <div
      class="aspect-square bg-gray-300 flex justify-center items-center rounded-lg shadow-sm"
    >
      <!-- <p class="text-gray-700">No items in your box yet.</p> -->
      <Image class="w-24 h-24 text-gray-400" />
    </div>
  </div>
  <div class="flex justify-between items-center mt-4 px-4">
    <!-- Left/center group -->
    <div class="flex gap-4 justify-center">
      <div class="flex items-center gap-2">
        <Heart class="w-8 h-8 text-gray-600" />
        <p>43</p>
      </div>
      <div class="flex items-center gap-2">
        <MessageSquare class="w-8 h-8 text-gray-600" />
        <p>4</p>
      </div>
      <div class="flex items-center gap-2">
        <Star class="w-8 h-8 text-gray-600" />
        <p>8</p>
      </div>
    </div>

    <!-- Eye (fully right-aligned) -->
    <div class="flex items-center gap-2">
      <Eye class="w-8 h-8 text-gray-600" />
      <p>320</p>
    </div>
  </div>
  <div class="p-4 border-b border-gray-300">
    <p class="text-sm">
      Just me, a pencil, and a quiet evening. No plan — just lines becoming
      something
    </p>
    <p class="text-gray-400 mt-2">4hr ago</p>
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
  Share2,
  Star,
  Heart,
  MessageSquare,
  Eye,
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
    Share2,
    Star,
    Heart,
    MessageSquare,
    Eye,
  },

  setup() {
    return {};
  },
};
</script>
