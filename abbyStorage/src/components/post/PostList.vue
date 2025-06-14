<template>
  <Post
    v-for="post in posts"
    :key="post.id"
    :post="post"
    :showOptionsId="showOptionsId ?? undefined"
    @toggle-options="toggleOptions"
    @report-post="reportPost"
  />
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";

import Post from "./Post.vue";
import type PostType from "../../interfaces/interface.post";

import { fetchPosts } from "../../firebase/postService";

// STATE
const posts = ref<PostType[]>([]);
const showOptionsId = ref<string | null>(null);

// FUNCTIONS
const getPosts = async () => {
  posts.value = await fetchPosts();
};

const toggleOptions = (id: string) => {
  showOptionsId.value = showOptionsId.value === id ? null : id;
};

const reportPost = (id: string) => {
  posts.value = posts.value.filter((post) => post.id !== id);
};

onMounted(getPosts);

// EMITS
const emit = defineEmits(["toggle-options", "report-post"]);
</script>
