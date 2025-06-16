<template>
  <router-view class="min-h-screen overflow-x-hidden" />
  <AppNavigation v-if="showNavigation" />
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useRoute } from "vue-router";
import AppNavigation from "./components/layout/AppNavigation.vue";

const route = useRoute();

// TODO: Add scanner pages
const hideOnRoutes = ["/login", "/register"];
const showNavigation = computed(() => !hideOnRoutes.includes(route.path));
</script>