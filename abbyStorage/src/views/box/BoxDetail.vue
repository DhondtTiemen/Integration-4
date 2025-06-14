<template>
  <div class="min-h-screen mb-16">
    <div v-if="loading" class="text-center p-4">Loading...</div>

    <div v-else v-bind="$attrs">
      <!-- Header -->
      <header class="flex items-center justify-between h-16 bg-alphaYellow">
        <h1 class="text-xl font-bold h-6 px-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="71"
            height="24"
            viewBox="0 0 71 24"
            fill="none"
          >
            <path
              d="M30.2773 24H22.0752V0.00213973L28.6757 0.000732422C33.0215 0.304008 36.09 4.4313 35.0813 8.70425C34.864 9.62534 34.436 10.4884 33.8972 11.2589C35.1133 12.206 36.0492 13.4923 36.4712 14.9882C37.6768 19.2608 34.7328 23.5771 30.3311 23.9687L30.2773 24ZM26.5983 9.52049H28.5055C28.7794 9.52049 29.3027 9.31889 29.5454 9.1764C31.097 8.26552 31.1677 6.00854 29.6671 5.0178C28.7509 4.41301 27.6403 4.63571 26.5986 4.59279V9.52049H26.5983ZM26.5983 19.3759H30.0244C30.1914 19.3759 30.7116 19.168 30.8741 19.0779C32.4809 18.1888 32.5418 15.8872 31.0109 14.8792C30.7682 14.7195 30.2073 14.4816 29.9231 14.4816H26.5983V19.3755V19.3759Z"
              fill="#222222"
            />
            <path
              d="M38.3784 24V0.00213973L44.9789 0.000732422C50.1167 0.372966 53.2024 5.98145 50.6488 10.5338C50.5813 10.6537 50.1811 11.2304 50.1895 11.2891C51.438 12.2123 52.3802 13.5743 52.7818 15.0822C53.8024 18.915 51.5361 22.7844 47.7354 23.7878L46.5467 24H38.3784ZM42.9015 9.52049H44.7749C45.7396 9.52049 46.7349 8.59659 46.9617 7.69063C47.3866 5.99271 46.1711 4.68391 44.5048 4.59314C43.979 4.56464 43.4301 4.61355 42.9018 4.59314V9.52084L42.9015 9.52049ZM42.9015 19.3759H46.3276C46.5242 19.3759 47.0503 19.1412 47.2325 19.0318C48.7986 18.0893 48.7975 15.7721 47.2227 14.8356C47.0039 14.7054 46.4704 14.4816 46.2263 14.4816H42.9015V19.3755V19.3759Z"
              fill="#222222"
            />
            <path
              d="M0 23.9999L7.4076 0L13.7007 0.00562925L21.0288 23.9999H14.1765L10.4979 4.52521L6.8857 23.9999H0Z"
              fill="#222222"
            />
            <path
              d="M58.0569 23.9999L58.0421 16.3026L51.0361 0.00244141H57.6858L60.7234 12.3555L63.6308 0.00666334L70.3097 0.00244141V0.0699924L63.3301 16.2949L63.3227 23.9999H58.0569Z"
              fill="#222222"
            />
          </svg>
        </h1>
        <div class="flex items-center px-6 gap-6">
          <button>
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
          <button>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 30 30"
              fill="none"
            >
              <path
                d="M15 28.125C15.9117 28.1241 16.8034 27.8576 17.5662 27.3581C18.3289 26.8587 18.9296 26.1478 19.2949 25.3125H10.7051C11.0704 26.1478 11.6711 26.8587 12.4338 27.3581C13.1966 27.8576 14.0883 28.1241 15 28.125Z"
                fill="#21272A"
              />
              <path
                d="M23.4375 16.875V13.3283C23.4375 9.19922 21.8344 5.60215 17.8125 4.6875L17.3438 1.875H12.6562L12.1875 4.6875C8.15156 5.60215 6.5625 9.18516 6.5625 13.3283V16.875L3.75 20.625V23.4375H26.25V20.625L23.4375 16.875Z"
                fill="#21272A"
              />
            </svg>
          </button>
        </div>
      </header>

      <div
        v-if="storedIdRaw != currentUserId"
        class="flex items-center justify-between px-4 border-b border-gray-200"
      >
        <router-link
          :to="`/account/${user?.id}`"
          class="flex gap-4 items-center py-4"
        >
          <img
            :src="user?.avatar"
            alt="Avatar"
            class="w-12 h-12 rounded-full object-cover"
          />
          <div class="flex flex-col">
            <p class="text-lg font-bold">{{ user?.name }}</p>
          </div>
        </router-link>
        <router-link
          :to="`/account/${user?.id}`"
          class="bg-alphaGreen font-medium text-sm py-2.5 px-5"
        >
          View profile
        </router-link>
      </div>

      <div
        class="flex gap-4 justify-between items-center text-sm text-gray-600 bg-white p-4"
      >
        <h2 class="text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-auto inline mr-2"
            viewBox="0 0 23 23"
            fill="none"
          >
            <rect width="23" height="23" fill="#222222" />
            <path
              d="M3.98787 11.8882H6.69218C6.80367 12.0002 6.74295 12.1821 6.75621 12.3262C6.99526 14.9169 9.77662 16.7769 12.5021 16.1693C14.3117 15.7659 15.8317 14.3162 16.0907 12.5844C16.1187 12.3968 16.0919 12.1658 16.1208 11.9964C16.1282 11.9529 16.1473 11.9176 16.183 11.8884H18.8873C18.9126 11.9033 18.9202 11.9211 18.9256 11.9476C18.9465 12.0542 18.9353 12.3721 18.9266 12.4934C18.7103 15.4577 16.2473 18.0236 13.1657 18.7041C8.77016 19.6744 4.25499 16.6923 3.94858 12.4932C3.93966 12.3721 3.92843 12.054 3.94961 11.9474C3.95471 11.9209 3.96262 11.9031 3.98787 11.8882Z"
              fill="white"
            />
            <path
              d="M5.9375 6.90069C6.09403 5.23496 8.039 4.40618 9.20848 5.48572C9.5153 5.76886 9.9375 6.42189 9.9375 6.87518V9.96174L9.90282 10H5.97218L5.9375 9.96174V6.90069Z"
              fill="white"
            />
            <path
              d="M12.9375 7.96137C13.054 6.61911 14.3766 5.7394 15.4591 6.06963C16.1292 6.27403 16.9375 7.19641 16.9375 8.04237V9.9595L16.9028 10H12.9722L12.9375 9.9595V7.96137Z"
              fill="white"
            />
          </svg>
          Box #{{ user?.box?.boxNumber }}
        </h2>
        <div class="flex items-center gap-2">
          <p class="text-right">
            <!-- Last changed: <br /> -->
            {{ formatTimeAgo(user?.box?.createdAt ?? "") }}
            <!-- {{ new Date(user?.box.createdAt ?? "").toLocaleDateString() }} -->
          </p>
        </div>
      </div>

      <div class="w-full max-w-md mx-auto px-4">
        <p class="pb-2">{{ user?.box?.description }}</p>
        <div class="aspect-square bg-gray-500 flex justify-center items-center">
          <ImageTemplate
            :path="user?.box?.mainImage"
            alt="Box main"
            class="w-24 h-24 object-cover rounded-lg"
            :screen="'boxDetail'"
          />
        </div>
      </div>

      <div
        class="flex justify-between bg-white items-center p-4 border-b border-gray-200"
      >
        <div class="flex gap-4 justify-center">
          <button class="flex items-center gap-2" @click="toggleBoxLike()">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="28"
              height="24"
              viewBox="0 0 28 25"
              fill="none"
              :class="[
                isLiking ? 'animate-like' : '',
                hasLikedBox
                  ? 'text-alphaPurple fill-alphaPurple stroke-alphaPurple'
                  : 'text-gray-600 stroke-black',
              ]"
            >
              <path
                d="M11.4436 23.9877L16.5567 24C19.5793 21.4085 21.967 18.968 23.4492 17.3631C25.1715 15.4981 26.3404 13.1944 26.7822 10.708C27.1995 8.36087 27.0717 5.90859 25.9183 4.12869C23.1341 -0.168074 16.9841 0.0585967 14.3474 4.3125C14.2944 4.39823 14.2338 4.48162 14.1922 4.57499C14.147 4.67658 14.0126 5.02892 14.0001 5.0618C14.0001 5.0618 13.8557 4.66777 13.8081 4.56266C13.7695 4.47751 13.7148 4.40117 13.6666 4.32248C11.037 0.0474394 4.87039 -0.18804 2.08141 4.11636C1.18365 5.50164 0.907191 7.29504 1.0261 9.12896C1.22765 12.2466 2.57428 15.1839 4.75862 17.443C6.31691 19.0543 8.70577 21.4585 11.4436 23.9877Z"
                stroke-width="2"
              />
            </svg>
            <p>{{ user?.box?.likes?.length ?? 0 }}</p>
          </button>
          <div class="flex items-center gap-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 26"
              fill="none"
            >
              <path
                d="M23 1.5H1V17.5507H5.3048V23.5L11.7703 17.5507H23V1.5Z"
                stroke="#222222"
                stroke-width="2"
              />
            </svg>
            <p>{{ user?.box?.comments?.length ?? 0 }}</p>
          </div>
        </div>
         
        <div class="flex items-center gap-2">
          <Eye class="w-8 h-8 text-gray-600" />
          <p>{{ user?.box?.views }}</p>
        </div>
      </div>
      <div
        class="p-4 border-b-2 border-gray-200 bg-white"
        v-if="user && !loading"
      >
        <div class="flex justify-between items-center">
          <p>{{ commentsCount }} comment{{ commentsCount !== 1 ? "s" : "" }}</p>
          <!-- <p class="text-primary-600 font-semibold">See all</p> -->
        </div>

        <div class="flex gap-4 items-center mt-4">
          <div class="w-fit flex-shrink-0">
            <img
              :src="user?.avatar"
              alt="Avatar"
              class="w-12 h-12 rounded-full object-cover"
            />
          </div>
          <form @submit.prevent="submitComment" class="relative w-full">
            <input
              v-model="newCommentText"
              class="bg-gray-100 rounded-xl px-4 py-2 pr-10 w-full focus:outline-none focus:ring-2 focus:ring-primary-500"
              name="comment"
              id="comment"
              type="text"
              placeholder="Add a comment..."
              enterkeyhint="send"
              autocomplete="off"
            />
            <button
              type="submit"
              class="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer bg-transparent border-0 p-0"
              :disabled="!newCommentText.trim()"
              aria-label="Submit comment"
            >
              <SendHorizonal class="w-6 h-6 text-gray-600" />
            </button>
          </form>
        </div>

        <div
          class="flex gap-4 items-start mt-4"
          v-for="(comment, index) in comments"
          :key="index"
        >
          <router-link :to="`/account/${comment.userId}`">
            <img
              :src="commentUsers[comment.userId]?.avatar"
              alt="User avatar"
              class="w-12 h-12 rounded-full object-cover"
            />
          </router-link>
          <div>
            <div class="flex items-baseline gap-2">
              <router-link :to="`/account/${comment.userId}`">
                <p class="font-bold">
                  @{{ commentUsers[comment.userId]?.name }}
                </p>
              </router-link>
              <p class="text-sm">{{ formatTimeAgo(comment.timestamp) }}</p>
            </div>
            <p class="text-sm">{{ comment.text }}</p>
            <div class="flex items-center gap-2 mt-2 text-sm">
              <button
                class="flex items-center gap-1"
                @click="toggleCommentLike(comment, index)"
                :aria-pressed="hasLikedComment(comment)"
                :disabled="commentLiking[index]"
                style="
                  background: none;
                  border: none;
                  padding: 0;
                  cursor: pointer;
                "
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="28"
                  height="24"
                  viewBox="0 0 28 25"
                  fill="none"
                  :class="[
                    commentLiking[index] ? 'animate-like' : '',
                    hasLikedComment(comment)
                      ? 'text-alphaPurple fill-alphaPurple stroke-alphaPurple'
                      : 'text-gray-600 stroke-black',
                  ]"
                >
                  <path
                    d="M11.4436 23.9877L16.5567 24C19.5793 21.4085 21.967 18.968 23.4492 17.3631C25.1715 15.4981 26.3404 13.1944 26.7822 10.708C27.1995 8.36087 27.0717 5.90859 25.9183 4.12869C23.1341 -0.168074 16.9841 0.0585967 14.3474 4.3125C14.2944 4.39823 14.2338 4.48162 14.1922 4.57499C14.147 4.67658 14.0126 5.02892 14.0001 5.0618C14.0001 5.0618 13.8557 4.66777 13.8081 4.56266C13.7695 4.47751 13.7148 4.40117 13.6666 4.32248C11.037 0.0474394 4.87039 -0.18804 2.08141 4.11636C1.18365 5.50164 0.907191 7.29504 1.0261 9.12896C1.22765 12.2466 2.57428 15.1839 4.75862 17.443C6.31691 19.0543 8.70577 21.4585 11.4436 23.9877Z"
                    stroke-width="2"
                  />
                </svg>
                <p>{{ comment.likes ? comment.likes.length : 0 }}</p>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div class="p-4 border-b-2 border-gray-200">
        <h2 class="text-lg font-medium mb-4">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-6 w-auto inline mr-2"
            viewBox="0 0 23 23"
            fill="none"
          >
            <rect width="23" height="23" fill="#222222" />
            <path
              d="M3.98787 11.8882H6.69218C6.80367 12.0002 6.74295 12.1821 6.75621 12.3262C6.99526 14.9169 9.77662 16.7769 12.5021 16.1693C14.3117 15.7659 15.8317 14.3162 16.0907 12.5844C16.1187 12.3968 16.0919 12.1658 16.1208 11.9964C16.1282 11.9529 16.1473 11.9176 16.183 11.8884H18.8873C18.9126 11.9033 18.9202 11.9211 18.9256 11.9476C18.9465 12.0542 18.9353 12.3721 18.9266 12.4934C18.7103 15.4577 16.2473 18.0236 13.1657 18.7041C8.77016 19.6744 4.25499 16.6923 3.94858 12.4932C3.93966 12.3721 3.92843 12.054 3.94961 11.9474C3.95471 11.9209 3.96262 11.9031 3.98787 11.8882Z"
              fill="white"
            />
            <path
              d="M5.9375 6.90069C6.09403 5.23496 8.039 4.40618 9.20848 5.48572C9.5153 5.76886 9.9375 6.42189 9.9375 6.87518V9.96174L9.90282 10H5.97218L5.9375 9.96174V6.90069Z"
              fill="white"
            />
            <path
              d="M12.9375 7.96137C13.054 6.61911 14.3766 5.7394 15.4591 6.06963C16.1292 6.27403 16.9375 7.19641 16.9375 8.04237V9.9595L16.9028 10H12.9722L12.9375 9.9595V7.96137Z"
              fill="white"
            />
          </svg>
          Items inside
        </h2>

        <div class="flex items-center justify-start overflow-y-auto gap-2">
          <div v-for="(item, index) in user?.box?.items" :key="index">
            <div class="bg-gray-300 p-4">
              <img
                :src="item.image"
                :alt="item.name"
                class="w-60 h-60 object-cover"
              />
            </div>
            <div class="p-4 bg-alphaBlue font-medium">
              <p>{{ item.name }}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- <div v-else class="p-4 text-center text-red-600">User not found.</div> -->
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import { useRoute } from "vue-router";
import {
  updateBoxLikes,
  updateBoxComments,
  preloadCommentUsers,
  toggleLikeForBoxComment,
} from "../../firebase/boxService";
import {
  Eye
} from "lucide-vue-next";
import { getUserById } from "../../firebase/userService";
import ImageTemplate from "../../components/images/ImageTemplate.vue";

