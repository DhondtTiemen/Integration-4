<template>
  <header class="p-4">
    <router-link
      to="/"
      class="flex items-center justify-end font-bold gap-2 mb-4"
    >
      <button class="text-black">Skip</button>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="18"
        viewBox="0 0 21 18"
        fill="none"
        class="z-10 cursor-pointer rotate-180"
      >
        <path
          d="M21 6.07521L4.34696 9.11281L21 12.1504L21 18L0.0393824 11.9026L-2.8975e-07 6.62871L21 0L21 6.07521Z"
          fill="#222222"
        />
      </svg>
    </router-link>
  </header>
  <div class="min-h-screen flex flex-col items-center gap-10 px-6 py-8">
    <h1 class="text-2xl w-52 text-center font-bold leading-tight">
      Connect with others
    </h1>
    <div class="h-[280px] flex items-center justify-center">
      <img class="h-full" src="../../assets/images/onboardingIMG3.jpg" alt="" />
    </div>
    <div class="flex w-24 justify-center gap-4">
      <svg
        @click="goBack"
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="18"
        viewBox="0 0 21 18"
        fill="none"
        class="z-10 cursor-pointer rotate-180 opacity-50"
      >
        <path
          d="M21 6.07521L4.34696 9.11281L21 12.1504L21 18L0.0393824 11.9026L-2.8975e-07 6.62871L21 0L21 6.07521Z"
          fill="#222222"
        />
      </svg>
      <svg
        @click="goBack"
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="18"
        viewBox="0 0 21 18"
        fill="none"
        class="z-10 cursor-pointer rotate-180 opacity-50"
      >
        <path
          d="M21 6.07521L4.34696 9.11281L21 12.1504L21 18L0.0393824 11.9026L-2.8975e-07 6.62871L21 0L21 6.07521Z"
          fill="#222222"
        />
      </svg>
      <svg
        @click="goBack"
        xmlns="http://www.w3.org/2000/svg"
        width="21"
        height="18"
        viewBox="0 0 21 18"
        fill="none"
        class="z-10 cursor-pointer rotate-180 "
      >
        <path
          d="M21 6.07521L4.34696 9.11281L21 12.1504L21 18L0.0393824 11.9026L-2.8975e-07 6.62871L21 0L21 6.07521Z"
          fill="#222222"
        />
      </svg>
    </div>

    <p class="text text-gray-700 w-80 mb-6 text-center">
      Make new friends and like-minded people, share your art and organise
      events
    </p>

    <div class="flex justify-between w-full gap-4">
      <SecondaryButton path="/onboarding/2" type="button" defaultText="Back" />
      <PrimaryButton path="/" type="button" defaultText="Next" />
    </div>
  </div>
</template>

<script setup lang="ts">
import PrimaryButton from "../../components/generic/PrimaryButton.vue";
import SecondaryButton from "../../components/generic/SecondaryButton.vue";

function goBack() {
  history.back();
}
</script>
