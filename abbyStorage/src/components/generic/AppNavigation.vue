<template>
  <ul
    class="grid w-full grid-cols-5 items-center text-center text-xs font-medium sm:w-auto sm:space-x-3 sm:text-left sm:text-sm"
  >
    <li>
      <router-link
        exact-active-class="text-alphaGreen"
        class="inline-block rounded-md px-3 outline-none focus-visible:ring-2"
        to="/"
      >
        <Home class="mx-auto mb-2 h-8 sm:hidden" />
      </router-link>
    </li>
    <li>
      <router-link
        exact-active-class="text-alphaGreen"
        class="inline-block rounded-md px-3 outline-none focus-visible:ring-2"
        to="/search"
      >
        <Search class="mx-auto mb-2 h-8 sm:hidden" />
      </router-link>
    </li>
    <li>
      <router-link
        exact-active-class="text-alphaGreen"
        class="inline-block rounded-md px-3 outline-none focus-visible:ring-2"
        to="/post/create"
      >
        <PlusCircle class="mx-auto mb-2 h-8 sm:hidden" />
      </router-link>
    </li>
    <li>
      <router-link
        exact-active-class="text-alphaGreen"
        class="inline-block rounded-md px-3 outline-none focus-visible:ring-2"
        to="/events"
      >
        <MessageCircle class="mx-auto mb-2 h-8 sm:hidden" />
      </router-link>
    </li>
    <li>
      <router-link
        exact-active-class="text-alphaGreen"
        class="inline-block rounded-md px-3 outline-none focus-visible:ring-2"
        :to="`/account/${userId}`"
      >
        <CircleUser class="mx-auto mb-2 h-8 sm:hidden" />
      </router-link>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { Home, Search, PlusCircle, CircleUser, MessageCircle } from "lucide-vue-next";
import { ref } from "vue";
 
let userId: string = "";
if (typeof window !== "undefined") {
  const storedId = localStorage.getItem("userId");
  if (storedId) {
    userId = storedId;
  }
}
</script>
