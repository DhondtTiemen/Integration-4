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

              <Event v-if="item" :event="item" />
            </router-link>
          </template>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import Event from "../../components/generic/EventCard.vue";

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
