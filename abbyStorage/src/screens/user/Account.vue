<template>
  <section class="min-h-screen">
    <!-- Header -->
    <header class="flex items-center justify-between h-16 bg-alphaYellow">
      <h1 class="text-xl font-bold h-6 px-6">
        Profile
      </h1>
      <div class="flex items-center px-6 gap-6">
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20.5714 16.2859H16.2856V20.5716H20.5714V16.2859Z" fill="#21272A"/>
            <path d="M16.2857 12.8572H12.8572V16.2857H16.2857V12.8572Z" fill="#21272A"/>
            <path d="M24.0001 20.5713H20.5715V23.9999H24.0001V20.5713Z" fill="#21272A"/>
            <path d="M23.9999 12.8572H21.4285V15.4286H23.9999V12.8572Z" fill="#21272A"/>
            <path d="M15.4286 21.4287H12.8572V24.0001H15.4286V21.4287Z" fill="#21272A"/>
            <path d="M20.5714 3.42871H16.2856V7.71443H20.5714V3.42871Z" fill="#21272A"/>
            <path d="M24 11.1429H12.8572V0H24V11.1429ZM15.2143 8.78571H21.6429V2.35714H15.2143V8.78571Z" fill="#21272A"/>
            <path d="M7.71418 3.42871H3.42847V7.71443H7.71418V3.42871Z" fill="#21272A"/>
            <path d="M11.1429 11.1429H0V0H11.1429V11.1429ZM2.35714 8.78571H8.78571V2.35714H2.35714V8.78571Z" fill="#21272A"/>
            <path d="M7.71418 16.2859H3.42847V20.5716H7.71418V16.2859Z" fill="#21272A"/>
            <path d="M11.1429 24H0V12.8572H11.1429V24ZM2.35714 21.6429H8.78571V15.2143H2.35714V21.6429Z" fill="#21272A"/>
          </svg>
        </button>
      </div>
    </header>

    <div v-bind="$attrs">
      <div class="bg-alphaYellow">
  
        <div v-if="loading" class="text-center text-gray-500">Loading...</div>
  
        <div v-else class="mb-8">
          <div class="flex flex-col items-center justify-center">
            <img
              :src="user?.avatar"
              alt="Avatar"
              class="h-32 w-32 rounded-full object-cover mb-6"
            />
            <h1 class="text-2xl font-bold text-center mb-2">
              {{ user?.name }}
            </h1>
            <p class="text-center text-sm mb-4 px-6">
              {{ user?.bio }}
            </p>
            <button
              class="flex items-center justify-center py-2.5 px-5 mb-4 bg-alphaGreen"
            >
              <Pencil class="w-5 h-5 mr-2 inline-block" />
              <p class="font-medium text-sm">Edit profile</p>
            </button>
            <div class="flex gap-4 text-sm font-medium">
              <p>{{ user?.following }} following</p>
              <p>|</p>
              <p>{{ user?.followers }} followers</p>
            </div>
          </div>
        </div>
  
        <div class="bg-alphaLight p-4">
          <div class="pb-6 border-b-2 border-gray-200">
            <div class="flex justify-between items-center mb-4">
              <h2 class="text-lg font-medium">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-auto inline mr-2"
                  viewBox="0 0 23 23"
                  fill="none"
                >
                  <rect width="23" height="23" fill="#222222" />
                  <path
                    d="M3.98787 11.8882H6.69218C6.80367 12.0002 6.74295 12.1821 6.75621 12.3262C6.99526 14.9169 9.77662 16.7769 12.5021 16.1693C14.3117 15.7659 15.8317 14.3162 16.0907 12.5844C16.1187 12.3968 16.0919 12.1658 16.1208 11.9964C16.1282 11.9529 16.1473 11.9176 16.183 11.8884H18.8873C18.9126 11.9033 18.9202 11.9211 18.9256 11.9476C18.9465 12.0542 18.9353 12.3721 18.9266 12.4934C18.7103 15.4577 16.2473 18.0236 13.1657 18.7041C8.77016 19.6744 4.25499 16.6923 3.94858 12.4932C3.93966 12.3721 3.92843 12.054 3.94961 11.9474C3.95471 11.9209 3.96262 11.9031 3.98787 11.8882Z"
                    fill="white"
                  />
                  <path
                    d="M5.9375 6.90069C6.09403 5.23496 8.039 4.40618 9.20848 5.48572C9.5153 5.76886 9.9375 6.42189 9.9375 6.87518V9.96174L9.90282 10H5.97218L5.9375 9.96174V6.90069Z"
                    fill="white"
                  />
                  <path
                    d="M12.9375 7.96137C13.054 6.61911 14.3766 5.7394 15.4591 6.06963C16.1292 6.27403 16.9375 7.19641 16.9375 8.04237V9.9595L16.9028 10H12.9722L12.9375 9.9595V7.96137Z"
                    fill="white"
                  />
                </svg>
                My box
              </h2>
  
              <router-link
                :to="`/box/${user?.id}`"
                class="bg-alphaGreen px-5 py-2.5 font-medium text-sm"
              >
                View box
              </router-link>
            </div>
            <div class="grid grid-cols-2 gap-2 w-full max-w-md mx-auto">
              <div
                class="aspect-square bg-gray-300 flex justify-center items-center"
              >
                <Image class="w-16 h-16 text-gray-400" />
              </div>
              <div
                class="aspect-square bg-gray-100 flex justify-center items-center"
              >
                <p class="text-gray-500">All photos</p>
              </div>
            </div>
          </div>
  
          <div class="py-6 border-b-2 border-gray-200">
            <h2 class="text-lg font-medium mb-4">
              <svg
                class="h-5 w-auto inline mr-2"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 21"
                fill="none"
              >
                <path
                  d="M9.75 10.5C10.7884 10.5 11.8034 10.1921 12.6667 9.61522C13.5301 9.03834 14.203 8.2184 14.6004 7.25909C14.9977 6.29978 15.1017 5.24418 14.8991 4.22578C14.6966 3.20738 14.1965 2.27192 13.4623 1.53769C12.7281 0.803466 11.7926 0.303452 10.7742 0.10088C9.75582 -0.101693 8.70022 0.00227474 7.74091 0.399635C6.7816 0.796995 5.96166 1.4699 5.38478 2.33326C4.80791 3.19662 4.5 4.21165 4.5 5.25C4.5 6.64239 5.05312 7.97775 6.03769 8.96231C7.02226 9.94688 8.35761 10.5 9.75 10.5ZM9.75 12C6.49594 12 0 14.01 0 18V21H19.5V18C19.5 14.01 13.0041 12 9.75 12Z"
                  fill="#21272A"
                />
              </svg>
              About me
            </h2>
            <p class="text-gray-700 text-sm">
              {{ user?.bio }}
            </p>
          </div>
  
          <div class="py-6 border-b-2 border-gray-200">
            <div class="flex justify-between">
              <h2 class="text-lg font-medium mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  class="h-6 w-auto inline mr-2"
                  viewBox="0 0 23 23"
                  fill="none"
                >
                  <rect width="23" height="23" fill="#222222" />
                  <path
                    d="M3.98787 11.8882H6.69218C6.80367 12.0002 6.74295 12.1821 6.75621 12.3262C6.99526 14.9169 9.77662 16.7769 12.5021 16.1693C14.3117 15.7659 15.8317 14.3162 16.0907 12.5844C16.1187 12.3968 16.0919 12.1658 16.1208 11.9964C16.1282 11.9529 16.1473 11.9176 16.183 11.8884H18.8873C18.9126 11.9033 18.9202 11.9211 18.9256 11.9476C18.9465 12.0542 18.9353 12.3721 18.9266 12.4934C18.7103 15.4577 16.2473 18.0236 13.1657 18.7041C8.77016 19.6744 4.25499 16.6923 3.94858 12.4932C3.93966 12.3721 3.92843 12.054 3.94961 11.9474C3.95471 11.9209 3.96262 11.9031 3.98787 11.8882Z"
                    fill="white"
                  />
                  <path
                    d="M5.9375 6.90069C6.09403 5.23496 8.039 4.40618 9.20848 5.48572C9.5153 5.76886 9.9375 6.42189 9.9375 6.87518V9.96174L9.90282 10H5.97218L5.9375 9.96174V6.90069Z"
                    fill="white"
                  />
                  <path
                    d="M12.9375 7.96137C13.054 6.61911 14.3766 5.7394 15.4591 6.06963C16.1292 6.27403 16.9375 7.19641 16.9375 8.04237V9.9595L16.9028 10H12.9722L12.9375 9.9595V7.96137Z"
                    fill="white"
                  />
                </svg>
                My achievements
              </h2>
              <p class="text-gray-600 text-sm mt-1">
                {{ user?.achievements.length }} badges
              </p>
            </div>
            <div class="flex gap-2">
              <div v-for="(badge, index) in user?.achievements" :key="index">
                <img :src="badge" alt="badge" class="w-10 h-10 object-contain" />
              </div>
            </div>
          </div>
  
          <div class="py-6 border-b-2 border-gray-200">
            <h2 class="text-lg font-medium mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-auto inline mr-2"
                viewBox="0 0 23 23"
                fill="none"
              >
                <rect width="23" height="23" fill="#222222" />
                <path
                  d="M3.98787 11.8882H6.69218C6.80367 12.0002 6.74295 12.1821 6.75621 12.3262C6.99526 14.9169 9.77662 16.7769 12.5021 16.1693C14.3117 15.7659 15.8317 14.3162 16.0907 12.5844C16.1187 12.3968 16.0919 12.1658 16.1208 11.9964C16.1282 11.9529 16.1473 11.9176 16.183 11.8884H18.8873C18.9126 11.9033 18.9202 11.9211 18.9256 11.9476C18.9465 12.0542 18.9353 12.3721 18.9266 12.4934C18.7103 15.4577 16.2473 18.0236 13.1657 18.7041C8.77016 19.6744 4.25499 16.6923 3.94858 12.4932C3.93966 12.3721 3.92843 12.054 3.94961 11.9474C3.95471 11.9209 3.96262 11.9031 3.98787 11.8882Z"
                  fill="white"
                />
                <path
                  d="M5.9375 6.90069C6.09403 5.23496 8.039 4.40618 9.20848 5.48572C9.5153 5.76886 9.9375 6.42189 9.9375 6.87518V9.96174L9.90282 10H5.97218L5.9375 9.96174V6.90069Z"
                  fill="white"
                />
                <path
                  d="M12.9375 7.96137C13.054 6.61911 14.3766 5.7394 15.4591 6.06963C16.1292 6.27403 16.9375 7.19641 16.9375 8.04237V9.9595L16.9028 10H12.9722L12.9375 9.9595V7.96137Z"
                  fill="white"
                />
              </svg>
              Upcoming events
            </h2>
  
            <div v-if="events.length" class="space-y-4">
              <router-link
                :to="`/event/${event.id}`"
                v-for="event in events"
                :key="event.id"
                class="flex items-center gap-4"
              >
                <img
                  v-if="event.images?.length"
                  :src="`${event.images[0]}`"
                  alt="Event"
                  class="w-12 h-12 object-cover"
                />
                <div class="flex flex-col">
                  <p class="text-sm font-medium text-gray-900">
                    {{ event.title }}
                  </p>
                  <p class="text-gray-600 text-xs italic">
                    {{ event.type }} –
                    {{
                      new Date(event.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    }}
                  </p>
                </div>
              </router-link>
            </div>
  
            <div v-else class="text-sm text-gray-500">No events to display.</div>
          </div>
  
          <div class="py-6 border-b-2 border-gray-200">
            <h2 class="text-lg font-medium mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-auto inline mr-2"
                viewBox="0 0 23 23"
                fill="none"
              >
                <rect width="23" height="23" fill="#222222" />
                <path
                  d="M3.98787 11.8882H6.69218C6.80367 12.0002 6.74295 12.1821 6.75621 12.3262C6.99526 14.9169 9.77662 16.7769 12.5021 16.1693C14.3117 15.7659 15.8317 14.3162 16.0907 12.5844C16.1187 12.3968 16.0919 12.1658 16.1208 11.9964C16.1282 11.9529 16.1473 11.9176 16.183 11.8884H18.8873C18.9126 11.9033 18.9202 11.9211 18.9256 11.9476C18.9465 12.0542 18.9353 12.3721 18.9266 12.4934C18.7103 15.4577 16.2473 18.0236 13.1657 18.7041C8.77016 19.6744 4.25499 16.6923 3.94858 12.4932C3.93966 12.3721 3.92843 12.054 3.94961 11.9474C3.95471 11.9209 3.96262 11.9031 3.98787 11.8882Z"
                  fill="white"
                />
                <path
                  d="M5.9375 6.90069C6.09403 5.23496 8.039 4.40618 9.20848 5.48572C9.5153 5.76886 9.9375 6.42189 9.9375 6.87518V9.96174L9.90282 10H5.97218L5.9375 9.96174V6.90069Z"
                  fill="white"
                />
                <path
                  d="M12.9375 7.96137C13.054 6.61911 14.3766 5.7394 15.4591 6.06963C16.1292 6.27403 16.9375 7.19641 16.9375 8.04237V9.9595L16.9028 10H12.9722L12.9375 9.9595V7.96137Z"
                  fill="white"
                />
              </svg>
              My posts
            </h2>
  
            <div class="grid grid-cols-3 gap-2 justify-center">
              <router-link
                :to="`/post/${post?.id}`"
                v-for="post in posts.slice(0, 5)"
                :key="post.id"
                class="bg-gray-100 h-28 w-28 flex justify-center items-center overflow-hidden"
              >
                <img
                  v-if="post.images?.length"
                  :src="post.images[0]"
                  alt="Post image"
                  class="w-full h-full object-cover"
                />
                <Image v-else class="w-10 h-10 text-gray-400" />
              </router-link>
  
              <div
                v-if="posts.length > 5"
                class="bg-gray-100 h-28 w-28 flex justify-center items-center"
              >
                <p class="text-gray-500 text-xs text-center">
                  +{{ posts.length - 5 }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
  
      <!-- <div v-else class="text-center text-red-500 mt-4">User not found.</div> -->
    </div>
  </section>
</template>

<script setup lang="ts">
import {
  CircleUserRound,
  Pencil,
  ArrowLeft,
  Image,
  Award,
  User as UserIcon,
  CalendarDays,
} from "lucide-vue-next";
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import type User from "../../interfaces/interface.user";
import type Event from "../../interfaces/interface.event";
import type Post from "../../interfaces/interface.post";
const user = ref<User | null>(null);
const events = ref<Event[]>([]);
const posts = ref<Post[]>([]);
const loading = ref(true);

const route = useRoute();
const currentUserId = Number(route.params.id);
const router = useRouter();
function goBack() {
  router.back();
}

const storedIdRaw = localStorage.getItem("userId");
if (storedIdRaw == null) {
  const storedId = Number(storedIdRaw);
  if (storedId !== currentUserId) {
    console.warn("User ID in localStorage does not match the route parameter.");
    router.push(`/login`);
  }
} else {
  console.warn("No user ID found in localStorage.");
  router.push(`/login`);
}
async function fetchData() {
  try {
    const usersResponse = await fetch("/src/assets/data/users.json");
    const eventsResponse = await fetch("/src/assets/data/events.json");
    const postsResponse = await fetch("/src/assets/data/posts.json");

    if (!usersResponse.ok || !eventsResponse.ok || !postsResponse.ok) {
      throw new Error("Failed to fetch users, events, or posts");
    }

    const usersData = await usersResponse.json();
    const eventsData = await eventsResponse.json();
    const postsData = await postsResponse.json();

    user.value =
      usersData.users.find((u: User) => u.id === currentUserId) || null;

    const created = eventsData.events
      .filter((event: any) => event.createdBy === currentUserId)
      .map((event: any) => ({ ...event, type: "Organised" }));

    const attended = eventsData.events
      .filter((event: any) => event.participants.includes(currentUserId))
      .map((event: any) => ({ ...event, type: "Attended" }));

    events.value = [...created, ...attended];

    const localPosts = JSON.parse(localStorage.getItem("posts") || "[]");

    const allPosts = [...postsData.posts, ...localPosts].filter(
      (post: any) => post.userId === currentUserId
    );

    posts.value = allPosts.sort(
      (a: any, b: any) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchData();
});
</script>
