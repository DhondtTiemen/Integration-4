<template>
  <div v-bind="$attrs">
    <div class="sticky top-0 bg-alphaYellow z-10 p-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <svg @click="goBack" xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
          <path stroke="#000" stroke-width="2" d="M15 6l-6 6 6 6" />
        </svg>
        <img :src="user?.avatar || '/fallback-avatar.png'" alt="Avatar" class="w-10 h-10 rounded-full object-cover" />
        <div>
          <p class="font-semibold leading-tight">{{ user?.name || "User" }}</p>
          <span class="text-sm text-green-600">● Online</span>
        </div>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 24 24">
        <circle cx="12" cy="5" r="2" fill="#000"/>
        <circle cx="12" cy="12" r="2" fill="#000"/>
        <circle cx="12" cy="19" r="2" fill="#000"/>
      </svg>
    </div>
  </div>
  <div class="p-4 flex flex-col max-h-[calc(100vh-136px)] h-[calc(100vh-136px)]">
    <div class="space-y-2 mb-4 overflow-y-auto flex-1 px-2 max-h-full">
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
      class="flex gap-4 p-2 border-t border-gray-400 bg-white sticky bottom-0"
    >
      <input
        v-model="message"
        placeholder="Type a message…"
        class="px-3 py-2 w-full"
        @keyup.enter="sendMessage"
      />
      <button
        @click="sendMessage"
      >
              <svg xmlns="http://www.w3.org/2000/svg" class="rotate-180 fill-alphaGreen h-6 w-auto" width="21" height="18" viewBox="0 0 21 18"
                fill="none">
                <path
                  d="M21 6.07521L4.34696 9.11281L21 12.1504L21 18L0.0393824 11.9026L-2.8975e-07 6.62871L21 0L21 6.07521Z" />
              </svg>
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { io } from "socket.io-client";
import { useRoute, useRouter } from "vue-router";

const socket = io("https://abby-socket.onrender.com", {
  transports: ["websocket"],
  withCredentials: true,
}); // of productie-URL

// Replace this with logic to get the currently authenticated user
const currentUserId = localStorage.getItem("userId") ?? "";

const route = useRoute();
const router = useRouter();
const targetUserId = route.params.userId as string;
console.log(targetUserId);

const message = ref("");
const messages = ref<{ from: string; message: string }[]>([]);

import { query, where, getDocs, orderBy, doc, getDoc } from "firebase/firestore";
import db from "./../firebase/firebase";

import { addDoc, collection, Timestamp } from "firebase/firestore";

const user = ref<{ name: string; avatar: string } | null>(null);

const goBack = () => router.back();

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
    const chatId = [currentUserId, targetUserId].sort().join("_");

    await addDoc(collection(db, "messages"), {
      chatId,
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
  const chatId = [currentUserId, targetUserId].sort().join("_");
  const messagesRef = collection(db, "messages");
  const q = query(
    messagesRef,
    where("chatId", "==", chatId),
    orderBy("timestamp")
  );
  const querySnapshot = await getDocs(q);
  messages.value = querySnapshot.docs.map(
    (doc) => doc.data() as { from: string; message: string }
  );

  // Load target user info:
  console.log("👤 Loading user with ID:", targetUserId);
  const userDocRef = doc(db, "users", targetUserId);
  const userDoc = await getDoc(userDocRef);
  console.log("Snapshot exists?", userDoc.exists());
  if (!userDoc.exists()) {
    console.error("❌ User not found:", targetUserId);
  } else {
    user.value = userDoc.data() as { name: string; avatar: string };
  }

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
