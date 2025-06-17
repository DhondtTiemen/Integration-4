<template>
  <section class="min-h-screen mb-16">


    <header class="flex items-center justify-between h-16 bg-alphaYellow">
      <h1 class="text-xl font-bold h-6 px-6">Profile</h1>
      <div class="flex items-center px-6 gap-6">
        <IconButton label="Scanner" :to="`/scanner/${user?.id}`">
          <!-- TODO: Change SVG -->
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M20.5714 16.2859H16.2856V20.5716H20.5714V16.2859Z" fill="#21272A" />
            <path d="M16.2857 12.8572H12.8572V16.2857H16.2857V12.8572Z" fill="#21272A" />
            <path d="M24.0001 20.5713H20.5715V23.9999H24.0001V20.5713Z" fill="#21272A" />
            <path d="M23.9999 12.8572H21.4285V15.4286H23.9999V12.8572Z" fill="#21272A" />
            <path d="M15.4286 21.4287H12.8572V24.0001H15.4286V21.4287Z" fill="#21272A" />
            <path d="M20.5714 3.42871H16.2856V7.71443H20.5714V3.42871Z" fill="#21272A" />
            <path d="M24 11.1429H12.8572V0H24V11.1429ZM15.2143 8.78571H21.6429V2.35714H15.2143V8.78571Z"
              fill="#21272A" />
            <path d="M7.71418 3.42871H3.42847V7.71443H7.71418V3.42871Z" fill="#21272A" />
            <path d="M11.1429 11.1429H0V0H11.1429V11.1429ZM2.35714 8.78571H8.78571V2.35714H2.35714V8.78571Z"
              fill="#21272A" />
            <path d="M7.71418 16.2859H3.42847V20.5716H7.71418V16.2859Z" fill="#21272A" />
            <path d="M11.1429 24H0V12.8572H11.1429V24ZM2.35714 21.6429H8.78571V15.2143H2.35714V21.6429Z"
              fill="#21272A" />
          </svg>
        </IconButton>
        <LogOut v-if="storedId == user?.id" @click="logOut" />
      </div>
    </header>

    <div v-bind="$attrs">
      <div class="bg-alphaYellow">
        <div v-if="loading" class="text-center text-gray-500">Loading...</div>

        <div v-else class="mb-8">
          <div class="flex flex-col items-center justify-center">
            <ImageTemplate :path="user?.avatar" :screen="`account`" />
            <h1 class="text-2xl font-bold text-center mb-2">
              {{ user?.name }}
            </h1>
            <p class="text-center text-sm mb-4 px-6">
              {{ user?.bio }}
            </p>
            <router-link :to="`/account/${user?.id}/edit`" v-if="!accountVisit"
              class="flex items-center justify-center py-2.5 px-5 mb-4 bg-alphaGreen">
              <Pencil class="w-5 h-5 mr-2 inline-block" />
              <p class="font-medium text-sm">Edit profile</p>
            </router-link>
            <button v-else :class="[
              'flex items-center justify-center py-2.5 px-5 mb-4 font-medium text-sm transition',
              isFollowing
                ? 'border-1 '
                : 'bg-alphaGreen border-1 border-alphaGreen',
            ]" @click="toggleFollow">
              <p>
                {{ isFollowing ? "Unfollow" : "Follow" }}
              </p>
            </button>
            <div class="flex gap-4 text-sm font-medium">
              <router-link :to="`/account/${user?.id}/following`">
                <p>{{ user?.following?.length ?? 0 }} following</p>
              </router-link>
              <p>|</p>
              <router-link :to="`/account/${user?.id}/followers`">
                <p>{{ user?.followers?.length ?? 0 }} followers</p>
              </router-link>
            </div>
          </div>
        </div>

        <div class="bg-alphaLight p-4">
          <div class="pb-6 border-b-2 border-gray-200">
            <div class="flex justify-between items-center mb-4">
              <h2 class="flex items-center text-lg font-medium">
                My box
              </h2>
              <template v-if="user?.box?.boxNumber !== 0">
                <router-link v-if="accountVisit" :to="`/box/${user?.id}`"
                  class="bg-alphaGreen px-5 py-2.5 font-medium text-sm">
                  View box
                </router-link>
                <router-link v-else :to="`/box/${user?.id}/edit`" class="bg-alphaGreen px-5 py-2.5 font-medium text-sm">
                  Edit box
                </router-link>
              </template>
              <template v-else>
                <router-link :to="`/box/create`" v-if="!accountVisit"
                  class="bg-alphaGreen px-5 py-2.5 font-medium text-sm">
                  Add box
                </router-link>
              </template>
            </div>
            <div v-if="user?.box?.boxNumber !== 0">
              <router-link :to="`/box/${user?.id}`"
                class="grid grid-cols-2 border-2 border-gray-300 gap-2 w-full max-w-md mx-auto">
                <div class="aspect-square bg-gray-300 flex justify-center items-center">
                  <ImageTemplate :path="user?.box?.mainImage" alt="Box main" :screen="'boxDetail'" />
                </div>
                <div class="aspect-square bg-gray-100 flex justify-center items-center">
                  <p class="text-gray-500">All photos</p>
                </div>
              </router-link>

              <p class="pt-2">{{ user?.box?.description }}</p>
            </div>
            <div v-else>
              <p class="text-gray-500 text-center text-sm py-8">
              <p v-if="!accountVisit">You have not created a box yet.</p>
              <p v-else>This user has not created a box yet.</p>
              </p>
            </div>
          </div>

          <div class="py-6 border-b-2 border-gray-200">
            <h2 class="flex text-lg items-center font-medium mb-4">
              <svg class="h-5 w-auto inline mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 21" fill="none">
                <path
                  d="M9.75 10.5C10.7884 10.5 11.8034 10.1921 12.6667 9.61522C13.5301 9.03834 14.203 8.2184 14.6004 7.25909C14.9977 6.29978 15.1017 5.24418 14.8991 4.22578C14.6966 3.20738 14.1965 2.27192 13.4623 1.53769C12.7281 0.803466 11.7926 0.303452 10.7742 0.10088C9.75582 -0.101693 8.70022 0.00227474 7.74091 0.399635C6.7816 0.796995 5.96166 1.4699 5.38478 2.33326C4.80791 3.19662 4.5 4.21165 4.5 5.25C4.5 6.64239 5.05312 7.97775 6.03769 8.96231C7.02226 9.94688 8.35761 10.5 9.75 10.5ZM9.75 12C6.49594 12 0 14.01 0 18V21H19.5V18C19.5 14.01 13.0041 12 9.75 12Z"
                  fill="#21272A" />
              </svg>
              About me
            </h2>
            <p class="text-gray-700 text-sm">
              {{ user?.aboutMe || "This user has not provided any information about themselves." }}
            </p>
          </div>

          <div class="py-6 border-b-2 border-gray-200">
            <div class="flex justify-between">
              <h2 class="flex items-center text-lg font-medium mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-auto inline mr-2" viewBox="0 0 23 23" fill="none">
                  <rect width="23" height="23" fill="#222222" />
                  <path
                    d="M3.98787 11.8882H6.69218C6.80367 12.0002 6.74295 12.1821 6.75621 12.3262C6.99526 14.9169 9.77662 16.7769 12.5021 16.1693C14.3117 15.7659 15.8317 14.3162 16.0907 12.5844C16.1187 12.3968 16.0919 12.1658 16.1208 11.9964C16.1282 11.9529 16.1473 11.9176 16.183 11.8884H18.8873C18.9126 11.9033 18.9202 11.9211 18.9256 11.9476C18.9465 12.0542 18.9353 12.3721 18.9266 12.4934C18.7103 15.4577 16.2473 18.0236 13.1657 18.7041C8.77016 19.6744 4.25499 16.6923 3.94858 12.4932C3.93966 12.3721 3.92843 12.054 3.94961 11.9474C3.95471 11.9209 3.96262 11.9031 3.98787 11.8882Z"
                    fill="white" />
                  <path
                    d="M5.9375 6.90069C6.09403 5.23496 8.039 4.40618 9.20848 5.48572C9.5153 5.76886 9.9375 6.42189 9.9375 6.87518V9.96174L9.90282 10H5.97218L5.9375 9.96174V6.90069Z"
                    fill="white" />
                  <path
                    d="M12.9375 7.96137C13.054 6.61911 14.3766 5.7394 15.4591 6.06963C16.1292 6.27403 16.9375 7.19641 16.9375 8.04237V9.9595L16.9028 10H12.9722L12.9375 9.9595V7.96137Z"
                    fill="white" />
                </svg>
                My achievements
              </h2>
            </div>
            <div class="flex justify-center items-center mt-4 gap-8 ">
              <div class="flex flex-col items-center text-xs">

                <svg width="52" height="52" viewBox="0 0 52 52" class="fill-alphaYellow mb-2"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M41.263 6.53913C36.88 2.48071 31.0156 0 24.5717 0C11.0009 0 0 11.0009 0 24.5717C0 38.1424 11.0009 49.1433 24.5717 49.1433C25.9518 49.1433 27.3052 49.0297 28.6239 48.8106L27.4988 44.6098C25.5934 37.4974 29.6774 30.1924 36.6589 28.0465L36.6558 28.0363L41.263 26.8015V6.53913ZM9.01063 15.7658C11.5302 15.7658 13.5717 17.8083 13.5717 20.3269C13.5717 22.8455 11.5302 24.888 9.01063 24.888C6.49101 24.888 4.45054 22.8465 4.45054 20.3269C4.45054 17.8073 6.49204 15.7658 9.01063 15.7658ZM9.01063 35.893C7.01316 35.893 5.3945 34.2734 5.3945 32.2759C5.3945 30.2784 7.01316 28.6598 9.01063 28.6598C11.0081 28.6598 12.6278 30.2794 12.6278 32.2759C12.6278 34.2723 11.0081 35.893 9.01063 35.893ZM16.8592 44.0181C14.8618 44.0181 13.2431 42.3994 13.2431 40.4019C13.2431 38.4045 14.8618 36.7848 16.8592 36.7848C18.8567 36.7848 20.4764 38.4045 20.4764 40.4019C20.4764 42.3994 18.8567 44.0181 16.8592 44.0181ZM18.7154 16.0504C15.8149 16.0504 13.4642 13.6997 13.4642 10.7992C13.4642 7.89876 15.8149 5.54807 18.7154 5.54807C21.6159 5.54807 23.9666 7.89979 23.9666 10.7992C23.9666 13.6987 21.6149 16.0504 18.7154 16.0504ZM33.0253 19.343C29.6355 19.343 26.8875 16.5951 26.8875 13.2042C26.8875 9.8133 29.6355 7.0664 33.0253 7.0664C36.4152 7.0664 39.1641 9.81433 39.1641 13.2042C39.1641 16.5941 36.4162 19.343 33.0253 19.343Z" />
                  <path
                    d="M50 44.41C50 44.4428 50 44.4756 49.999 44.5083C49.9611 48.4531 47.5623 51.6341 44.6106 51.6341C44.0618 51.6341 43.5315 51.5246 43.0329 51.3188C43.3001 50.6359 43.4516 49.8578 43.4516 49.0346C43.4516 48.0477 43.2346 47.1273 42.8609 46.3563C42.8066 46.2427 42.7493 46.1331 42.6879 46.0277C42.4585 45.5363 42.3306 44.9875 42.3306 44.409C42.3306 42.9962 43.0943 41.7604 44.2328 41.0959H48.0977C49.2086 41.7461 49.9652 42.9388 49.999 44.3107C50 44.3435 50 44.3763 50 44.409V44.41Z" />
                  <path d="M47.9515 0.0488281H44.3784V38.6355H47.9515V0.0488281Z" />
                </svg>
                <p class="font-bold">Expressive drawing</p>
                <p>Completed this workshop</p>
              </div>
              <div class="flex flex-col items-center text-xs">
                <div class="relative">
                  <svg width="52" height="52" viewBox="0 0 52 52" class="fill-alphaGreen mb-2"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M41.263 6.53913C36.88 2.48071 31.0156 0 24.5717 0C11.0009 0 0 11.0009 0 24.5717C0 38.1424 11.0009 49.1433 24.5717 49.1433C25.9518 49.1433 27.3052 49.0297 28.6239 48.8106L27.4988 44.6098C25.5934 37.4974 29.6774 30.1924 36.6589 28.0465L36.6558 28.0363L41.263 26.8015V6.53913ZM9.01063 15.7658C11.5302 15.7658 13.5717 17.8083 13.5717 20.3269C13.5717 22.8455 11.5302 24.888 9.01063 24.888C6.49101 24.888 4.45054 22.8465 4.45054 20.3269C4.45054 17.8073 6.49204 15.7658 9.01063 15.7658ZM9.01063 35.893C7.01316 35.893 5.3945 34.2734 5.3945 32.2759C5.3945 30.2784 7.01316 28.6598 9.01063 28.6598C11.0081 28.6598 12.6278 30.2794 12.6278 32.2759C12.6278 34.2723 11.0081 35.893 9.01063 35.893ZM16.8592 44.0181C14.8618 44.0181 13.2431 42.3994 13.2431 40.4019C13.2431 38.4045 14.8618 36.7848 16.8592 36.7848C18.8567 36.7848 20.4764 38.4045 20.4764 40.4019C20.4764 42.3994 18.8567 44.0181 16.8592 44.0181ZM18.7154 16.0504C15.8149 16.0504 13.4642 13.6997 13.4642 10.7992C13.4642 7.89876 15.8149 5.54807 18.7154 5.54807C21.6159 5.54807 23.9666 7.89979 23.9666 10.7992C23.9666 13.6987 21.6149 16.0504 18.7154 16.0504ZM33.0253 19.343C29.6355 19.343 26.8875 16.5951 26.8875 13.2042C26.8875 9.8133 29.6355 7.0664 33.0253 7.0664C36.4152 7.0664 39.1641 9.81433 39.1641 13.2042C39.1641 16.5941 36.4162 19.343 33.0253 19.343Z" />
                    <path
                      d="M50 44.41C50 44.4428 50 44.4756 49.999 44.5083C49.9611 48.4531 47.5623 51.6341 44.6106 51.6341C44.0618 51.6341 43.5315 51.5246 43.0329 51.3188C43.3001 50.6359 43.4516 49.8578 43.4516 49.0346C43.4516 48.0477 43.2346 47.1273 42.8609 46.3563C42.8066 46.2427 42.7493 46.1331 42.6879 46.0277C42.4585 45.5363 42.3306 44.9875 42.3306 44.409C42.3306 42.9962 43.0943 41.7604 44.2328 41.0959H48.0977C49.2086 41.7461 49.9652 42.9388 49.999 44.3107C50 44.3435 50 44.3763 50 44.409V44.41Z" />
                    <path d="M47.9515 0.0488281H44.3784V38.6355H47.9515V0.0488281Z" />
                  </svg>
                  <div
                    class="absolute bg-alphaYellow h-10 w-10 text-alphaBlack font-bold rounded-full -right-5 -top-5 text-[14px] flex items-center justify-center">
                    <p>2/5</p>
                  </div>
                </div>
                <p class="font-bold">Joined workshops</p>
                <p>Attend 3 more events</p>
              </div>


            </div>
            <!-- <p v-if="posts.length === 0" class="text-gray-500 text-sm text-center mb-4">
              No badges yet.
            </p>
            <div v-else class="flex gap-2">
              <div v-for="(badge, index) in user?.achievements" :key="index">
                <img :src="badge" alt="badge" class="w-10 h-10 object-contain" />
              </div>
            </div> -->
          </div>

          <div class="py-6 border-b-2 border-gray-200">
            <h2 class="flex items-center text-lg font-medium">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-auto inline mr-2" viewBox="0 0 23 23" fill="none">
                <rect width="23" height="23" fill="#222222" />
                <path
                  d="M3.98787 11.8882H6.69218C6.80367 12.0002 6.74295 12.1821 6.75621 12.3262C6.99526 14.9169 9.77662 16.7769 12.5021 16.1693C14.3117 15.7659 15.8317 14.3162 16.0907 12.5844C16.1187 12.3968 16.0919 12.1658 16.1208 11.9964C16.1282 11.9529 16.1473 11.9176 16.183 11.8884H18.8873C18.9126 11.9033 18.9202 11.9211 18.9256 11.9476C18.9465 12.0542 18.9353 12.3721 18.9266 12.4934C18.7103 15.4577 16.2473 18.0236 13.1657 18.7041C8.77016 19.6744 4.25499 16.6923 3.94858 12.4932C3.93966 12.3721 3.92843 12.054 3.94961 11.9474C3.95471 11.9209 3.96262 11.9031 3.98787 11.8882Z"
                  fill="white" />
                <path
                  d="M5.9375 6.90069C6.09403 5.23496 8.039 4.40618 9.20848 5.48572C9.5153 5.76886 9.9375 6.42189 9.9375 6.87518V9.96174L9.90282 10H5.97218L5.9375 9.96174V6.90069Z"
                  fill="white" />
                <path
                  d="M12.9375 7.96137C13.054 6.61911 14.3766 5.7394 15.4591 6.06963C16.1292 6.27403 16.9375 7.19641 16.9375 8.04237V9.9595L16.9028 10H12.9722L12.9375 9.9595V7.96137Z"
                  fill="white" />
              </svg>
              Upcoming events
            </h2>
            <div class="flex justify-center gap-8 items-center mb-4 px-4 pt-2  relative">
              <span :class="[
                'cursor-pointer px-4 py-2 font-medium transition',
                filter === 'Past'
                  ? 'bg-alphaGreen border-1 border-alphaGreen'
                  : 'text-alphaDark border border-alphaDark hover:bg-alphaLight',
              ]" @click="filter = 'Past'" style="min-width: 80px; text-align: center">Past</span>
              <span :class="[
                'cursor-pointer px-4 py-2 font-medium transition',
                filter === 'Attending'
                  ? 'bg-alphaGreen border-1 border-alphaGreen'
                  : 'text-alphaDark border border-alphaDark hover:bg-alphaLight',
              ]" @click="filter = 'Attending'" style="min-width: 80px; text-align: center">Attending</span>
            </div>
            <div v-if="filteredEvents.length" class="space-y-4">
              <router-link :to="`/event/${event.id}`" v-for="event in filteredEvents" :key="event.id"
                class="flex items-center gap-4">
                <ImageTemplate v-if="event.image" :path="`${event.image}`" alt="Event" :screen="'eventThumbnail'" />
                <div class="flex flex-col">
                  <p class="text-sm font-medium text-gray-900">
                    {{ event.title }}
                  </p>
                  <p class="text-gray-600 text-xs italic">
                    {{ event.type }} –
                    {{
                      new Date(event.date).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })
                    }}
                  </p>
                  <p v-if="event.status == 'Pending'" class="text-alphaRed font-bold text-xs">{{ event.status }}</p>
                </div>
              </router-link>
            </div>
            <div v-else class="text-gray-500 text-sm text-center mb-4">
              <span v-if="filter === 'Attending'">No upcoming events to attend.</span>
              <span v-else>No past events found.</span>
            </div>
          </div>

          <div class="py-6">
            <h2 class="flex items-center text-lg font-medium mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-auto inline mr-2" viewBox="0 0 23 23" fill="none">
                <rect width="23" height="23" fill="#222222" />
                <path
                  d="M3.98787 11.8882H6.69218C6.80367 12.0002 6.74295 12.1821 6.75621 12.3262C6.99526 14.9169 9.77662 16.7769 12.5021 16.1693C14.3117 15.7659 15.8317 14.3162 16.0907 12.5844C16.1187 12.3968 16.0919 12.1658 16.1208 11.9964C16.1282 11.9529 16.1473 11.9176 16.183 11.8884H18.8873C18.9126 11.9033 18.9202 11.9211 18.9256 11.9476C18.9465 12.0542 18.9353 12.3721 18.9266 12.4934C18.7103 15.4577 16.2473 18.0236 13.1657 18.7041C8.77016 19.6744 4.25499 16.6923 3.94858 12.4932C3.93966 12.3721 3.92843 12.054 3.94961 11.9474C3.95471 11.9209 3.96262 11.9031 3.98787 11.8882Z"
                  fill="white" />
                <path
                  d="M5.9375 6.90069C6.09403 5.23496 8.039 4.40618 9.20848 5.48572C9.5153 5.76886 9.9375 6.42189 9.9375 6.87518V9.96174L9.90282 10H5.97218L5.9375 9.96174V6.90069Z"
                  fill="white" />
                <path
                  d="M12.9375 7.96137C13.054 6.61911 14.3766 5.7394 15.4591 6.06963C16.1292 6.27403 16.9375 7.19641 16.9375 8.04237V9.9595L16.9028 10H12.9722L12.9375 9.9595V7.96137Z"
                  fill="white" />
              </svg>
              My posts
            </h2>

            <div>
              <p v-if="posts.length === 0" class="text-gray-500 text-sm text-center mb-4">
                No posts yet.
              </p>

              <div v-else class="grid grid-cols-3 gap-2 justify-center">
                <router-link :to="`/post/${post?.id}`" v-for="post in posts.slice(0, 5)" :key="post.id"
                  class="bg-gray-100 h-28 w-28 flex justify-center items-center overflow-hidden">
                  <ImageTemplate v-if="post.images?.length" :path="post.images[0]" alt="Post image"
                    screen="postImage" />
                  <Image v-else class="w-10 h-10 text-gray-400" />
                </router-link>

                <div v-if="posts.length > 5" class="bg-gray-100 h-28 w-28 flex justify-center items-center">
                  <p class="text-gray-500 text-xs text-center">
                    +{{ posts.length - 5 }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </section>
</template>

<script setup lang="ts">
import {
  Pencil,
  Image,
  LogOut,
} from "lucide-vue-next";
import { onMounted, ref, computed, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import type User from "../../interfaces/interface.user";
import type Event from "../../interfaces/interface.event";
import type Post from "../../interfaces/interface.post";
import ImageTemplate from "/src/components/images/ImageTemplate.vue";
import IconButton from "../../components/generic/IconButton.vue";
// DATABASE
import db from "../../firebase/firebase.ts";
import {
  collection,
  doc,
  query,
  getDocs,
  where,
  getDoc,
  updateDoc,
} from "firebase/firestore";
import { getUserById } from "../../firebase/userService";
const loading = ref(true);

// const showPopup = ref(false);
const user = ref<User | null>(null);
const posts = ref<Post[]>([]);
const events = ref<Event[]>([]);
const route = useRoute();
const router = useRouter();
const filter = ref<'Attending' | 'Past'>('Attending');
function logOut() {
  localStorage.setItem("userId", "");
  router.push("/register");
}

const filteredEvents = computed(() => {
  const now = new Date();
  if (filter.value === 'Attending') {
    const organised = events.value.filter(
      (event) =>
        event.type === 'Organised' &&
        new Date(event.date) >= now
    );
    const organisedIds = new Set(organised.map(e => e.id));
    const attend = events.value.filter(
      (event) =>
        event.type === 'Attending' &&
        new Date(event.date) >= now &&
        !organisedIds.has(event.id)
    );
    return [...organised, ...attend];
  } else {
    return events.value.filter(
      (event) =>
        event.type === 'Attended' &&
        new Date(event.date) < now
    );
  }
});

async function refreshUser(id: string) {
  if (id) {
    user.value = await getUserById(id);
    console.log("User data:", user.value);
  }
}
async function getPostsById(userId: string) {
  try {
    const q = query(collection(db, "posts"), where("userId", "==", userId));
    const querySnapshot = await getDocs(q);

    const postList: Post[] = [];
    querySnapshot.forEach((doc) => {
      postList.push({ id: doc.id, ...doc.data() } as Post);
    });
    posts.value = postList;
    return postList;
  } catch (error) {
    console.error("Error fetching posts data:", error);
    posts.value = [];
    return null;
  } finally {
    loading.value = false;
  }
}
async function getEventsById(userId: string) {
  try {
    const now = new Date();

    const createdQuery = query(
      collection(db, "events"),
      where("createdBy", "==", userId)
    );
    const createdSnap = await getDocs(createdQuery);
    const created = createdSnap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      type: "Organised",
    }));

    const attendedQuery = query(
      collection(db, "events"),
      where("participants", "array-contains", userId)
    );
    const attendedSnap = await getDocs(attendedQuery);

    const attended: any = [];
    const attend: any = [];

    attendedSnap.docs.forEach((doc) => {
      const data = doc.data();
      const eventDate = new Date(data.date);
      if (eventDate < now) {
        attended.push({
          id: doc.id,
          ...data,
          type: "Attended",
        });
      } else {
        attend.push({
          id: doc.id,
          ...data,
          type: "Attending",
        });
      }
    });
    events.value = [...attend, ...created, ...attended];
    return events.value;
  } catch (error) {
    console.error("Error fetching events data:", error);
    events.value = [];
    return null;
  } finally {
    loading.value = false;
  }
}


