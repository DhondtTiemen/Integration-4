<!-- Chat page that dynamically reads the target userId from the URL -->
<template>
  <div class="p-4">
    <div class="space-y-2 mb-4 max-h-[60vh] overflow-y-auto">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="msg.from === currentUserId ? 'text-right' : 'text-left'"
      >
        <span
          :class="msg.from === currentUserId ? 'bg-purple-200 text-purple-800' : 'bg-gray-200 text-gray-800'"
          class="inline-block px-3 py-2 rounded-xl"
        >
          {{ msg.message }}
        </span>
      </div>
    </div>

    <div class="flex gap-2">
      <input
        v-model="message"
        placeholder="Type a message…"
        class="border border-gray-300 rounded px-3 py-2 w-full"
        @keyup.enter="sendMessage"
      />
      <button
        @click="sendMessage"
        class="bg-purple-600 text-white px-4 py-2 rounded"
      >
        Send
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { io } from 'socket.io-client'
import { useRoute } from 'vue-router'

const socket = io('http://192.168.0.152:3001') // of productie-URL

// Replace this with logic to get the currently authenticated user
const currentUserId = localStorage.getItem("userId") ?? "";

const route = useRoute()
const targetUserId = route.params.userId as string

const message = ref('')
const messages = ref<{ from: string, message: string }[]>([])

onMounted(() => {

  socket.emit('join', currentUserId)

  socket.on('private-message', (data: { from: string, message: string }) => {
    messages.value.push(data)
  })
})

const sendMessage = () => {
  if (!message.value.trim()) return
  socket.emit('private-message', {
    to: targetUserId,
    from: currentUserId,
    message: message.value,
  })
  messages.value.push({ from: currentUserId, message: message.value })
  message.value = ''
}
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>