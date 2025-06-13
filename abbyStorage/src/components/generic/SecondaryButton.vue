<template>
  <button
    :type="type"
    :disabled="disabled || loading"
    class="w-full border border-alphaDark font-medium px-5 py-2.5 focus:ring-4 focus:ring-alphaDark"
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
}>();
</script>