const loggedInUser = ref<User | null>(null);
const storedId = localStorage.getItem("userId");
async function getLoggedInUser() {
  if (!storedId) return;
  const userRef = doc(db, "users", storedId);
  const docSnap = await getDoc(userRef);
  if (docSnap.exists()) {
    loggedInUser.value = { id: docSnap.id, ...docSnap.data() } as User;
  }
}
const isFollowing = computed(() => {
  if (!loggedInUser.value || !user.value) return false;
  return (loggedInUser.value.following || [])
    .map(String)
    .includes(String(user.value.id));
});

async function toggleFollow() {
  if (!loggedInUser.value || !user.value) return;

  const following = (loggedInUser.value.following || []).map(String);
  const followers = (user.value.followers || []).map(String);
  const profileId = String(user.value.id);
  const myId = String(loggedInUser.value.id);

  const idx = following.indexOf(profileId);

  if (idx === -1) {
    following.push(profileId);
    followers.push(myId);
  } else {
    following.splice(idx, 1);
    const followerIdx = followers.indexOf(myId);
    if (followerIdx !== -1) followers.splice(followerIdx, 1);
  }

  loggedInUser.value = { ...loggedInUser.value, following: [...following] };
  user.value = { ...user.value, followers: [...followers] };

  try {
    const userRef = doc(db, "users", myId);
    await updateDoc(userRef, {
      following: following,
    });
    const profileRef = doc(db, "users", profileId);
    await updateDoc(profileRef, {
      followers: followers,
    });
  } catch (err) {
    console.error("Failed to update likes in Firestore", err);
  }
}
const accountVisit = computed(() => {
  const storedId = localStorage.getItem("userId");
  const currentUserId = route.params.id as string;
  return storedId !== currentUserId;
});
onMounted(() => {
  // const storedId = localStorage.getItem("userId");
  
  const currentUserId = route.params.id as string;
  getLoggedInUser();
  refreshUser(currentUserId);
  getPostsById(currentUserId);
  getEventsById(currentUserId);
});
watch(
  () => route.params.id,
  () => {
    const userId = Array.isArray(route.params.id)
      ? route.params.id[0]
      : route.params.id;
    refreshUser(userId);
    getPostsById(userId);
    getEventsById(userId);
    getLoggedInUser();
  }
);

const userId = ref("");

onMounted(() => {
  const id = localStorage.getItem("userId");
  if (id) userId.value = id;
});
</script>
