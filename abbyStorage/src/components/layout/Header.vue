<template>
  <header class="flex items-center justify-between px-6 py-4 bg-alphaYellow">
    <Logo class="h-6 w-auto fill-alphaDark" />

    <div class="flex items-center gap-6">
      <IconButton label="Scanner" to="/scanner">
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
      <IconButton label="Notifications" to="/notifications">
        <!-- TODO: Change SVG -->
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="30"
          height="30"
          viewBox="0 0 30 30"
          fill="none"
        >
          <path
            d="M15 28.125C15.9117 28.1241 16.8034 27.8576 17.5662 27.3581C18.3289 26.8587 18.9296 26.1478 19.2949 25.3125H10.7051C11.0704 26.1478 11.6711 26.8587 12.4338 27.3581C13.1966 27.8576 14.0883 28.1241 15 28.125Z"
            fill="#21272A"
          />
          <path
            d="M23.4375 16.875V13.3283C23.4375 9.19922 21.8344 5.60215 17.8125 4.6875L17.3438 1.875H12.6562L12.1875 4.6875C8.15156 5.60215 6.5625 9.18516 6.5625 13.3283V16.875L3.75 20.625V23.4375H26.25V20.625L23.4375 16.875Z"
            fill="#21272A"
          />
        </svg>
      </IconButton>
    </div>
  </header>
</template>

<script setup="ts">
import Logo from "../../assets/images/svg/Logo.vue"
import IconButton from "../generic/IconButton.vue"
</script>
