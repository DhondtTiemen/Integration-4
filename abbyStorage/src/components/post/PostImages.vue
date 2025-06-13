<template>
  <!-- Single image -->
  <div v-if="images?.length === 1" class="mb-6">
    <!-- <img
      :src="'/assets/images/' + images[0]"
      alt="post image"
      class="w-full h-80 object-cover m-auto"
    /> -->
    <img
      :src="images[0]"
      alt="post image"
      class="w-full h-80 object-cover m-auto"
    />
  </div>

  <!-- Multiple images -->
  <div v-else-if="images?.length > 1" class="grid grid-cols-2 gap-2 mb-6">
    <img
      v-for="img in images"
      :key="img"
      :src="'/assets/images/' + img"
      alt="post image"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  images: string[];
}>();
</script>