<template>
  <img
    v-if="screen == 'account'"
    class="h-32 w-32 rounded-full object-cover mb-6"
    :src="url || defaultPath"
    alt="Avatar"
  />
  <img
    v-if="screen == 'edit'"
    class="w-24 h-24 object-cover rounded-full"
    :src="url || defaultPath"
    alt="Avatar"
  />
  <img
    v-if="screen == 'nav'"
    class="h-full w-full object-cover"
    :src="url || defaultPath"
    alt="Avatar"
  />
  <img
    v-if="screen == 'mainImage'"
    class="w-32 h-32 object-cover rounded-lg"
    :src="url || defaultPath"
    alt="Main Image"
  />
  <img
    v-if="screen == 'imageItems'"
    class="w-full h-full object-cover rounded"
    :src="url || defaultPath"
    alt="Main Image"
  />
  <img
    v-if="screen == 'boxDetail'"
    class="w-full h-full object-cover "
    :src="url || defaultPath"
    alt="Main Image"
  />
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { storage } from "../../firebase/firebase";
import { ref as storageRef, getDownloadURL } from "firebase/storage";

const props = defineProps<{ path?: string; screen?: string }>();
const url = ref<string>("");
const defaultPath = "/src/assets/users/default.png";
const defaultPathImage = "/src/assets/images/defaultImage.png";

async function fetchUrl() {
  if (props.path) {
    try {
      url.value = await getDownloadURL(storageRef(storage, props.path));
    } catch {
      if (props.screen === "mainImage" || props.screen === "imageItems") {
        url.value = defaultPathImage;
      } else {
        // For other screens, use the default user avatar
        url.value = defaultPath;
      }
    }
  } else {
    // If no path is provided, use the default user avatar
    if (props.screen === "mainImage" || props.screen === "imageItems") {
      url.value = defaultPathImage;
    } else {
      // For other screens, use the default user avatar
      url.value = defaultPath;
    }
    console.log("Image URL fetched:", url.value);
  }
}

onMounted(fetchUrl);
watch(() => props.path, fetchUrl);
</script>
