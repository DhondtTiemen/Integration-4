<template>
  <div class="h-fit overflow-hidden">
    <header class="flex items-center justify-between h-16 bg-alphaYellow">
      <h1 class="text-xl font-bold h-6 px-6">Add post</h1>
      <div class="flex items-center px-6 gap-6">
        <button @click="goBack">
          <!-- ...svg... -->
        </button>
      </div>
    </header>

    <div class="flex flex-col">
      <div class="p-4 flex flex-col gap-4">
        <!-- Textarea -->
        <textarea
          v-model="postContent"
          placeholder="What’s on your mind?"
          class="w-full border border-gray-300 px-3 py-2 resize-none text-sm text-gray-700"
          rows="4"
        ></textarea>
        <p v-if="postContentError" class="text-red-500 text-sm">
          {{ postContentError }}
        </p>

        <!-- Image previews -->
        <div class="flex gap-2 flex-wrap">
          <img
            v-for="(img, idx) in imagePreviews"
            :key="idx"
            :src="img"
            class="w-24 h-24 object-cover"
            alt="Preview"
          />
        </div>

        <!-- Action buttons -->
        <div class="flex flex-col gap-3">
          <label
            class="flex items-center gap-2 justify-center border border-black py-2 cursor-pointer"
          >
            <Image class="w-5 h-5" /> Add Photos
            <input
              type="file"
              accept="image/*"
              class="hidden"
              multiple
              @change="onImageChange"
            />
          </label>
          <div v-if="imageError" class="text-red-500 text-sm">
            {{ imageError }}
          </div>
          <div class="mb-4 relative">
            <label class="block text-sm font-medium mb-1" for="eventSelect">
              Select event
            </label>
            <div class="relative">
              <select
                v-model="selectedEventId"
                class="w-full border border-alphaDark px-4 py-2 appearance-none pr-10"
                name="eventSelect"
                id="eventSelect"
              >
                <option value="">No event</option>
                <option
                  v-for="event in events"
                  :key="event.id"
                  :value="event.id"
                >
                  {{ event.title }}
                </option>
              </select>
              <span
                class="pointer-events-none absolute -rotate-90 right-3 top-1/2 transform -translate-y-1/2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="18"
                  viewBox="0 0 21 18"
                  fill="none"
                >
                  <path
                    d="M21 6.07521L4.34696 9.11281L21 12.1504L21 18L0.0393824 11.9026L-2.8975e-07 6.62871L21 0L21 6.07521Z"
                    fill="#222222"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div class="mb-4 relative">
            <label class="block text-sm font-medium mb-1" for="location">
              Location
            </label>
            <div class="relative">
              <select
                v-model="location"
                class="w-full border border-alphaDark px-4 py-2 appearance-none pr-10"
                name="location"
                id="location"
              >
                <option disabled value="">Select location</option>
                <option value="Salon">Salon</option>
                <option value="Atelier">Atelier</option>
                <option value="Living">Living</option>
              </select>
              <span
                class="pointer-events-none absolute -rotate-90 right-3 top-1/2 transform -translate-y-1/2"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="21"
                  height="18"
                  viewBox="0 0 21 18"
                  fill="none"
                >
                  <path
                    d="M21 6.07521L4.34696 9.11281L21 12.1504L21 18L0.0393824 11.9026L-2.8975e-07 6.62871L21 0L21 6.07521Z"
                    fill="#222222"
                  />
                </svg>
              </span>
            </div>
            <p v-if="locationError" class="text-red-500 text-sm mt-1">
              {{ locationError }}
            </p>
          </div>
        </div>

        <!-- Action row -->
        <div class="flex justify-between mt-6 gap-2">
          <button
            class="border border-gray-400 px-5 py-2 text-sm w-full"
            @click="changeCancel()"
          >
            Cancel
          </button>
          <button
            @click="submitPost"
            class="bg-alphaGreen w-full px-5 py-2 text-sm font-medium"
            :disabled="loading"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import { Image } from "lucide-vue-next";
import { useRouter } from "vue-router";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
} from "firebase/firestore";
import db from "../../firebase/firebase";
import { uploadImage } from "../../firebase/imageService";

const router = useRouter();
const postContent = ref("");
const postContentError = ref("");
const imageError = ref("");
const locationError = ref("");
const imageFiles = ref<File[]>([]);
const imagePreviews = ref<string[]>([]);
const loading = ref(false);

const location = ref("");

const storedIdRaw = localStorage.getItem("userId");
if (!storedIdRaw) {
  router.push(`/login`);
}

const events = ref<any[]>([]);
const eventSearch = ref("");
const selectedEventId = ref("");

onMounted(async () => {
  const eventsQuery = query(collection(db, "events"), orderBy("date", "desc"));
  const querySnap = await getDocs(eventsQuery);
  events.value = [];
  querySnap.forEach((doc) => {
    events.value.push({ id: doc.id, ...doc.data() });
  });
});

function goBack() {
  router.back();
}
function changeCancel() {
  // zet alle inputs terug naar de originele waarden
  postContent.value = "";
  imageFiles.value = [];
  imagePreviews.value = [];
  selectedEventId.value = "";
  eventSearch.value = "";
  location.value = "";

  router.back();
}
function onImageChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files) {
    imageFiles.value = Array.from(target.files);
    imagePreviews.value = [];
    for (const file of imageFiles.value) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result)
          imagePreviews.value.push(e.target.result as string);
      };
      reader.readAsDataURL(file);
    }
  }
}

async function submitPost() {
  if (loading.value) return; // bovenaan submitPost
  loading.value = true;
  postContentError.value = "";
  imageError.value = "";
  locationError.value = "";

  let hasError = false;

  if (!postContent.value.trim()) {
    postContentError.value = "Please write something before posting.";
    hasError = true;
  }
  if (imageFiles.value.length === 0) {
    imageError.value = "Please add at least one photo.";
    hasError = true;
  }
  if (!location.value) {
    locationError.value = "Please select a location.";
    hasError = true;
  }
  if (hasError) return;

  loading.value = true;
  try {
    // Upload all images and collect URLs
    const imageUrls: string[] = [];
    for (let i = 0; i < imageFiles.value.length; i++) {
      const file = imageFiles.value[i];
      // Gebruik nu Date.now() + i + file.name voor unieke naam
      const uniqueName = `${Date.now()}_${i}_${file.name}`;
      const url = await uploadImage(file, `posts/${storedIdRaw}/${uniqueName}`);
      imageUrls.push(url);
    }

    // Save post to Firestore
    const docRef = await addDoc(collection(db, "posts"), {
      userId: storedIdRaw,
      timestamp: String(new Date()),
      content: postContent.value,
      images: imageUrls,
      location: location.value || null,
      eventId: selectedEventId.value || null,
      likes: [],
      comments: [],
      bookmarks: [],
      views: Math.floor(Math.random() * 500),
    });

    postContent.value = "";
    imageFiles.value = [];
    imagePreviews.value = [];
    selectedEventId.value = "";
    eventSearch.value = "";
    location.value = "";
    router.push(`/post/${docRef.id}`);
  } catch (err) {
    postContentError.value = "Failed to post. Try again.";
    console.error(err);
  } finally {
    loading.value = false;
  }
}
</script>
