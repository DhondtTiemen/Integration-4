<template>
  <section class="min-h-screen mb-16">
    <!-- HEADER -->
    <Header />

    <!-- POSTLIST -->
    <PostList
      v-if="posts && posts.length"
      :posts="posts"
      @toggle-options="toggleOptions"
      @report-post="reportPost"
    />
    <div v-else class="text-center mt-8">
      <p class="text-gray-500">No posts available.</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Header from "../components/layout/Header.vue";
import PostList from "../components/post/PostList.vue";
import type Post from "../interfaces/interface.post";
import { fetchPosts } from "../firebase/postService";

const posts = ref<Post[]>([]);

const getPosts = async () => {
  posts.value = await fetchPosts();
};
const emit = defineEmits(["toggle-options", "report-post"]);

function toggleOptions(id: string | number) {
  emit("toggle-options", id);
}

function reportPost(id: string | number) {
  emit("report-post", id);
}
onMounted(getPosts);
</script>
