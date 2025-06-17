<template>
  
  <component
    :is="to ? 'router-link' : 'button'"
    :to="to"
    :aria-label="label"
  >
    <slot />
  </component>
</template>

<script setup lang="ts">
defineProps<{
  label: string;
  to?: string;
}>()
</script>