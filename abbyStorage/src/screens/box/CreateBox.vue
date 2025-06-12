<template>
  <div v-if="loading" class="text-center p-4">Loading...</div>

  <div v-else v-bind="$attrs">

    <!-- Header -->
    <header class="flex items-center justify-between h-16 bg-alphaYellow">
      <h1 class="text-xl font-bold h-6 px-6">
        <svg xmlns="http://www.w3.org/2000/svg" width="71" height="24" viewBox="0 0 71 24" fill="none">
          <path d="M30.2773 24H22.0752V0.00213973L28.6757 0.000732422C33.0215 0.304008 36.09 4.4313 35.0813 8.70425C34.864 9.62534 34.436 10.4884 33.8972 11.2589C35.1133 12.206 36.0492 13.4923 36.4712 14.9882C37.6768 19.2608 34.7328 23.5771 30.3311 23.9687L30.2773 24ZM26.5983 9.52049H28.5055C28.7794 9.52049 29.3027 9.31889 29.5454 9.1764C31.097 8.26552 31.1677 6.00854 29.6671 5.0178C28.7509 4.41301 27.6403 4.63571 26.5986 4.59279V9.52049H26.5983ZM26.5983 19.3759H30.0244C30.1914 19.3759 30.7116 19.168 30.8741 19.0779C32.4809 18.1888 32.5418 15.8872 31.0109 14.8792C30.7682 14.7195 30.2073 14.4816 29.9231 14.4816H26.5983V19.3755V19.3759Z" fill="#222222"/>
          <path d="M38.3784 24V0.00213973L44.9789 0.000732422C50.1167 0.372966 53.2024 5.98145 50.6488 10.5338C50.5813 10.6537 50.1811 11.2304 50.1895 11.2891C51.438 12.2123 52.3802 13.5743 52.7818 15.0822C53.8024 18.915 51.5361 22.7844 47.7354 23.7878L46.5467 24H38.3784ZM42.9015 9.52049H44.7749C45.7396 9.52049 46.7349 8.59659 46.9617 7.69063C47.3866 5.99271 46.1711 4.68391 44.5048 4.59314C43.979 4.56464 43.4301 4.61355 42.9018 4.59314V9.52084L42.9015 9.52049ZM42.9015 19.3759H46.3276C46.5242 19.3759 47.0503 19.1412 47.2325 19.0318C48.7986 18.0893 48.7975 15.7721 47.2227 14.8356C47.0039 14.7054 46.4704 14.4816 46.2263 14.4816H42.9015V19.3755V19.3759Z" fill="#222222"/>
          <path d="M0 23.9999L7.4076 0L13.7007 0.00562925L21.0288 23.9999H14.1765L10.4979 4.52521L6.8857 23.9999H0Z" fill="#222222"/>
          <path d="M58.0569 23.9999L58.0421 16.3026L51.0361 0.00244141H57.6858L60.7234 12.3555L63.6308 0.00666334L70.3097 0.00244141V0.0699924L63.3301 16.2949L63.3227 23.9999H58.0569Z" fill="#222222"/>
        </svg>
      </h1>
      <div class="flex items-center px-6 gap-6">
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20.5714 16.2859H16.2856V20.5716H20.5714V16.2859Z" fill="#21272A"/>
            <path d="M16.2857 12.8572H12.8572V16.2857H16.2857V12.8572Z" fill="#21272A"/>
            <path d="M24.0001 20.5713H20.5715V23.9999H24.0001V20.5713Z" fill="#21272A"/>
            <path d="M23.9999 12.8572H21.4285V15.4286H23.9999V12.8572Z" fill="#21272A"/>
            <path d="M15.4286 21.4287H12.8572V24.0001H15.4286V21.4287Z" fill="#21272A"/>
            <path d="M20.5714 3.42871H16.2856V7.71443H20.5714V3.42871Z" fill="#21272A"/>
            <path d="M24 11.1429H12.8572V0H24V11.1429ZM15.2143 8.78571H21.6429V2.35714H15.2143V8.78571Z" fill="#21272A"/>
            <path d="M7.71418 3.42871H3.42847V7.71443H7.71418V3.42871Z" fill="#21272A"/>
            <path d="M11.1429 11.1429H0V0H11.1429V11.1429ZM2.35714 8.78571H8.78571V2.35714H2.35714V8.78571Z" fill="#21272A"/>
            <path d="M7.71418 16.2859H3.42847V20.5716H7.71418V16.2859Z" fill="#21272A"/>
            <path d="M11.1429 24H0V12.8572H11.1429V24ZM2.35714 21.6429H8.78571V15.2143H2.35714V21.6429Z" fill="#21272A"/>
          </svg>
        </button>
        <button>
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 30 30" fill="none">
            <path d="M15 28.125C15.9117 28.1241 16.8034 27.8576 17.5662 27.3581C18.3289 26.8587 18.9296 26.1478 19.2949 25.3125H10.7051C11.0704 26.1478 11.6711 26.8587 12.4338 27.3581C13.1966 27.8576 14.0883 28.1241 15 28.125Z" fill="#21272A"/>
            <path d="M23.4375 16.875V13.3283C23.4375 9.19922 21.8344 5.60215 17.8125 4.6875L17.3438 1.875H12.6562L12.1875 4.6875C8.15156 5.60215 6.5625 9.18516 6.5625 13.3283V16.875L3.75 20.625V23.4375H26.25V20.625L23.4375 16.875Z" fill="#21272A"/>
          </svg>
        </button>
      </div>
    </header>

    <!-- MAIN PICTURE -->
    <div class="p-4">
        <h2 class="text-lg font-medium mb-2">Box image</h2>
        <div class="flex flex-col items-center gap-2 p-4 border-2 border-dashed border-alphaDark">
            <input type="file" @change="onMainImageChange" accept="image/*" />
            <img
            v-if="mainImagePreview"
            :src="mainImagePreview"
            alt="Box main"
            class="w-32 h-32 object-cover rounded-lg"
            />
            <img
            v-else
            :src="user?.box.mainImage"
            alt="Box main"
            class="w-32 h-32 object-cover rounded-lg"
            />
        </div>
    </div>

    <!-- ITEMS INSIDE -->
    <div class="p-4">
        <h2 class="text-lg font-medium mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-auto inline mr-2" viewBox="0 0 23 23" fill="none">
                <rect width="23" height="23" fill="#222222"/>
                <path d="M3.98787 11.8882H6.69218C6.80367 12.0002 6.74295 12.1821 6.75621 12.3262C6.99526 14.9169 9.77662 16.7769 12.5021 16.1693C14.3117 15.7659 15.8317 14.3162 16.0907 12.5844C16.1187 12.3968 16.0919 12.1658 16.1208 11.9964C16.1282 11.9529 16.1473 11.9176 16.183 11.8884H18.8873C18.9126 11.9033 18.9202 11.9211 18.9256 11.9476C18.9465 12.0542 18.9353 12.3721 18.9266 12.4934C18.7103 15.4577 16.2473 18.0236 13.1657 18.7041C8.77016 19.6744 4.25499 16.6923 3.94858 12.4932C3.93966 12.3721 3.92843 12.054 3.94961 11.9474C3.95471 11.9209 3.96262 11.9031 3.98787 11.8882Z" fill="white"/>
                <path d="M5.9375 6.90069C6.09403 5.23496 8.039 4.40618 9.20848 5.48572C9.5153 5.76886 9.9375 6.42189 9.9375 6.87518V9.96174L9.90282 10H5.97218L5.9375 9.96174V6.90069Z" fill="white"/>
                <path d="M12.9375 7.96137C13.054 6.61911 14.3766 5.7394 15.4591 6.06963C16.1292 6.27403 16.9375 7.19641 16.9375 8.04237V9.9595L16.9028 10H12.9722L12.9375 9.9595V7.96137Z" fill="white"/>
            </svg>
            Items inside
        </h2>

        <div class="flex items-center justify-start overflow-x-auto gap-2 h-auto">
            <!-- Each item -->
            <div
                v-for="(item, index) in editableItems"
                :key="index"
                class="relative flex flex-col items-center justify-center p-2 border-2 border-dashed border-alphaDark aspect-square w-40 h-40 cursor-pointer"
                >
                <!-- Single Remove button → boven alles -->
                <button
                    class="absolute top-1 right-1 bg-white text-red-600 rounded-full w-6 h-6 flex items-center justify-center shadow z-20"
                    @click.stop="removeItem(index)"
                >
                    &times;
                </button>

                <!-- Hidden file input -->
                <input
                    type="file"
                    @change="onItemImageChange($event, index)"
                    accept="image/*"
                    class="absolute inset-0 opacity-0 w-full h-full cursor-pointer z-10"
                />

                <!-- Image preview or placeholder -->
                <img
                    v-if="item.imagePreview"
                    :src="item.imagePreview"
                    alt="Item preview"
                    class="w-full h-full object-cover rounded"
                />
                <img
                    v-else-if="item.image"
                    :src="item.image"
                    alt="Item"
                    class="w-full h-full object-cover rounded"
                />
                <div v-else class="text-gray-400 text-center text-sm z-0">Click to upload</div>
            </div>

            <!-- Add more card -->
            <div
            @click="addNewItem"
            class="flex flex-col w-40 h-40 items-center justify-center p-2 border-2 border-dashed border-alphaDark aspect-square cursor-pointer hover:bg-gray-50 transition"
            >
            <div class="text-4xl text-alphaDark">+</div>
            <div class="text-sm text-alphaDark mt-1">Add more</div>
            </div>
        </div>
    </div>

    <div class="p-4">
        <h2 class="text-lg font-medium mb-4 flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-auto inline mr-2" viewBox="0 0 23 23" fill="none">
                <rect width="23" height="23" fill="#222222"/>
                <path d="M3.98787 11.8882H6.69218C6.80367 12.0002 6.74295 12.1821 6.75621 12.3262C6.99526 14.9169 9.77662 16.7769 12.5021 16.1693C14.3117 15.7659 15.8317 14.3162 16.0907 12.5844C16.1187 12.3968 16.0919 12.1658 16.1208 11.9964C16.1282 11.9529 16.1473 11.9176 16.183 11.8884H18.8873C18.9126 11.9033 18.9202 11.9211 18.9256 11.9476C18.9465 12.0542 18.9353 12.3721 18.9266 12.4934C18.7103 15.4577 16.2473 18.0236 13.1657 18.7041C8.77016 19.6744 4.25499 16.6923 3.94858 12.4932C3.93966 12.3721 3.92843 12.054 3.94961 11.9474C3.95471 11.9209 3.96262 11.9031 3.98787 11.8882Z" fill="white"/>
                <path d="M5.9375 6.90069C6.09403 5.23496 8.039 4.40618 9.20848 5.48572C9.5153 5.76886 9.9375 6.42189 9.9375 6.87518V9.96174L9.90282 10H5.97218L5.9375 9.96174V6.90069Z" fill="white"/>
                <path d="M12.9375 7.96137C13.054 6.61911 14.3766 5.7394 15.4591 6.06963C16.1292 6.27403 16.9375 7.19641 16.9375 8.04237V9.9595L16.9028 10H12.9722L12.9375 9.9595V7.96137Z" fill="white"/>
            </svg>
            Description
        </h2>

        <textarea
          v-model="boxDescription"
          placeholder="Describe this box..."
          class="w-full border border-alphaDark px-3 py-2 focus:ring-2 focus:ring-alphaGreen min-h-40 resize-y"
        ></textarea>
    </div>

    <div class="p-4">
        <button @click="saveChanges" class="bg-alphaGreen p-4 w-full text-sm font-medium">Save Changes</button>
    </div>
    
