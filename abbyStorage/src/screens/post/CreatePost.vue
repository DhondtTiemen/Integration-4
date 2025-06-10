<template>
    <!-- Header -->
    <nav class="relative flex items-center p-4 bg-alphaYellow">
        <ArrowLeft class="z-10" />
        <p class="absolute left-1/2 transform -translate-x-1/2 text-center font-medium">
            Create Post
        </p>
    </nav>
    
    <div class="flex flex-col">
    <!-- Form -->
    <div class="p-4 flex flex-col gap-4">
      <!-- TODO: Do you have to see yourself when you want to post something??? -->
      <!-- <div class="flex items-center gap-3">
        <img :src="user.avatar" class="w-10 h-10 rounded-full object-cover" />
        <span class="text-sm text-gray-700 font-medium">{{ user.name }}</span>
      </div> -->

      <!-- Textarea -->
      <textarea
        v-model="postContent"
        placeholder="What’s on your mind?"
        class="w-full border border-gray-300 rounded px-3 py-2 resize-none text-sm text-gray-700"
        rows="4"
      ></textarea>

      <!-- Action buttons -->
      <div class="flex flex-col gap-3">
        <button class="flex items-center gap-2 justify-center border border-black py-2 rounded">
          <Image class="w-5 h-5" /> Add Photos
        </button>

        <button class="flex items-center gap-2 justify-center border border-black py-2 rounded">
          <Link class="w-5 h-5" /> Add event link
        </button>

        <button class="flex items-center gap-2 justify-center border border-black py-2 rounded">
          <MapPin class="w-5 h-5" /> Add location
        </button>
      </div>

      <!-- Action row -->
      <div class="flex justify-between mt-6 gap-2">
        <button class="border border-gray-400 px-5 py-2 text-sm w-full">Cancel</button>
        <button @click="submitPost" class="bg-alphaGreen w-full px-5 py-2 text-sm font-medium">
          Post
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { Image, Link, MapPin } from 'lucide-vue-next'
import {
    ArrowLeft,
} from "lucide-vue-next";

const user = {
  name: 'Jamie Parker',
  avatar: '/src/assets/images/jamie.jpg',
}

const postContent = ref('')

function submitPost() {
  if (!postContent.value.trim()) {
    alert('Please write something before posting.')
    return
  }

  // hier zou je bv. verder kunnen posten naar een API of localStorage
  alert(`Posting: ${postContent.value}`)
}

function goBack() {
  history.back()
}
</script>