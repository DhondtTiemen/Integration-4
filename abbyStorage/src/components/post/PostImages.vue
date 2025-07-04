<template>
  <!-- Single image -->
  <div class="w-full max-w-md mx-auto relative">
    <div v-if="images && images.length > 1" class="relative">
      <div class="flex overflow-x-hidden" style="scroll-snap-type: x mandatory">
        <router-link
          :to="`/post/${postId ?? ''}`"
          v-for="(img, idx) in images"
          :key="idx"
          class="aspect-square w-full flex-shrink-0 bg-gray-300 flex justify-center items-center rounded-lg shadow-sm transition-transform duration-300"
          style="scroll-snap-align: start"
          :style="{ transform: `translateX(-${currentImage * 100}%)` }"
        >
          <img
            :src="img"
            alt="Post image"
            class="w-full h-full object-cover"
            fetchpriority="high"
            width="600"
            height="600"
          />
        </router-link>
      </div>
      <!-- Left arrow -->
      <button
        v-if="currentImage > 0"
        @click="prevImage"
        class="absolute left-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 shadow"
        aria-label="Previous image"
      >
        <svg width="24" height="24" fill="none">
          <path
            d="M15 18l-6-6 6-6"
            stroke="#222"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <!-- Right arrow -->
      <button
        v-if="currentImage < images.length - 1"
        @click="nextImage"
        class="absolute right-2 top-1/2 -translate-y-1/2 bg-white/70 rounded-full p-1 shadow"
        aria-label="Next image"
      >
        <svg width="24" height="24" fill="none">
          <path
            d="M9 6l6 6-6 6"
            stroke="#222"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </button>
      <!-- Dots -->
      <div class="flex justify-center gap-2 mt-2">
        <span
          v-for="(,idx) in images"
          :key="'dot' + idx"
          class="inline-block w-2 h-2"
          :class="
            currentImage === Number(idx) ? 'bg-alphaGreen' : 'bg-gray-300'
          "
        ></span>
      </div>
    </div>
    <router-link
      :to="`/post/${postId ?? ''}`"
      v-else
      class="bg-gray-300 flex justify-center items-center rounded-lg shadow-sm relative aspect-[4/3] w-full"
    >
      <img
        v-if="images && images.length"
        :src="Array.isArray(images) ? images[0] : images"
        alt="Post image"
        class="w-full h-full object-cover"
        fetchpriority="high"
        width="600"
        height="450"
      />
      <Image v-else class="w-24 h-24 text-gray-400" />
    </router-link>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import {
  Image
} from "lucide-vue-next";
const props = defineProps<{
  images: string[];
  postId?: string;
}>();

const currentImage = ref(0);

function prevImage() {
  if (currentImage.value > 0) currentImage.value--;
}
function nextImage() {
  if (props.images && currentImage.value < props.images.length - 1)
    currentImage.value++;
}

watch(
  () => props?.images,
  () => {
    currentImage.value = 0;
  }
);
</script>
