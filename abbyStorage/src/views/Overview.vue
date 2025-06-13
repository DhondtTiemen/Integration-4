<template>
  <section class="min-h-screen mb-16">
    <!-- HEADER -->
    <Header />

    <!-- POSTLIST -->
    <PostList
      :posts="posts"
      :showOptionsId="showOptionsId"
      @toggle-options="toggleOptions"
      @report-post="reportPost"
    />
  </section>
</template>

<script>
import Header from '../components/layout/Header.vue'
import PostList from '../components/post/PostList.vue'

export default {
  components: {
    Header,
    PostList
  },

  props: {
    posts: Array,
    showOptionsId: [String, Number] // afhankelijk van jouw gebruik
  },
  
  methods: {
    toggleOptions(id) {
      // logica
    },
    reportPost(id) {
      // logica
    }
  }
}
</script>
