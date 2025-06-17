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
import Post from "./Post.vue";
import type PostType from "../../interfaces/interface.post";
import { ref } from "vue";

// Props
const props = defineProps<{
  posts: PostType[];
  showOptionsId?: string | null;
}>();

// Emits
const emit = defineEmits(["toggle-options", "report-post"]);

// Local state for options
const showOptionsId = ref<string | null>(props.showOptionsId ?? null);

// Methods
const toggleOptions = (id: string) => {
  showOptionsId.value = showOptionsId.value === id ? null : id;
  emit("toggle-options", id);
};

const reportPost = (id: string) => {
  emit("report-post", id);
};
</script>