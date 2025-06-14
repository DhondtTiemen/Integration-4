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
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { storage } from "../../firebase/firebase";
import { ref as storageRef, getDownloadURL } from "firebase/storage";

const props = defineProps<{ path?: string; screen?: string }>();
const url = ref<string>("");
const defaultPath = "/src/assets/users/default.png";

async function fetchUrl() {
  if (props.path) {
    try {
      url.value = await getDownloadURL(storageRef(storage, props.path));
    } catch {
      url.value = defaultPath;
    }
  } else {
    url.value = defaultPath;
  }
  console.log("Image URL fetched:", url.value);
}

onMounted(fetchUrl);
watch(() => props.path, fetchUrl);
</script>
