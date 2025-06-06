<template>
  <ul
    class="grid w-full grid-cols-4 items-center text-center text-xs font-medium sm:w-auto sm:space-x-3 sm:text-left sm:text-sm"
  >
    <li>
      <router-link
        exact-active-class="opacity-40"
        class="inline-block rounded-md px-3 py-6 outline-none focus-visible:ring-2"
        to="/"
      >
        <Home class="mx-auto mb-2 h-8 sm:hidden" />
      </router-link>
    </li>
    <li>
      <router-link
        exact-active-class="opacity-40"
        class="inline-block rounded-md px-3 py-6 outline-none focus-visible:ring-2"
        to="/"
      >
        <Search class="mx-auto mb-2 h-8 sm:hidden" />
      </router-link>
    </li>
    <li>
      <router-link
        exact-active-class="opacity-40"
        class="inline-block rounded-md px-3 py-6 outline-none focus-visible:ring-2"
        to="/"
      >
        <PlusCircle class="mx-auto mb-2 h-8 sm:hidden" />
      </router-link>
    </li>
    <li>
      <router-link
        exact-active-class="opacity-40"
        class="inline-block rounded-md px-3 py-6 outline-none focus-visible:ring-2"
        to="/account"
      >
        <CircleUser class="mx-auto mb-2 h-8 sm:hidden" />
      </router-link>
    </li>

  </ul>
</template>

<script lang="ts">
import { Home, Search, PlusCircle, CircleUser} from 'lucide-vue-next'


export default {
  components: { Home, Search, PlusCircle, CircleUser },

  setup() {

    return {
    }
  },
}
</script>