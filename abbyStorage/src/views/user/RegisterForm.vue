<template>
  <section
    class="min-h-screen flex items-center justify-center px-6 py-8 font-primary bg-alphaYellow"
  >
    <div class="w-full max-w-md">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        class="h-8 w-auto mx-auto mb-8"
        viewBox="0 0 71 24"
        fill="none"
      >
        <path
          d="M30.2773 24H22.0752V0.00213973L28.6757 0.000732422C33.0215 0.304008 36.09 4.4313 35.0813 8.70425C34.864 9.62534 34.436 10.4884 33.8972 11.2589C35.1133 12.206 36.0492 13.4923 36.4712 14.9882C37.6768 19.2608 34.7328 23.5771 30.3311 23.9687L30.2773 24ZM26.5983 9.52049H28.5055C28.7794 9.52049 29.3027 9.31889 29.5454 9.1764C31.097 8.26552 31.1677 6.00854 29.6671 5.0178C28.7509 4.41301 27.6403 4.63571 26.5986 4.59279V9.52049H26.5983ZM26.5983 19.3759H30.0244C30.1914 19.3759 30.7116 19.168 30.8741 19.0779C32.4809 18.1888 32.5418 15.8872 31.0109 14.8792C30.7682 14.7195 30.2073 14.4816 29.9231 14.4816H26.5983V19.3755V19.3759Z"
          fill="#222222"
        />
        <path
          d="M38.3784 24V0.00213973L44.9789 0.000732422C50.1167 0.372966 53.2024 5.98145 50.6488 10.5338C50.5813 10.6537 50.1811 11.2304 50.1895 11.2891C51.438 12.2123 52.3802 13.5743 52.7818 15.0822C53.8024 18.915 51.5361 22.7844 47.7354 23.7878L46.5467 24H38.3784ZM42.9015 9.52049H44.7749C45.7396 9.52049 46.7349 8.59659 46.9617 7.69063C47.3866 5.99271 46.1711 4.68391 44.5048 4.59314C43.979 4.56464 43.4301 4.61355 42.9018 4.59314V9.52084L42.9015 9.52049ZM42.9015 19.3759H46.3276C46.5242 19.3759 47.0503 19.1412 47.2325 19.0318C48.7986 18.0893 48.7975 15.7721 47.2227 14.8356C47.0039 14.7054 46.4704 14.4816 46.2263 14.4816H42.9015V19.3755V19.3759Z"
          fill="#222222"
        />
        <path
          d="M0 23.9999L7.4076 0L13.7007 0.00562925L21.0288 23.9999H14.1765L10.4979 4.52521L6.8857 23.9999H0Z"
          fill="#222222"
        />
        <path
          d="M58.0569 23.9999L58.0421 16.3026L51.0361 0.00244141H57.6858L60.7234 12.3555L63.6308 0.00666334L70.3097 0.00244141V0.0699924L63.3301 16.2949L63.3227 23.9999H58.0569Z"
          fill="#222222"
        />
      </svg>

      <div class="p-6 space-y-6">
        <div class="mb-8">
          <h1 class="text-2xl font-bold text-center mb-2">
            Create your account
          </h1>
          <p class="text-center">Sign up to get started</p>
        </div>

        <form @submit.prevent="handleRegister" class="space-y-4">
          <div>
            <label for="name" class="block mb-2 text-sm">Username</label>
            <input
              v-model="name"
              type="name"
              id="name"
              placeholder="JohnD"
              required
              class="border border-alphaDark text-gray-600 text-sm block w-full p-2.5 focus:ring-alphaDark focus:border-alphaDark"
            />
          </div>
          <div>
            <label for="email" class="block mb-2 text-sm">Email address</label>
            <input
              v-model="email"
              type="email"
              id="email"
              placeholder="johndoe@email.com"
              required
              class="border border-alphaDark text-gray-600 text-sm block w-full p-2.5 focus:ring-alphaDark focus:border-alphaDark"
            />
          </div>
          <div>
            <label for="password" class="block mb-2 text-sm">Password</label>
            <input
              v-model="password"
              type="password"
              id="password"
              placeholder="••••••••"
              required
              class="border border-alphaDark text-gray-600 text-sm block w-full p-2.5 focus:ring-alphaDark focus:border-alphaDark"
            />
          </div>
          <div>
            <label for="confirmPassword" class="block mb-2 text-sm"
              >Confirm password</label
            >
            <input
              v-model="confirmPassword"
              type="password"
              id="confirmPassword"
              placeholder="••••••••"
              required
              class="border border-alphaDark text-gray-600 text-sm block w-full p-2.5 focus:ring-alphaDark focus:border-alphaDark"
            />
          </div>
          <div class="flex items-start">
            <div class="flex items-center h-5">
              <input
                v-model="acceptedTerms"
                id="terms"
                type="checkbox"
                required
                class="appearance-none w-4 h-4 border border-alphaDark focus:ring-3 focus:ring-alphaDark checked:bg-alphaGreen checked:border-alphaGreen transition-colors"
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="terms" class="font-light text-alphaDark">
                I accept the
                <a
                  href="https://www.kortrijk.be/privacyverklaring"
                  class="font-medium text-alphaDark hover:underline dark:text-primary-500"
                  >Privacy Policy</a
                >
              </label>
            </div>
          </div>
          <div class="flex items-start mb-6">
            <div class="flex items-center h-5">
              <input
                v-model="subscribeNewsletter"
                id="newsletter"
                type="checkbox"
                class="appearance-none w-4 h-4 border border-alphaDark p-1 focus:ring-3 focus:ring-alphaDark checked:bg-alphaGreen checked:border-alphaGreen transition-colors"
              />
            </div>
            <div class="ml-3 text-sm">
              <label for="newsletter" class="font-light text-alphaDark">
                I want to subscribe to the
                <span
                  class="font-medium text-alphaDark hover:underline dark:text-primary-500"
                  >newsletter</span
                >
              </label>
            </div>
          </div>

          <button
            type="submit"
            class="w-full bg-alphaGreen focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium px-5 py-2.5"
          >
            Create your account
          </button>
          <p class="text-sm font-light">
            Already have an account?
            <a
              href="#"
              class="font-medium text-alphaGreen underline dark:text-primary-500"
              >Login here</a
            >
          </p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import type User from "../../interfaces/interface.user";
import {
  collection,
  addDoc,
  setDoc,
  doc,
  query,
  where,
  updateDoc,
  getDocs,
  getDoc,
} from "firebase/firestore";

import db from "../../firebase/firebase.ts";
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const acceptedTerms = ref(false);
const subscribeNewsletter = ref(false);
const router = useRouter();

localStorage.setItem("userId", "");
async function handleRegister() {
  const colRef = collection(db, "users");
  const user: User = {
    name: name.value,
    mail: email.value,
    password: password.value,
  };
  // hier later: validatie + API call naar backend (bv. met Axios)
  // localStorage.setItem("userId", user.id.toString());
  const docRef = await addDoc(colRef, user);
  localStorage.setItem("userId", docRef.id)
  router.push("/box/create"); // Redirect naar login na registratie
}
</script>
