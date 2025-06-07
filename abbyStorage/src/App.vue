<!-- <script setup lang="ts">
import LoginForm from "./components/LoginForm.vue";
import Overview from "./components/Overview.vue";
import Messages from "./components/Messages.vue";
import Account from "./screens/Account.vue";
import EditAccount from "./screens/EditAccount.vue";
import CreationDetail from "./screens/CreationDetail.vue";
import EventDetail from "./screens/event/EventDetail.vue";
import CreateEvent from "./screens/event/CreateEvent.vue";
import BoxDetail from "./screens/BoxDetail.vue";
</script>

<template >
  <div >
    <LoginForm></LoginForm>
    <Account></Account>
     <EditAccount></EditAccount>
      <CreationDetail></CreationDetail>
      <EventDetail></EventDetail>
    <Overview></Overview>
     <BoxDetail></BoxDetail>

  </div>
</template> -->



<template>
  <router-view class="min-h-screen overflow-x-hidden bg-neutral-50"></router-view>
  <appNavigation class="fixed bottom-0 w-full bg-gray-100 z-50 shadow-md" />

</template>

<script lang="ts">
// import AppHeader from '../generic/AppHeader.vue'
// import AppFooter from '../generic/AppFooter.vue'
import appNavigation from './components/generic/AppNavigation.vue';

export default {
  components: {
    // AppHeader,
    // AppFooter,
    appNavigation,
  },

  setup() {
    return {}
  },
}

</script>
