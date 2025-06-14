<template>
  <div class="pb-16">
    <nav class="relative flex items-center p-4 bg-alphaYellow">
      <svg
        @click="goBack"
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
      <p
        class="absolute left-1/2 transform -translate-x-1/2 text-center font-medium"
      >
        Create event
      </p>
    </nav>

    <div class="p-4 mt-4">
      <!-- Images block -->
      <div class="mb-6">
        <div class="grid grid-cols-2 gap-2">
          <div
            class="aspect-square bg-gray-600 w-full h-full flex justify-center items-center"
          >
            <img
              v-if="mainImagePreview"
              :src="mainImagePreview"
              class="w-full h-full object-cover aspect-square"
              alt="Event image"
            />
            <Image v-else class="w-16 h-16 text-gray-400" />
          </div>
          <div
            class="flex flex-col aspect-square bg-gray-300 w-full h-full justify-center items-center cursor-pointer"
            @click="triggerImageInput"
          >
            <Plus class="w-16 h-16 text-gray-400" />
            <p class="text-gray-400">Add photo</p>
            <input
              ref="mainImageInput"
              type="file"
              accept="image/*"
              class="hidden"
              @change="onMainImageChange"
            />
          </div>
        </div>
        <p v-if="errors.mainImage" class="text-red-500 text-sm mt-1">
          {{ errors.mainImage }}
        </p>
      </div>

      <!-- Form -->
      <div>
        <!-- Event Name -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2" for="eventName"
            >Event Name</label
          >
          <input
            v-model="eventName"
            id="eventName"
            type="text"
            class="w-full border border-alphaDark px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Painting with Tiffany"
          />
          <p v-if="errors.eventName" class="text-red-500 text-sm mt-1">
            {{ errors.eventName }}
          </p>
        </div>

        <!-- Description -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2" for="description"
            >Description</label
          >
          <textarea
            v-model="description"
            id="description"
            rows="3"
            class="w-full border border-alphaDark px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            placeholder="Describe this event"
          ></textarea>
          <p v-if="errors.description" class="text-red-500 text-sm mt-1">
            {{ errors.description }}
          </p>
        </div>

        <!-- Date & Time -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-2" for="eventDate"
            >Date and time</label
          >
          <input
            v-model="eventDate"
            type="datetime-local"
            id="eventDate"
            class="w-full border border-alphaDark px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
          <p v-if="errors.eventDate" class="text-red-500 text-sm mt-1">
            {{ errors.eventDate }}
          </p>
        </div>

        <!-- Location -->
        <div class="mb-4">
          <label class="block text-sm font-medium mb-1" for="location"
            >Location</label
          >
          <select
            v-model="location"
            class="w-full border border-alphaDark px-4 py-2"
            name="location"
            id="location"
          >
            <option disabled value="">Select location</option>
            <option value="Salon">Salon</option>
            <option value="Atelier">Atelier</option>
            <option value="Living">Living</option>
          </select>
          <p v-if="errors.location" class="text-red-500 text-sm mt-1">
            {{ errors.location }}
          </p>
        </div>

        <!-- Materials -->
        <div class="mb-6">
          <label
            class="block text-sm font-medium text-gray-700 mb-1"
            for="materials"
            >Materials to bring</label
          >
          <!-- List of materials -->
          <div
            v-for="(material, index) in materials"
            :key="index"
            class="flex items-center gap-2 mb-2"
          >
            <input
              type="text"
              v-model="materials[index]"
              class="w-full border border-alphaDark px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Material"
            />
            <Trash2 class="cursor-pointer" @click="removeMaterial(index)" />
          </div>
          <!-- Add new material -->
          <div class="flex items-center justify-between">
            <input
              v-model="newMaterial"
              @keyup.enter="addMaterial"
              type="text"
              class="w-full border bg-white border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              placeholder="Add another material"
            />
            <Plus
              class="w-8 h-8 ml-4 text-gray-600 cursor-pointer"
              @click="addMaterial"
            />
          </div>
          <p v-if="errors.materials" class="text-red-500 text-sm mt-1">
            {{ errors.materials }}
          </p>
        </div>

        <!-- Submit -->
        <button
          @click="submitEvent"
          class="w-full bg-alphaGreen py-2.5 px-5 hover:bg-primary-700 transition-colors duration-200 text-white font-medium"
          :disabled="loading"
        >
          Request event
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Image, Plus, Trash2 } from "lucide-vue-next";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import db from "../../firebase/firebase";
import { uploadImage } from "../../firebase/imageService";

const router = useRouter();

const eventName = ref("");
const description = ref("");
const eventDate = ref("");
const location = ref("");
const mainImageFile = ref<File | null>(null);
const mainImagePreview = ref<string | null>(null);
const mainImageInput = ref<HTMLInputElement | null>(null);
const loading = ref(false);

const materials = ref([""]);
const newMaterial = ref("");

const errors = ref({
  eventName: "",
  description: "",
  eventDate: "",
  location: "",
  mainImage: "",
  materials: "",
});

function goBack() {
  router.back();
}

function triggerImageInput() {
  mainImageInput.value?.click();
}

function onMainImageChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    mainImageFile.value = file;
    const reader = new FileReader();
    reader.onload = (e) => {
      mainImagePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
}

function addMaterial() {
  const trimmed = newMaterial.value.trim();
  if (trimmed !== "") {
    materials.value.push(trimmed);
    newMaterial.value = "";
  }
}

function removeMaterial(index: number) {
  materials.value.splice(index, 1);
}

function validateForm() {
  // Reset errors
  errors.value = {
    eventName: "",
    description: "",
    eventDate: "",
    location: "",
    mainImage: "",
    materials: "",
  };

  let valid = true;

  if (eventName.value.trim() === "") {
    errors.value.eventName = "Event name is required.";
    valid = false;
  }

  if (description.value.trim() === "") {
    errors.value.description = "Description is required.";
    valid = false;
  }

  if (eventDate.value === "") {
    errors.value.eventDate = "Date and time is required.";
    valid = false;
  }

  if (location.value === "") {
    errors.value.location = "Location is required.";
    valid = false;
  }

  if (!mainImageFile.value) {
    errors.value.mainImage = "Event image is required.";
    valid = false;
  }
  if (!materials.value.length || materials.value.every((m) => !m.trim())) {
    errors.value.materials = "At least one material is required.";
    valid = false;
  }

  return valid;
}

async function submitEvent() {
  if (!validateForm()) {
    return;
  }
  loading.value = true;
  try {
    // Upload main image
    let mainImageUrl = "";
    if (mainImageFile.value) {
      mainImageUrl = await uploadImage(
        mainImageFile.value,
        `events/${Date.now()}_${mainImageFile.value.name}`
      );
    }

    const creatorId = localStorage.getItem("userId") || null;

    const docRef = await addDoc(collection(db, "events"), {
      title: eventName.value,
      about: description.value,
      date: eventDate.value,
      place: location.value,
      materials: materials.value,
      image: mainImageUrl,
      createdBy: creatorId,
      participants: creatorId ? [creatorId] : [],
      status: "Pending",
      timestamp: Timestamp.now(),
    });

    // Reset form
    eventName.value = "";
    description.value = "";
    eventDate.value = "";
    location.value = "";
    mainImageFile.value = null;
    mainImagePreview.value = null;
    materials.value = [];
    newMaterial.value = "";

    router.push(`/event/${docRef.id}`);
  } catch (err) {
    errors.value.eventName = "Failed to create event. Try again.";
    console.error(err);
  } finally {
    loading.value = false;
  }
}
</script>
