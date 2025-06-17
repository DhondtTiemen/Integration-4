<template>
  <div
    class=" bg-white flex flex-col items-center justify-between py-6 px-4"
  >
    <h2 class="text-lg font-bold text-gray-800 mb-4">Scan a QR Code</h2>
    <qrcode-stream @detect="onDetect" @init="onInit" />
    <p class="text-sm text-gray-600 mt-4" v-if="!scanned">
      Point your camera at a QR code
    </p>
    <p class="text-green-600 text-sm mt-2 font-medium" v-if="scanned">
      QR code detected!
    </p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { QrcodeStream } from "vue-qrcode-reader";
import { useRouter } from "vue-router";

const router = useRouter();
const scanned = ref(false);

function isValidHttpUrl(str: string): boolean {
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

const onDetect = (detectedCodes: { rawValue: string }[]) => {
  if (!detectedCodes.length) return;

  const content = detectedCodes[0].rawValue;

  if (isValidHttpUrl(content)) {
    try {
      const url = new URL(content);
      router.push(url.pathname);
      scanned.value = true;
    } catch (e) {
      console.warn("Invalid URL for routing:", content);
    }
  } else {
    alert(`QR code content: ${content}`);
  }
};

const onInit = (promise: Promise<void>) => {
  promise
    .then(() => console.log("Camera initialized successfully!"))
    .catch((error) => console.error("Camera init error:", error));
};
</script>

<style scoped>
video {
  border-radius: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.15);
}
</style>
