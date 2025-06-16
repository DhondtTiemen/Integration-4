<!-- TODO Check file -->
<template>
  <div class="grid h-screen min-h-screen grid-rows-[auto_1fr_auto] sm:h-auto">
    <!-- <AppHeader /> -->

    <router-view class="overflow-y-auto"></router-view>

    <!-- <AppFooter /> -->
     <!-- <appNavigation/> -->
  </div>
</template>

<script lang="ts">
import appNavigation from '../layout/AppNavigation.vue';

export default {
  components: {
    appNavigation,
  },
}
</script>