const route = useRoute();
const currentUserId = route.params.id as string;
const comments = computed(() => user.value?.box?.comments ?? []);
const commentsCount = computed(() => comments.value.length);

const user = ref<any>(null);
const loading = ref(true);
const storedIdRaw = localStorage.getItem("userId");
const isLiking = ref(false);
const commentLiking = ref<{ [key: number]: boolean }>({});
const newCommentText = ref("");
const commentUsers = ref<Record<string, any>>({});

// Ophalen van de gebruiker en comments
async function fetchUser() {
  loading.value = true;
  user.value = await getUserById(currentUserId);
  loading.value = false;
  if (user.value?.box?.comments) {
    commentUsers.value = await preloadCommentUsers(user.value.box.comments);
  }
}
function formatTimeAgo(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return `${diff} seconds ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)} minutes ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)} hours ago`;
  return `${Math.floor(diff / 86400)} days ago`;
}
function hasLikedComment(comment: any) {
  return (
    storedIdRaw !== null &&
    (comment.likes || []).map(String).includes(String(storedIdRaw))
  );
}
async function toggleBoxLike() {
  if (!user.value || !storedIdRaw) return;
  const userIdStr = String(storedIdRaw);
  user.value.box.likes = user.value.box.likes || [];
  const idx = user.value.box.likes.map(String).indexOf(userIdStr);
  if (idx === -1) {
    user.value.box.likes.push(userIdStr);
  } else {
    user.value.box.likes.splice(idx, 1);
  }
  isLiking.value = true;
  setTimeout(() => {
    isLiking.value = false;
  }, 400);
  try {
    await updateBoxLikes(user.value.id, user.value.box.likes);
  } catch (err) {
    console.error("Failed to update box likes in Firestore", err);
  }
}

