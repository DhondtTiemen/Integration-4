<template>
  <div class="px-4">
    <Post
      v-for="post in posts"
      :key="post.id"
      :post="post"
      :showOptionsId="showOptionsId"
      @toggle-options="toggleOptions"
      @report-post="reportPost"
    />
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import Post from "./Post.vue";
// import type Post from "../../interfaces/interface.post";
import db from "../../firebase/init.ts";

import {
  collection,
  addDoc,
  setDoc,
  doc,
  query,
  getDocs,
  where,
  getDoc,
} from "firebase/firestore";
const posts = ref([]);
const showOptionsId = ref(null);
async function getPosts() {
  try {
    // Haal ALLE posts op uit Firestore
    const q = query(collection(db, "posts"));
    const querySnapshot = await getDocs(q);

    // Verzamel alle posts in een array
    const postList = [];
    querySnapshot.forEach((doc) => {
      postList.push({ id: doc.id, ...doc.data() });
    });

    // Sorteer op nieuwste eerst
    posts.value = postList.sort(
      (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );
    return posts.value;
  } catch (error) {
    console.error("Error fetching posts data:", error);
    posts.value = [];
    return null;
  } 
}
function toggleOptions(id) {
  showOptionsId.value = showOptionsId.value === id ? null : id;
}

function reportPost(id) {
  posts.value = posts.value.filter((post) => post.id !== id);
}

onMounted(async () => {
  await getPosts();
});
const emit = defineEmits(["toggle-options", "report-post"]);
</script>
