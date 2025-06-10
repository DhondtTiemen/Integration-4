<template>
  <div>
    <div class="flex gap-2 p-4 bg-alphaYellow">
      <input
        v-model="query"
        type="text"
        placeholder="Search for people or events..."
        class="flex-1 px-3 py-2 border border-alphaDark text-gray-600 text-sm block w-full p-2.5 focus:ring-alphaDark focus:border-alphaDark"
      />
    </div>
    <!-- Zet de filters in een eigen container met vaste achtergrond -->
    <div class="flex gap-4 items-center mb-4 px-4 pt-4 z-10 relative">
      <span
        :class="[
          'cursor-pointer px-4 py-2 font-medium transition',
          filter === 'all'
            ? 'bg-alphaGreen shadow'
            : 'text-alphaDark border border-alphaDark hover:bg-alphaLight',
        ]"
        @click="filter = 'all'"
        style="min-width: 80px; text-align: center"
        >All</span
      >
      <span
        :class="[
          'cursor-pointer px-4 py-2  font-medium transition',
          filter === 'people'
            ? 'bg-alphaGreen shadow'
            : 'text-alphaDark border border-alphaDark hover:bg-alphaLight',
        ]"
        @click="filter = 'people'"
        style="min-width: 80px; text-align: center"
        >People</span
      >
      <span
        :class="[
          'cursor-pointer px-4 py-2  font-medium transition',
          filter === 'events'
            ? 'bg-alphaGreen shadow'
            : 'text-alphaDark border border-alphaDark hover:bg-alphaLight',
        ]"
        @click="filter = 'events'"
        style="min-width: 80px; text-align: center"
        >Events</span
      >
    </div>

    <!-- Resultaten in een aparte container -->
    <div>
      <div v-if="filteredResults.length === 0" class="text-gray-500 mt-8">
        No results found.
      </div>

      <div v-else>
        <div v-for="item in filteredResults" :key="itemKey(item)" class="">
          <template v-if="item.type === 'user'">
            <router-link
              :to="`/account/${item.id}`"
              class="flex items-center border-b border-gray-300 mb-4 pb-4 px-4 gap-4"
            >
              <img
                :src="item.avatar"
                alt="avatar"
                class="w-12 h-12 rounded-full object-cover"
              />
              <div>
                <div class="font-semibold">{{ item.name }}</div>
                <div class="text-sm text-gray-500">{{ item.bio }}</div>
              </div>
            </router-link>
          </template>
          <template v-else>
            <router-link
              :to="`/event/${item.id}`"
              v-if="item.id"
              class="relative block mb-4"
            >
              <span
                class="absolute top-4 right-4 border border-black text-black text-xs px-2 py-1"
                >Event</span
              >
              <template v-if="item.id">
                <img
                  :src="'https://images.pexels.com/photos/7585762/pexels-photo-7585762.jpeg'"
                  alt="post image"
                  class="h-44 w-full object-cover"
                />

                <div class="bg-purple-300 p-4">
                  <p class="font-bold mb-1">
                    {{ item.title }}
                  </p>

                  <div class="my-2">
                    <p class="text-sm flex items-center gap-2 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M16 7.21509H0V15.9999H16V7.21509Z"
                          fill="black"
                        />
                        <path
                          d="M12.8069 2.41138V0H11.2107V2.41138H4.78935V0H3.19315V2.41138H0V5.60184H16V2.41138H12.8069Z"
                          fill="black"
                        />
                      </svg>
                      {{ item.date }} •
                      {{ item.time }}
                    </p>
                    <p class="text-sm flex items-center gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                      >
                        <path
                          d="M7.53625 0.00962665C8.9137 -0.0483006 9.96353 0.143329 11.1337 0.909534C13.5873 2.51615 14.3486 5.69088 13.054 8.26066C11.3915 10.8389 9.71973 13.4121 8.03847 15.9803C7.97403 16.0163 7.86641 16.0007 7.81942 15.9515L2.91629 8.41471C1.0793 4.93906 3.46821 0.180824 7.53625 0.00962665ZM5.48166 7.05953C6.52547 8.83743 9.11846 8.92823 10.2912 7.22893C11.5035 5.4717 10.3677 3.04502 8.23434 2.84055C5.93055 2.6198 4.31215 5.06715 5.48166 7.05953Z"
                          fill="black"
                        />
                      </svg>
                      {{ item.place }}
                    </p>
                  </div>
                  <button
                    class="mt-3 bg-amber-300 text-black font-medium w-full py-1.5 rounded"
                  >
                    Learn more
                  </button>
                </div>
              </template>
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";

const query = ref("");
const filter = ref("all");

const users = ref<any[]>([]);
const events = ref<any[]>([]);

onMounted(async () => {
  const usersRes = await fetch("/src/assets/data/users.json");
  const eventsRes = await fetch("/src/assets/data/events.json");
  users.value = (await usersRes.json()).users || [];
  events.value = (await eventsRes.json()).events || [];
});

const filteredResults = computed(() => {
  let results: any[] = [];
  const q = query.value.trim().toLowerCase();
  const loggedInId = Number(localStorage.getItem("userId"));

  if (filter.value === "all" || filter.value === "people") {
    results.push(
      ...users.value
        .filter(
          (u) =>
            u.id !== loggedInId && 
            (u.name?.toLowerCase().includes(q) ||
              u.bio?.toLowerCase().includes(q))
        )
        .map((u) => ({ ...u, type: "user" }))
    );
  }
  if (filter.value === "all" || filter.value === "events") {
    results.push(
      ...events.value
        .filter(
          (e) =>
            e.title?.toLowerCase().includes(q) ||
            e.about?.toLowerCase().includes(q) ||
            e.place?.toLowerCase().includes(q)
        )
        .map((e) => ({ ...e, type: "event" }))
    );
  }
  return results;
});

function itemKey(item: any) {
  return `${item.type}-${item.id}`;
}
</script>
