<template>
  <nav class="relative flex items-center justify-between p-4 bg-alphaYellow">
    <!-- TODO: Make SVG -->
    <svg
      @click="goBack"
      xmlns="http://www.w3.org/2000/svg"
      width="21"
      height="18"
      viewBox="0 0 21 18"
      fill="none"
    >
      <path
        d="M21 6.07521L4.34696 9.11281L21 12.1504L21 18L0.0393824 11.9026L-2.8975e-07 6.62871L21 0L21 6.07521Z"
        fill="#222222"
      />
    </svg>
    <p
      class="absolute left-1/2 transform -translate-x-1/2 text-center font-medium"
    >
        {{ title }}
    </p>
    <!-- TODO: Fix SVG -->
    <button @click="sharePost">
      <Share class="z-10" />
    </button>
  </nav>
</template>

<script setup lang="ts" name="PageHeader">
import router from '../../router';

const props = defineProps<{
  title: string;
  post?: {
    id: string;
    content: string;
  };
}>();

const goBack = () => router.back();
const sharePost = async () => {
  if (!props.post) return;

  const shareData = {
    title: 'Check out this post',
    text: props.post.content,
    url: `${window.location.origin}/post/${props.post.id}`,
  };

  try {
    await navigator.share(shareData);
  } catch (err) {
    console.error('Sharing failed:', err);
  }
};
</script>
