<template>
  <router-link :to="`/event/${event?.id}`" class="relative">
    <!-- POST - CONTENT - EVENT - LABEL -->
    <span class="absolute top-4 right-4 bg-alphaGreen font-medium px-2.5 py-2"
      >Event</span
    >
    <ImageTemplate :path="event.image" :screen="'eventDetail'" />

    <!-- POST - CONTENT - EVENT -->
    <div class="bg-alphaPurple p-4">
      <p class="font-bold mb-1">{{ event.title }}</p>

      <div class="py-2 mb-4">
        <p class="flex items-center gap-2 mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="fill-alphaDark h-4 w-auto"
            viewBox="0 0 16 16"
          >
            <path d="M16 7.21509H0V15.9999H16V7.21509Z" fill="black" />
            <path
              d="M12.8069 2.41138V0H11.2107V2.41138H4.78935V0H3.19315V2.41138H0V5.60184H16V2.41138H12.8069Z"
              fill="black"
            />
          </svg>
          {{ formatDateTime(event.date) }}
        </p>
        <p class="flex items-center gap-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="fill-alphaDark h-4 w-auto"
            viewBox="0 0 16 16"
            fill="none"
          >
            <path
              d="M7.53625 0.00962665C8.9137 -0.0483006 9.96353 0.143329 11.1337 0.909534C13.5873 2.51615 14.3486 5.69088 13.054 8.26066C11.3915 10.8389 9.71973 13.4121 8.03847 15.9803C7.97403 16.0163 7.86641 16.0007 7.81942 15.9515L2.91629 8.41471C1.0793 4.93906 3.46821 0.180824 7.53625 0.00962665ZM5.48166 7.05953C6.52547 8.83743 9.11846 8.92823 10.2912 7.22893C11.5035 5.4717 10.3677 3.04502 8.23434 2.84055C5.93055 2.6198 4.31215 5.06715 5.48166 7.05953Z"
              fill="black"
            />
          </svg>
          {{ event.place }}
        </p>
      </div>

      <!-- POST - CONTENT - EVENT - BUTTON -->
      <button class="bg-alphaYellow font-medium w-full py-2.5">
        Learn more
      </button>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { formatDateTime } from "../../utils/date.ts";
import ImageTemplate from "../../components/images/ImageTemplate.vue";

defineProps<{
  event: {
    id: number | string;
    title: string;
    date: string;
    time: string;
    place: string;
    image: string;
  };
}>();
</script>
