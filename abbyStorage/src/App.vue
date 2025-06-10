<template>
  <router-view class="min-h-screen overflow-x-hidden mb-12 bg-alphaWhite"></router-view>
  <appNavigation
    v-if="showNavigation"
    class="fixed bottom-0 w-full bg-alphaYellow pt-2 z-50 shadow-md"
  />
</template>

<script lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import appNavigation from './components/generic/AppNavigation.vue';

export default {
  components: {
    appNavigation,
  },
  setup() {
    const route = useRoute();
    // Pas de array hieronder aan met alle routes waar je géén navigatie wilt
    const hideOnRoutes = ['/login', '/register'];
    const showNavigation = computed(() => !hideOnRoutes.includes(route.path));
    return { showNavigation };
  },
};
</script>