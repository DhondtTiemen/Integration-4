<template>
  <img
    v-if="screen == 'account'"
    :class="imgClass || 'h-32 w-32 rounded-full object-cover mb-6'"
    :src="url || defaultPath"
    :alt="alt || 'Avatar'"
  />
  <img
    v-if="screen == 'edit'"
    :class="imgClass || 'w-fill object-cover rounded-full'"
    :src="url || defaultPath"
    :alt="alt || 'Avatar'"
  />
  <img
    v-if="screen == 'nav'"
    :class="imgClass || 'h-full w-full object-cover'"
    :src="url || defaultPath"
    :alt="alt || 'Avatar'"
  />
  <img
    v-if="screen == 'mainImage'"
    :class="imgClass || 'w-32 h-32 object-cover rounded-lg'"
    :src="url || defaultPath"
    :alt="alt || 'Main Image'"
  />
  <img
    v-if="screen == 'imageItems'"
    :class="imgClass || 'w-full h-full object-cover rounded'"
    :src="url || defaultPath"
    :alt="alt || 'Main Image'"
  />
  <img
    v-if="screen == 'boxDetail'"
    :class="imgClass || 'w-full h-full object-cover'"
    :src="url || defaultPath"
    :alt="alt || 'Main Image'"
  />
  <img
    v-if="screen == 'eventThumbnail'"
    :class="imgClass || 'w-12 h-12 object-cover'"
    :src="url || defaultPath"
    :alt="alt || 'Event Image'"
  />
  <img
    v-if="screen == 'postImage'"
    :class="imgClass || 'w-full h-full object-cover'"
    :src="url || defaultPath"
    :alt="alt || 'Event Image'"
  />
  <img
    v-if="screen == 'eventDetail'"
    :class="imgClass || 'h-40 w-full object-cover'"
    :src="url || defaultPath"
    :alt="alt || 'Event Image'"
  />
  <img
    v-if="screen == 'default'"
    :class="imgClass || 'w-full  object-cover'"
    :src="url || defaultPath"
    :alt="alt || 'Event Image'"
  />
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { storage } from "../../firebase/firebase";
import { ref as storageRef, getDownloadURL } from "firebase/storage";

const props = defineProps<{
  path?: string;
  screen?: string;
  alt?: string;
  imgClass?: string; // <-- voeg deze prop toe
}>();
const url = ref<string>("");
const defaultPath = "src/assets/users/default.png";
const defaultPathImage = "src/assets/images/defaultImage.png";

async function fetchUrl() {
  if (props.path) {
    if (
      props.path.startsWith("/src/assets/") ||
      props.path.startsWith("/assets/")
    ) {
      url.value = props.path;
      return;
    }
    try {
      url.value = await getDownloadURL(storageRef(storage, props.path));
    } catch {
      if (
        props.screen === "mainImage" ||
        props.screen === "imageItems" ||
        props.screen === "boxDetail" ||
        props.screen === "eventThumbnail" ||
        props.screen === "postImage" ||
        props.screen === "eventDetail" ||
        props.screen === "default"
      ) {
        url.value = defaultPathImage;
      } else {
        url.value = defaultPath;
      }
    }
  } else {
    if (
      props.screen === "mainImage" ||
      props.screen === "imageItems" ||
      props.screen === "boxDetail" ||
      props.screen === "eventThumbnail" ||
      props.screen === "postImage" ||
      props.screen === "eventDetail" ||
      props.screen === "default"
    ) {
      url.value = defaultPathImage;
    } else {
      url.value = defaultPath;
    }
  }
}

onMounted(fetchUrl);
watch(() => props.path, fetchUrl);
</script>
