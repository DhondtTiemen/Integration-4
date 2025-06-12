<template>
  <router-view
    class="min-h-screen overflow-x-hidden bg-alphaWhite"
  ></router-view>
  <appNavigation
    v-if="showNavigation"
    class="fixed bottom-0 w-full bg-alphaYellow pt-2 z-50 shadow-md"
  />
</template>

<script lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import appNavigation from "./components/generic/AppNavigation.vue";
import db from "./firebase/init.ts";
import { collection, addDoc, setDoc, doc } from "firebase/firestore";

export default {
  methods: {
    // async createUser() {
    //   const colRef = collection(db, "posts");
    //   const dataObj = {
    //     "userId": "53AHqRY8ndtitJbs5fAb",
    //   "timestamp": "2025-05-27T14:30:00Z",
    //   "content": "Mixing session 🎧",
    //   "images": [
    //     "https://images.pexels.com/photos/7585762/pexels-photo-7585762.jpeg"
    //   ],
    //   "location": "Studio",
    //   "likes": [],
    //   "eventId": "",
    //   "comments": [
    //     {
    //       "userId": "zx5Eek9om8SCCAMCaUYc",
    //       "text": "Sounds great!",
    //       "timestamp": "2025-05-27T15:00:00Z",
    //       "likes": []
    //     }
    //   ],
    //   "views": 80
    //   };
    //   const docRef = await addDoc(colRef, dataObj);
    //   console.log("Document written with ID: ", docRef.id);
    // },
  },
  // created() {
  //   // Uncomment the line below to create a user in the Firestore database
  //   this.createUser();
  // },
  components: {
    appNavigation,
  },
  setup() {
    const route = useRoute();
    // Pas de array hieronder aan met alle routes waar je géén navigatie wilt
    const hideOnRoutes = ["/login", "/register"];
    const showNavigation = computed(() => !hideOnRoutes.includes(route.path));
    return { showNavigation };
  },
};
</script>
