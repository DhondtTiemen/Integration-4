<template>
  <Post
    v-for="post in posts"
    :key="post.id"
    :post="post"
    :showOptionsId="showOptionsId"
    @toggle-options="toggleOptions"
    @report-post="reportPost"
  />
</template>

<script setup>
    import { ref, onMounted } from 'vue'
    import Post from './Post.vue'

    const posts = ref([])
    const showOptionsId = ref(null)

    function toggleOptions(id) {
        showOptionsId.value = showOptionsId.value === id ? null : id
    }

    function reportPost(id) {
        posts.value = posts.value.filter(post => post.id !== id)
    }

    onMounted(async () => {
        const res = await fetch('/src/assets/data/posts.json')
        const data = await res.json()
        posts.value = data.posts.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
        console.log(posts)
    })

    const emit = defineEmits(['toggle-options', 'report-post'])
</script>