<template>
  <header class="flex items-center justify-between px-6 py-4 bg-alphaYellow">
    <Logo class="h-6 w-auto fill-alphaDark" />

    <div class="flex items-center gap-6">
      <IconButton label="Scanner" @click="handleScannerClick">
        <!-- TODO: Change SVG -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M20.5714 16.2859H16.2856V20.5716H20.5714V16.2859Z"
            fill="#21272A"
          />
          <path
            d="M16.2857 12.8572H12.8572V16.2857H16.2857V12.8572Z"
            fill="#21272A"
          />
          <path
            d="M24.0001 20.5713H20.5715V23.9999H24.0001V20.5713Z"
            fill="#21272A"
          />
          <path
            d="M23.9999 12.8572H21.4285V15.4286H23.9999V12.8572Z"
            fill="#21272A"
          />
          <path
            d="M15.4286 21.4287H12.8572V24.0001H15.4286V21.4287Z"
            fill="#21272A"
          />
          <path
            d="M20.5714 3.42871H16.2856V7.71443H20.5714V3.42871Z"
            fill="#21272A"
          />
          <path
            d="M24 11.1429H12.8572V0H24V11.1429ZM15.2143 8.78571H21.6429V2.35714H15.2143V8.78571Z"
            fill="#21272A"
          />
          <path
            d="M7.71418 3.42871H3.42847V7.71443H7.71418V3.42871Z"
            fill="#21272A"
          />
          <path
            d="M11.1429 11.1429H0V0H11.1429V11.1429ZM2.35714 8.78571H8.78571V2.35714H2.35714V8.78571Z"
            fill="#21272A"
          />
          <path
            d="M7.71418 16.2859H3.42847V20.5716H7.71418V16.2859Z"
            fill="#21272A"
          />
          <path
            d="M11.1429 24H0V12.8572H11.1429V24ZM2.35714 21.6429H8.78571V15.2143H2.35714V21.6429Z"
            fill="#21272A"
          />
        </svg>
      </IconButton>
      <IconButton label="Events" to="/events" >
        <EventFilled class="h-6 w-6 block" />
      </IconButton>
    </div>

    <Popup :visible="showPopup" @close="showPopup = false" />
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import Logo from "../../assets/images/svg/Logo.vue";
import IconButton from "../generic/IconButton.vue";
import EventFilled from "../../assets/icons/EventFilled.vue";
import Popup from "../generic/popUp.vue";
import { useRouter } from "vue-router";
const showPopup = ref(false);
const router = useRouter();
const userId = ref("");
function handleScannerClick() {
  if (!userId.value) {
    showPopup.value = true;
  } else {
    router.push(`/scanner/${userId.value}`);
  }
}
onMounted(() => {
  const id = localStorage.getItem("userId");
  if (id) userId.value = id;
});
</script>
