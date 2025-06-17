<template>
  <div v-bind="$attrs">
    <div
      class="sticky top-0 bg-white z-10 p-4 border-b border-gray-200 flex items-center justify-between"
    >
      <h2 class="text-lg font-semibold">
        Chat with {{ route.params.username || "User" }}
      </h2>
    </div>
  </div>
  <div class="p-4 flex flex-col h-screen">
    <div class="space-y-2 mb-4 overflow-y-auto flex-1 px-2">
      <div
        v-for="(msg, index) in messages"
        :key="index"
        :class="[
          msg.from === currentUserId ? 'justify-end' : 'justify-start',
          'flex',
        ]"
      >
        <span
          :class="[
            msg.from === currentUserId
              ? 'bg-blue-500 text-white rounded-br-none'
              : 'bg-gray-200 text-gray-900 rounded-bl-none',
            'px-4 py-2 rounded-xl max-w-xs break-words',
          ]"
        >
          {{ msg.message }}
        </span>
      </div>
    </div>

    <div
      class="flex gap-2 p-2 border-t border-gray-200 bg-white sticky bottom-0 mb-14"
    >
      <input
        v-model="message"
        placeholder="Type a message…"
        class="border border-gray-300 rounded px-3 py-2 w-full"
        @keyup.enter="sendMessage"
      />
      <button
        @click="sendMessage"
        class="bg-alphaGreen text-white px-4 py-2 rounded"
      >
        Send
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { io } from "socket.io-client";
import { useRoute } from "vue-router";

const socket = io("https://abby-socket.onrender.com", {
  transports: ["websocket"],
  withCredentials: true,
}); // of productie-URL

// Replace this with logic to get the currently authenticated user
const currentUserId = localStorage.getItem("userId") ?? "";

const route = useRoute();
const targetUserId = route.params.userId as string;

const message = ref("");
const messages = ref<{ from: string; message: string }[]>([]);

onMounted(() => {
  socket.emit("join", currentUserId);

  socket.on("private-message", (data: { from: string; message: string }) => {
    messages.value.push(data);
  });
});

import { query, where, getDocs, orderBy } from "firebase/firestore";
import db from "./../firebase/firebase";

import { addDoc, collection, Timestamp } from "firebase/firestore";

// In sendMessage()
const sendMessage = async () => {
  if (!message.value.trim()) return;

  // Emit via socket
  socket.emit("private-message", {
    to: targetUserId,
    from: currentUserId,
    message: message.value,
  });

  // Locaal tonen
  messages.value.push({ from: currentUserId, message: message.value });

  // Opslaan in Firestore
  try {
    await addDoc(collection(db, "messages"), {
      from: currentUserId,
      to: targetUserId,
      message: message.value,
      timestamp: Timestamp.now(),
    });
  } catch (err) {
    console.error("🔥 Failed to save message:", err);
  }

  // Clear input
  message.value = "";
};

onMounted(async () => {
  socket.emit("join", currentUserId);

  // Laad oude berichten uit Firestore
  const messagesRef = collection(db, "messages");
  const q = query(
    messagesRef,
    where("participants", "in", [
      [currentUserId, targetUserId],
      [targetUserId, currentUserId],
    ]),
    orderBy("timestamp")
  );
  const querySnapshot = await getDocs(q);
  messages.value = querySnapshot.docs.map(
    (doc) => doc.data() as { from: string; message: string }
  );

  socket.on("private-message", (data: { from: string; message: string }) => {
    messages.value.push(data);
  });
});
</script>

<style scoped>
::-webkit-scrollbar {
  display: none;
}
</style>
