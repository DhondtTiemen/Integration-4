<template>
  <router-link
    v-if="path"
    :to="path"
    :type="type"
    :disabled="disabled || loading"
    class="w-full text-center bg-alphaGreen font-medium px-5 py-2.5 focus:ring-4 focus:ring-primary-300"
  >
    <slot>{{ loading ? loadingText : defaultText }}</slot>
  </router-link>
  <button
    v-else
    :type="type"
    :disabled="disabled || loading"
    class="w-full text-center bg-alphaGreen font-medium px-5 py-2.5 focus:ring-4 focus:ring-primary-300"
  >
    <slot>{{ loading ? loadingText : defaultText }}</slot>
  </button>
</template>

<script setup lang="ts">
defineProps<{
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  loading?: boolean;
  loadingText?: string;
  defaultText?: string;
  path?: string;
}>();
</script>