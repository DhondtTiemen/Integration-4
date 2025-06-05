<script setup lang="ts">
import LoginForm from "./components/LoginForm.vue";
import Overview from "./components/Overview.vue";
import Messages from "./components/Messages.vue";
import Account from "./screens/Account.vue";
import EditAccount from "./screens/EditAccount.vue";
import CreationDetail from "./screens/CreationDetail.vue";
import EventDetail from "./screens/EventDetail.vue";
import CreateEvent from "./screens/CreateEvent.vue";
</script>

<template >
  <div >
    <!-- <LoginForm></LoginForm> -->
    <!-- <Account></Account> -->
     <!-- <EditAccount></EditAccount> -->
      <!-- <CreationDetail></CreationDetail> -->
      <EventDetail></EventDetail>
  </div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
