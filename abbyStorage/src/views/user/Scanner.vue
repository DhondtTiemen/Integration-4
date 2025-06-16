<template>
  <div class="min-h-screen">
    <PageHeader title="Share your profile" />

    <!-- QR Page Content -->
    <div class="flex flex-col items-center gap-4 p-8 bg-alphaGreen">
      
      <!-- Profile preview -->
      <div class="flex items-center justify-center gap-8 mb-8">
        <img :src="user.avatar" alt="Profile picture" class="w-20 h-20 rounded-full object-cover" />
        <div class="max-w-56">
            <h3 class="text-lg font-semibold">{{ user.name }}</h3>
            <p class="text-sm text-gray-800">{{ user.bio }}</p>
        </div>
      </div>

      <!-- QR code -->
      <div class="p-4 bg-alphaLight mb-8">
        <img :src="qrCodeUrl" alt="QR Code" class="w-56 h-56 object-contain" />
      </div>
    </div>

    <!-- Scan QR Code button -->
    <div class=" p-6 bg-alphaYellow">
        <h2 class="text-2xl font-bold text-center w-full mb-6">Find people:</h2>
        <SecondaryButton default-text="Scan a QR-code" @click="goToScanner" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

import PageHeader from "../../components/layout/PageHeader.vue"
import SecondaryButton from "../../components/generic/SecondaryButton.vue"

import { getUserById } from '../../firebase/userService'

const route = useRoute()
const router = useRouter()

const user = ref({
  id: '',
  name: '',
  bio: '',
  avatar: '',
})

onMounted(async () => {
  const userId = route.params.id as string
  const fetchedUser = await getUserById(userId)
  if (fetchedUser) {
    user.value = fetchedUser
  }
})

// This URL would be encoded in the QR code
const userProfileUrl = computed(() => `http://localhost:5173/account/${user.value.id}`)

const qrCodeUrl = computed(() =>
  `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(userProfileUrl.value)}`
)

const goToScanner = () => {
  router.push('/scanner/scan')
}
</script>