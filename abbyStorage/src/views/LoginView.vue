<template>
  <section
    class="min-h-screen flex items-center justify-center px-6 py-8 bg-alphaYellow"
  >
    <div class="w-full max-w-md">
      <Logo class="h-8 w-auto mx-auto mb-8 fill-alphaDark" />

      <div class="p-6">
        <div class="mb-8">
          <h1 class="text-2xl font-bold text-center mb-2">Welcome back</h1>
          <p class="text-center">Log in to continue</p>
        </div>

        <form @submit.prevent="handleLogin" class="space-y-6">
          <div class="space-y-4">
            <FormInput
              id="email"
              label="Your email"
              type="email"
              placeholder="johndoe@email.com"
              required
              v-model="email"
            />
            <FormInput
              id="password"
              label="Password"
              type="password"
              placeholder="••••••••"
              required
              v-model="password"
            />
          </div>
          <div class="flex items-center justify-between">
            <!-- TODO: Remember me button -->
            <label class="flex items-center text-sm">
              <input
                type="checkbox"
                v-model="remember"
                class="appearance-none w-4 h-4 border border-alphaDark focus:ring-3 focus:ring-alphaDark mr-2"
              />
              Remember me
            </label>
            <!-- TODO: Forget password link -->
            <a href="#" class="text-sm font-medium text-alphaGreen underline"
              >Forgot password?</a
            >
          </div>
          <PrimaryButton
            type="submit"
            :loading="loading"
            loadingText="Logging in..."
            defaultText="Log in"
          />
          <p class="text-sm">
            Don’t have an account yet?
            <router-link
              to="/register"
              class="font-medium text-alphaGreen underline"
            >
              Sign up
            </router-link>
          </p>
          <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useRouter } from "vue-router";
import { loginUser } from "../firebase/authService";

import Logo from "../assets/images/svg/Logo.vue";

import PrimaryButton from "../components/generic/PrimaryButton.vue";
import FormInput from "../components/generic/FormInput.vue";

const email = ref("");
const password = ref("");

const remember = ref(false);
const error = ref("");
const loading = ref(false);
const router = useRouter();

async function handleLogin() {
  if (!email.value || !password.value) {
    error.value = "Please fill in all fields.";
    return;
  }

  loading.value = true;
  error.value = "";

  try {
    const matchedUser = await loginUser(email.value, password.value);

    if (matchedUser) {
      localStorage.setItem("userId", String(matchedUser.id));
      router.push(`/`);
    } else {
      error.value = "Invalid email or password";
    }
  } catch (err) {
    console.error(err);
    error.value = "Login failed. Please try again.";
  } finally {
    loading.value = false;
  }
}
</script>