</div>
<!-- </div> -->

  <!-- <div v-else class="p-4 text-center text-red-600">User not found.</div> -->
</template>

<script lang="ts" setup>

import { useRoute } from "vue-router";
import { ref, onMounted } from "vue";

const route = useRoute();
const userID = Number(route.params.id);
import type User from "../../interfaces/interface.user";

const user = ref<User | null>(null);
const users = ref<User[]>([]); // alle users om usernames en avatars op te halen
const loading = ref(true);

const mainImagePreview = ref<string | null>(null);
const editableItems = ref<Array<{ name: string; image: string; imagePreview?: string | null }>>([]);

async function fetchUser() {
  try {
    const res = await fetch("/src/assets/data/users.json");
    if (!res.ok) throw new Error("Failed to load users data");
    const data = await res.json();
    users.value = data.users;
    user.value = data.users.find((u: any) => u.id === userID) || null;
    if (user.value?.box?.items) {
      editableItems.value = user.value.box.items.map((item: any) => ({
        name: item.name,
        image: item.image,
        imagePreview: null,
      }));
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value = false;
  }
}

onMounted(() => {
  fetchUser();
});

const boxDescription = ref("");

function saveChanges() {
  if (!user.value) return;

  // Bouw het box object dat je wil opslaan
  const updatedBox = {
    mainImage: mainImagePreview.value || user.value.box.mainImage,
    items: editableItems.value.map(item => ({
      name: item.name,
      image: item.imagePreview || item.image, // als nieuwe preview → gebruik die
    })),
    description: boxDescription.value
  };

  // Save to localStorage (key bv. 'box_user_1')
  const localStorageKey = `box_user_${user.value.id}`;
  localStorage.setItem(localStorageKey, JSON.stringify(updatedBox));

  // (optioneel) Log in console → dit is wat je bv. naar backend of naar JSON zou sturen

  alert("Changes saved to localStorage!");
}

// Load possible localStorage override
const localStorageKey = `box_user_${user.value?.id}`;
const localBoxData = JSON.parse(localStorage.getItem(localStorageKey) || "null");

if (localBoxData) {
  // override main image
  mainImagePreview.value = localBoxData.mainImage !== user.value?.box.mainImage ? localBoxData.mainImage : null;

  // override items
  editableItems.value = localBoxData.items.map((item: any) => ({
    name: item.name,
    image: item.image,
    imagePreview: null
  }));

  // override description
  boxDescription.value = localBoxData.description || "";
} else {
  // fallback → standaard JSON data
  boxDescription.value = user.value?.box?.description || "";
}

function onMainImageChange(event: Event) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      mainImagePreview.value = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  }
}

function onItemImageChange(event: Event, index: number) {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files[0]) {
    const file = target.files[0];
    const reader = new FileReader();
    reader.onload = (e) => {
      if (editableItems.value[index]) {
        editableItems.value[index].imagePreview = e.target?.result as string;
      }
    };
    reader.readAsDataURL(file);
  }
}

function removeItem(index: number) {
  editableItems.value.splice(index, 1);
}

function addNewItem() {
  editableItems.value.push({
    name: "",
    image: "",
    imagePreview: null,
  });
}
</script>
