<template>
  <section
    class="bg-gray-50 dark:bg-gray-900 min-h-screen flex items-center justify-center px-6 py-8"
  >
    <div
      class="w-full max-w-md bg-white rounded-lg shadow dark:border dark:bg-gray-800 dark:border-gray-700"
    >
      <div class="p-6 space-y-6">
        <h1
          class="text-2xl font-primary font-bold text-gray-900 dark:text-white"
        >
          Sign in to your account
        </h1>
        <form @submit.prevent="handleLogin" class="space-y-4">
          <div>
            <label
              for="email"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Your email</label
            >
            <input
              v-model="email"
              type="email"
              id="email"
              placeholder="name@company.com"
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div>
            <label
              for="password"
              class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >Password</label
            >
            <input
              v-model="password"
              type="password"
              id="password"
              placeholder="••••••••"
              required
              class="bg-gray-50 border border-gray-300 text-gray-900 rounded-lg block w-full p-2.5 focus:ring-primary-600 focus:border-primary-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
            />
          </div>
          <div class="flex items-center justify-between">
            <label
              class="flex items-center text-sm text-gray-500 dark:text-gray-300"
            >
              <input type="checkbox" v-model="remember" class="mr-2" /> Remember
              me
            </label>
            <a
              href="#"
              class="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
              >Forgot password?</a
            >
          </div>
          <button
            type="submit"
            class="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg text-sm px-5 py-2.5 focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-800"
          >
            Sign in
          </button>
          <p class="text-sm text-gray-500 dark:text-gray-400">
            Don’t have an account yet?
            <a
              href="#"
              class="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >Sign up</a
            >
          </p>
          <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
        </form>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const email = ref("");
const password = ref("");
const remember = ref(false);
const error = ref("");
const router = useRouter();

async function handleLogin() {
  try {
    const res = await fetch("/src/assets/data/users.json");
    if (!res.ok) throw new Error("Failed to load user data");

    const data = await res.json();
    const matchedUser = data.users.find(
      (u) => u.mail === email.value && u.password === password.value
    );
    console.log("Matched user:", matchedUser);
    if (matchedUser) {
      console.log("Login success:", matchedUser);
      router.push(`/box/${matchedUser.id}`);
      localStorage.setItem("userId", matchedUser.id.toString());
    } else {
      error.value = "Invalid email or password";
    }
  } catch (err) {
    console.error(err);
    error.value = "Login failed. Please try again.";
  }
}
</script>