async function toggleCommentLike(comment: any, index: number) {
  if (!storedIdRaw || !user.value) return;
  commentLiking.value[index] = true;
  try {
    await toggleLikeForBoxComment(
      user.value.id,
      comment,
      storedIdRaw,
      user.value.box.comments
    );
  } catch (err) {
    console.error("Failed to update comment likes in Firestore", err);
  } finally {
    setTimeout(() => {
      commentLiking.value[index] = false;
    }, 400);
  }
}

async function submitComment() {
  if (!newCommentText.value.trim() || !user.value) return;
  const comment = {
    userId: String(user.value.id),
    text: newCommentText.value.trim(),
    timestamp: new Date().toISOString(),
    likes: [],
  };
  user.value.box.comments.push(comment);
  newCommentText.value = "";
  try {
    await updateBoxComments(user.value.id, user.value.box.comments);
    if (user.value?.box?.comments) {
      commentUsers.value = await preloadCommentUsers(user.value.box.comments);
    }
  } catch (err) {
    console.error("Failed to update comments in Firestore", err);
  }
}
const hasLikedBox = computed(() =>
  user.value?.box?.likes?.map(String).includes(String(storedIdRaw))
);

onMounted(fetchUser);
</script>

<style scoped>
@keyframes pop {
  0% {
    transform: scale(1);
  }

  50% {
    transform: scale(1.4);
  }

  100% {
    transform: scale(1);
  }
}

.animate-like {
  animation: pop 0.4s cubic-bezier(0.36, 1.64, 0.56, 1) both;
}
</style>
