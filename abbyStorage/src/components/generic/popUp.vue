<template>
<div
  v-if="visible"
  class="fixed inset-0 flex items-center px-4 justify-center bg-black/50 z-50"
>    <div class="bg-alphaYellow shadow-lg p-6 w-96">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-xl font-semibold">You need an account!</h2>
        <button @click="close" class="text-alphaGreen hover:text-red-500 text-xl">&times;</button>
      </div>
      <p>You need to be logged in to continue.</p>
      <div class="flex gap-2 mt-6">
        <SecondaryButton
          type="button"
          @click="close"
          defaultText="Cancel"
          class="w-full"
        />
        <PrimaryButton
          type="button"
          defaultText="Login"
          class="w-full"
          path="/login"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import PrimaryButton from './PrimaryButton.vue';
import SecondaryButton from './SecondaryButton.vue';

const props = defineProps({
  visible: Boolean,
});
const emit = defineEmits(['close']);

const close = () => {
  emit('close');
};
</script>