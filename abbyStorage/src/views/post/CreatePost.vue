<template>
  <div class="h-fit overflow-hidden">
    <header class="flex items-center justify-between h-16 bg-alphaYellow">
      <h1 class="text-xl font-bold h-6 px-6">Add post</h1>
      <div class="flex items-center px-6 gap-6">
        <button @click="goBack">
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
        <div v-if="imageError" class="text-red-500 text-sm">
          {{ imageError }}
        </div>
        <!-- Image preview -->
        <div v-else class="flex gap-2 flex-wrap">
          <img
            v-for="(img, idx) in imagePreview"
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
              @change="onImageChange"
            />
            <div v-if="imagePreview" class="flex gap-2 flex-wrap">
              <img
                :src="imagePreview"
                class="w-24 h-24 object-cover"
                alt="Preview"
              />
            </div>
          </label>

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
              <!-- Custom arrow SVG -->
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
            <p v-if="errors.location" class="text-red-500 text-sm mt-1">
              {{ errors.location }}
            </p>
          </div>
        </div>

        <!-- Action row -->
        <div class="flex justify-between mt-6 gap-2">
          <button
            class="border border-gray-400 px-5 py-2 text-sm w-full"
            @click="goBack"
          >
            Cancel
          </button>
          <button
            @click="submitPost"
            class="bg-alphaGreen w-full px-5 py-2 text-sm font-medium"
          >
            Post
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { Image, Link, MapPin } from "lucide-vue-next";
import { useRouter } from "vue-router";
import {
  collection,
  addDoc,
  Timestamp,
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
const imageFile = ref<File | null>(null);
const imagePreview = ref<string | null>(null);
const loading = ref(false);

const location = ref("");
const errors = ref({
  eventName: "",
  description: "",
  eventDate: "",
  location: "",
});

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

function onImageChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    imageFile.value = target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(imageFile.value);
  }
}

async function submitPost() {
  postContentError.value = "";
  imageError.value = "";
  locationError.value = "";

  let hasError = false;

  if (!postContent.value.trim()) {
    postContentError.value = "Please write something before posting.";
    hasError = true;
  }
  if (!imageFile.value) {
    imageError.value = "Please add a photo.";
    hasError = true;
  }
  if (!location.value) {
    locationError.value = "Please select a location.";
    hasError = true;
  }
  if (hasError) return;

  loading.value = true;
  try {
    let imageUrl = "";
    if (imageFile.value) {
      imageUrl = await uploadImage(
        imageFile.value,
        `posts/${storedIdRaw}/${imageFile.value.name}`
      );
    }

    // Save post to Firestore
    const docRef = await addDoc(collection(db, "posts"), {
      userId: storedIdRaw,
      timestamp: String(new Date()),
      content: postContent.value,
      image: imageUrl,
      location: location.value || null,
      eventId: selectedEventId.value || null,
      likes: [],
      comments: [],
      bookmarks: [],
      views: 0,
    });

    postContent.value = "";
    imageFile.value = null;
    imagePreview.value = null;
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
