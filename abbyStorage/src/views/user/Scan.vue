

<template>
  <div class="min-h-screen bg-white flex flex-col items-center justify-between py-6 px-4">
    <h2 class="text-lg font-bold text-gray-800 mb-4">Scan a QR Code</h2>
    <video ref="video" class="w-full max-w-sm rounded-lg shadow-md" autoplay playsinline muted></video>
    <canvas ref="canvas" class="hidden"></canvas>
    <p class="text-sm text-gray-600 mt-4" v-if="!scanned">Point your camera at a QR code</p>
    <p class="text-green-600 text-sm mt-2 font-medium" v-if="scanned">QR code detected!</p>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import jsQR from 'jsqr'
import { useRouter } from 'vue-router'

const video = ref<HTMLVideoElement | null>(null)
const canvas = ref<HTMLCanvasElement | null>(null)
const scanned = ref(false)
const router = useRouter()

let scanInterval: number | null = null

const startScan = async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ video: { facingMode: 'environment' } })
    if (video.value) {
      video.value.srcObject = stream
    }

    scanInterval = window.setInterval(() => {
      if (!canvas.value || !video.value) return
      const context = canvas.value.getContext('2d')
      if (!context) return

      canvas.value.width = video.value.videoWidth
      canvas.value.height = video.value.videoHeight

      context.drawImage(video.value, 0, 0, canvas.value.width, canvas.value.height)
      const imageData = context.getImageData(0, 0, canvas.value.width, canvas.value.height)
      const code = jsQR(imageData.data, imageData.width, imageData.height)

      if (code && !scanned.value) {
        scanned.value = true
        clearInterval(scanInterval!)
        const targetUrl = code.data
        router.push(targetUrl)
      }
    }, 500)
  } catch (e) {
    // Optionally handle camera access error
    // e.g., show a message to the user
  }
}

onMounted(() => {
  startScan()
})

onUnmounted(() => {
  if (scanInterval) {
    clearInterval(scanInterval)
  }
  if (video.value?.srcObject) {
    const tracks = (video.value.srcObject as MediaStream).getTracks()
    tracks.forEach((track) => track.stop())
  }
})
</script>

<style scoped>
video {
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}
</style>