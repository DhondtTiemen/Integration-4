<template>
  <!-- Post -->
  <div class="border-b border-gray-400">
    <div class="p-4">
      <PostHeader :userId="post.userId" :post="post" :showOptionsId="showOptionsId"
        @toggle-options="$emit('toggle-options', $event)" @report-post="$emit('report-post', $event)" />

      <!-- POST - CONTENT -->
      <div>
        <!-- Description -->
        <router-link v-if="post?.id" :to="`/post/${post.id}`">
          <p class="mb-4">{{ post?.content }}</p>
        </router-link>
        <PostImages v-if="post?.images?.length" :images="post.images" :postId="post.id" />
      </div>

      <!-- POST - CONTENT - IF EVENT -->
      <EventCard v-if="event" :event="event" />

      <PostActions :postId="post?.id" :initial-likes="post?.likes" :commentsCount="post?.comments.length"
        :views="post?.views" :postTitle="post.content" :url="currentUrl+post.id"/>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits, ref, watch } from "vue";

import type PostType from "../../interfaces/interface.post";
import type EventType from "../../interfaces/interface.event";

import EventCard from "../generic/EventCard.vue";
import PostHeader from "..//post/PostHeader.vue";
import PostImages from "..//post/PostImages.vue";
import PostActions from "..//post/PostActions.vue";

import { getEventById } from "../../firebase/eventService.ts";

const currentUrl = window.location.href ;

const props = defineProps<{
  post: PostType;
  showOptionsId?: string;
}>();

const emit = defineEmits(["toggle-options", "report-post"]);

const event = ref<EventType | null>(null);

watch(
  () => props.post?.eventId,
  async (newEventId) => {
    event.value = newEventId ? await getEventById(newEventId) : null;
  },
  { immediate: true }
);
</script>
