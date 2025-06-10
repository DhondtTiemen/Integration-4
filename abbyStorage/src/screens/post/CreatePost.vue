<template>
  <!-- Header -->
  <div v-bind="$attrs">
    <header class="flex items-center justify-between h-16 bg-alphaYellow">
      <h1 class="text-xl font-bold h-6 px-6">Add post</h1>
      <div class="flex items-center px-6 gap-6">
        <button>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M20.5714 16.2859H16.2856V20.5716H20.5714V16.2859Z"
              fill="#21272A"
            />
            <path
              d="M16.2857 12.8572H12.8572V16.2857H16.2857V12.8572Z"
              fill="#21272A"
            />
            <path
              d="M24.0001 20.5713H20.5715V23.9999H24.0001V20.5713Z"
              fill="#21272A"
            />
            <path
              d="M23.9999 12.8572H21.4285V15.4286H23.9999V12.8572Z"
              fill="#21272A"
            />
            <path
              d="M15.4286 21.4287H12.8572V24.0001H15.4286V21.4287Z"
              fill="#21272A"
            />
            <path
              d="M20.5714 3.42871H16.2856V7.71443H20.5714V3.42871Z"
              fill="#21272A"
            />
            <path
              d="M24 11.1429H12.8572V0H24V11.1429ZM15.2143 8.78571H21.6429V2.35714H15.2143V8.78571Z"
              fill="#21272A"
            />
            <path
              d="M7.71418 3.42871H3.42847V7.71443H7.71418V3.42871Z"
              fill="#21272A"
            />
            <path
              d="M11.1429 11.1429H0V0H11.1429V11.1429ZM2.35714 8.78571H8.78571V2.35714H2.35714V8.78571Z"
              fill="#21272A"
            />
            <path
              d="M7.71418 16.2859H3.42847V20.5716H7.71418V16.2859Z"
              fill="#21272A"
            />
            <path
              d="M11.1429 24H0V12.8572H11.1429V24ZM2.35714 21.6429H8.78571V15.2143H2.35714V21.6429Z"
              fill="#21272A"
            />
          </svg>
        </button>
      </div>
    </header>

    <div class="flex flex-col">
      <!-- Form -->
      <div class="p-4 flex flex-col gap-4">
        <!-- TODO: Do you have to see yourself when you want to post something??? -->
        <!-- <div class="flex items-center gap-3">
        <img :src="user.avatar" class="w-10 h-10 rounded-full object-cover" />
        <span class="text-sm text-gray-700 font-medium">{{ user.name }}</span>
      </div> -->

        <!-- Textarea -->
        <textarea
          v-model="postContent"
          placeholder="What’s on your mind?"
          class="w-full border border-gray-300 rounded px-3 py-2 resize-none text-sm text-gray-700"
          rows="4"
        ></textarea>
        <p v-if="postContentError" class="text-red-500 text-sm">
          {{ postContentError }}
        </p>

        <!-- Action buttons -->
        <div class="flex flex-col gap-3">
          <button
            class="flex items-center gap-2 justify-center border border-black py-2 rounded"
          >
            <Image class="w-5 h-5" /> Add Photos
          </button>

          <button
            class="flex items-center gap-2 justify-center border border-black py-2 rounded"
          >
            <Link class="w-5 h-5" /> Add event link
          </button>

          <button
            class="flex items-center gap-2 justify-center border border-black py-2 rounded"
          >
            <MapPin class="w-5 h-5" /> Add location
          </button>
        </div>

        <!-- Action row -->
        <div class="flex justify-between mt-6 gap-2">
          <button class="border border-gray-400 px-5 py-2 text-sm w-full">
            Cancel
          </button>
          <button
            @click="submitPost"
            class="bg-alphaGreen w-full px-5 py-2 text-sm font-medium"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Image, Link, MapPin } from "lucide-vue-next";
import { ArrowLeft } from "lucide-vue-next";

import { useRouter } from "vue-router";
const user = {
  name: "Jamie Parker",
  avatar: "/src/assets/images/jamie.jpg",
};

const router = useRouter();
const postContent = ref("");
const postContentError = ref("");
const posts = ref([]);

const storedIdRaw = localStorage.getItem("userId");
if (storedIdRaw == "") {
  console.warn("No user ID found in localStorage.");
  router.push(`/login`);
}

function submitPost() {
  if (!postContent.value.trim()) {
    // alert('Please write something before posting.')
    postContentError.value = "Please write something before posting.";
    return;
  }

  // hier zou je bv. verder kunnen posten naar een API of localStorage
  //   alert(`Posting: ${postContent.value}`)
  postContentError.value = "";

  // Load existing posts
  const existingPosts = JSON.parse(localStorage.getItem("posts") || "[]");

  const newPost = {
    id: Date.now(),
    userId: 1,
    timestamp: new Date().toISOString(),
    content: postContent.value,
    images: [],
    location: null,
    likes: [],
    comments: [],
    bookmarks: [],
    views: 0,
  };

  existingPosts.push(newPost);
  localStorage.setItem("posts", JSON.stringify(existingPosts));

  // Optional: reset post content and go back
  postContent.value = "";
  history.back();
}

function goBack() {
  history.back();
}
</script>
