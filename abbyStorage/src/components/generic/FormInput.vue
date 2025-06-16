<template>
  <div>
    <label :for="id" class="block mb-2 text-sm">{{ label }}</label>
    <input
      :type="type"
      :id="id"
      :placeholder="placeholder"
      v-model="modelValue"
      class="border border-alphaDark text-gray-600 text-sm block w-full p-2.5 focus:ring-alphaDark focus:border-alphaDark"
      :required="required"
    />
  </div>
</template>

<script setup lang="ts">
const modelValue = defineModel<string>()

defineProps<{
  id: string;
  label: string;
  type: string;
  placeholder: string;
  required?: boolean;
}>();
</script>