<template>
  <section class="min-h-screen">
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

    <!-- Posts -->
    <div v-for="post in posts" :key="post.id" class="p-4 border-b-[1px] border-gray-200">

      <!-- User Info -->
      <div class="flex items-center justify-between mb-6">
        <div class="flex items-center space-x-3">
          <img :src="post.user.avatar" alt="avatar" class="w-12 h-12 rounded-full mr-6" />
          <div>
            <p class="font-bold text-lg">{{ post.user.name }}</p>
            <p class="text-base font-medium text-gray-500">{{ formatTimeAgo(post.timestamp) }} <span v-if="post.location"> • {{ post.location }}</span></p>
          </div>
        </div>
        <button class="text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 30 30" fill="none">
            <path d="M15 17.8125C16.5533 17.8125 17.8125 16.5533 17.8125 15C17.8125 13.4467 16.5533 12.1875 15 12.1875C13.4467 12.1875 12.1875 13.4467 12.1875 15C12.1875 16.5533 13.4467 17.8125 15 17.8125Z" fill="#222222"/>
            <path d="M24.375 17.8125C25.9283 17.8125 27.1875 16.5533 27.1875 15C27.1875 13.4467 25.9283 12.1875 24.375 12.1875C22.8217 12.1875 21.5625 13.4467 21.5625 15C21.5625 16.5533 22.8217 17.8125 24.375 17.8125Z" fill="#222222"/>
            <path d="M5.625 17.8125C7.1783 17.8125 8.4375 16.5533 8.4375 15C8.4375 13.4467 7.1783 12.1875 5.625 12.1875C4.0717 12.1875 2.8125 13.4467 2.8125 15C2.8125 16.5533 4.0717 17.8125 5.625 17.8125Z" fill="#222222"/>
          </svg>
        </button>
      </div>

      <!-- Content -->
      <p class="mb-6">{{ post.content }}</p>

      <!-- Images -->
      <div v-if="post.images.length === 1" class="mb-6">
        <!-- TODO: Images -->
        <!-- <img :src="'/assets/posts/' + post.images[0]" alt="post image" class="w-full rounded-lg" /> -->
        <img :src="'https://images.pexels.com/photos/7585762/pexels-photo-7585762.jpeg'" alt="post image" class="h-40 w-44 object-cover" />
      </div>
      <div v-else-if="post.images.length > 1" class="grid grid-cols-2 gap-2 mb-2">
        <img v-for="img in post.images" :key="img" :src="'/assets/images/' + img" class="rounded-lg" />
      </div>

      <!-- Event box if eventId exists -->
    <router-link :to="`/post/${post.id}`" v-if="post.eventId" class="mb-2 relative">
      <span class="absolute top-4 right-4 border border-black text-black text-xs px-2 py-1">Event</span>
      <template v-if="getEventById(post.eventId)">
        <img :src="'https://images.pexels.com/photos/7585762/pexels-photo-7585762.jpeg'" alt="post image" class="h-44 w-full object-cover" />
        
        <div class="bg-purple-300 p-4">
          
          <p class="font-bold mb-1">{{ getEventById(post.eventId).title }}</p>

          <div class="my-2">
            <p class="text-sm flex items-center gap-2 mb-2">
             <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path d="M16 7.21509H0V15.9999H16V7.21509Z" fill="black"/>
              <path d="M12.8069 2.41138V0H11.2107V2.41138H4.78935V0H3.19315V2.41138H0V5.60184H16V2.41138H12.8069Z" fill="black"/>
            </svg>
              {{ getEventById(post.eventId).date }} • {{ getEventById(post.eventId).time }}
            </p>
            <p class="text-sm flex items-center gap-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M7.53625 0.00962665C8.9137 -0.0483006 9.96353 0.143329 11.1337 0.909534C13.5873 2.51615 14.3486 5.69088 13.054 8.26066C11.3915 10.8389 9.71973 13.4121 8.03847 15.9803C7.97403 16.0163 7.86641 16.0007 7.81942 15.9515L2.91629 8.41471C1.0793 4.93906 3.46821 0.180824 7.53625 0.00962665ZM5.48166 7.05953C6.52547 8.83743 9.11846 8.92823 10.2912 7.22893C11.5035 5.4717 10.3677 3.04502 8.23434 2.84055C5.93055 2.6198 4.31215 5.06715 5.48166 7.05953Z" fill="black"/>
              </svg>
              {{ getEventById(post.eventId).place }}
            </p>
          </div>
          <button class="mt-3 bg-amber-300 text-black font-medium w-full py-1.5 rounded">Learn more</button>
        </div>
      </template>
    </router-link>

      <!-- Actions -->
      <div class="flex items-center justify-between mt-2 text-sm">
        <div class="flex items-center gap-6">
          
          <!-- likes -->
          <button class="flex items-center gap-2 mb-0.5">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="24" viewBox="0 0 28 25" fill="none">
              <path d="M11.4436 23.9877L16.5567 24C19.5793 21.4085 21.967 18.968 23.4492 17.3631C25.1715 15.4981 26.3404 13.1944 26.7822 10.708C27.1995 8.36087 27.0717 5.90859 25.9183 4.12869C23.1341 -0.168074 16.9841 0.0585967 14.3474 4.3125C14.2944 4.39823 14.2338 4.48162 14.1922 4.57499C14.147 4.67658 14.0126 5.02892 14.0001 5.0618C14.0001 5.0618 13.8557 4.66777 13.8081 4.56266C13.7695 4.47751 13.7148 4.40117 13.6666 4.32248C11.037 0.0474394 4.87039 -0.18804 2.08141 4.11636C1.18365 5.50164 0.907191 7.29504 1.0261 9.12896C1.22765 12.2466 2.57428 15.1839 4.75862 17.443C6.31691 19.0543 8.70577 21.4585 11.4436 23.9877Z" stroke="#222222" stroke-width="2"/>
            </svg>
            <p>{{ post.likes.length }}</p>
          </button>

          <!-- comments -->
          <button class="flex items-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 26" fill="none">
              <path d="M23 1.5H1V17.5507H5.3048V23.5L11.7703 17.5507H23V1.5Z" stroke="#222222" stroke-width="2"/>
            </svg>
            <p v-if="post.comments.length > 0"> {{ post.comments.length }}</p>
          </button>

          <!-- saved TODO: Why do we want this-->
          <!-- <button>🔖 {{ post.bookmarks }}</button> -->
        </div>
        <div class="flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="21" viewBox="0 0 30 21" fill="none">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M0.356776 9.38611C4.42329 3.55705 9.69595 0.500488 14.9782 0.500488C21.182 0.500488 26.526 4.54205 29.6789 9.41164L29.6804 9.41393C29.8891 9.73812 30 10.1155 30 10.501C30 10.8859 29.8895 11.2626 29.6815 11.5864C26.5314 16.5187 21.2219 20.4997 14.9782 20.4997C8.66806 20.4997 3.46094 16.5269 0.31851 11.609C0.104986 11.2774 -0.00576109 10.8901 0.000230905 10.4958C0.0062378 10.1004 0.129296 9.71575 0.353855 9.39032L0.356776 9.38611ZM1.99993 10.5262L2.0027 10.5305C4.90516 15.0738 9.55713 18.4998 14.9782 18.4998C20.3386 18.4998 25.0908 15.0593 27.9968 10.5088L27.9987 10.5058C27.9996 10.5044 28.0001 10.5027 28.0001 10.501C28.0001 10.5003 28 10.4996 27.9998 10.4989C27.9996 10.4981 27.9993 10.4973 27.9988 10.4965C25.0818 5.99247 20.2907 2.50041 14.9782 2.50041C10.5195 2.50041 5.8001 5.08105 1.99993 10.5262Z" fill="#222222"/>
            <path fill-rule="evenodd" clip-rule="evenodd" d="M14.9995 6.50017C12.7905 6.50017 10.9997 8.29096 10.9997 10.5C10.9997 12.7091 12.7905 14.4998 14.9995 14.4998C17.2086 14.4998 18.9994 12.7091 18.9994 10.5C18.9994 8.29096 17.2086 6.50017 14.9995 6.50017ZM8.99976 10.5C8.99976 7.18643 11.6859 4.50024 14.9995 4.50024C18.3131 4.50024 20.9993 7.18643 20.9993 10.5C20.9993 13.8136 18.3131 16.4998 14.9995 16.4998C11.6859 16.4998 8.99976 13.8136 8.99976 10.5Z" fill="#222222"/>
          </svg>
          <p>{{ post.views }}</p>
        </div>
      </div>
    </div>

  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const posts = ref([])
const events = ref([])

async function fetchPosts() {
  const response = await fetch('/src/assets/data/posts.json')
  const data = await response.json()

  // Add mock user data + event flag → voorbeeld
  posts.value = data.posts.map(post => {
    return {
      ...post,
      user: mockUsers.find(u => u.id === post.userId) || { name: 'Unknown', avatar: '' },
      isEvent: !!post.eventDate,
      eventTitle: post.isEvent ? 'Morning crocheting with Emily' : '',
      eventDate: post.eventDate || '',
      eventTime: '5:00 PM' // mock (je kan dit uitbreiden!)
    }
  })
}

async function fetchEvents() {
  const response = await fetch('/src/assets/data/events.json')
  const data = await response.json()
  events.value = data.events
}

function formatTimeAgo(timestamp) {
  const postDate = new Date(timestamp)
  const now = new Date()
  const diffMs = now - postDate
  const diffMinutes = Math.floor(diffMs / (1000 * 60))
  const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))
  const diffWeeks = Math.floor(diffMs / (1000 * 60 * 60 * 24 * 7))

  if (diffMinutes < 1) {
    return '1 min ago'
  } else if (diffMinutes < 60) {
    return `${diffMinutes} min ago`
  } else if (diffHours < 24) {
    return `${diffHours}h ago`
  } else if (diffDays < 7) {
    return `${diffDays}d ago`
  } else {
    return `${diffWeeks}w ago`
  }
}

const mockUsers = [
  { id: 1, name: 'Jamie Parker', avatar: 'https://randomuser.me/api/portraits/men/32.jpg' },
  { id: 2, name: 'Emily Peterson', avatar: 'https://randomuser.me/api/portraits/women/45.jpg' },
  { id: 3, name: 'Iris Vale', avatar: 'https://randomuser.me/api/portraits/women/33.jpg' },
  { id: 4, name: 'Alex Smith', avatar: 'https://randomuser.me/api/portraits/men/22.jpg' }
]

onMounted(() => {
  fetchPosts()
  fetchEvents()
})

function getEventById(eventId) {
  return events.value.find(event => event.id === eventId)
}
</script>