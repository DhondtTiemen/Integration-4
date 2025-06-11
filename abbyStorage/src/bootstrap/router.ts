import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../components/holders/AppHolder.vue"),
    children: [
      // --- HOME ---
      {
        path: "",
        component: () => import("../screens/Overview.vue"),
      },

      // --- USER ---
      {
        path: "account/:id",
        component: () => import("../screens/user/Account.vue"),
      },
      {
        path: "account/:id/following",
        component: () => import("../screens/user/Following.vue"),
      },
      {
        path: "account/:id/followers",
        component: () => import("../screens/user/Followers.vue"),
      },
      // TODO
      // {
      //   path: "account/:id/edit",
      //   component: () => import("../screens/EditAccount.vue"),
      // },
      {
        path: "login",
        component: () => import("../screens/user/LoginForm.vue"),
      },
      {
        path: "register",
        component: () => import("../screens/user/RegisterForm.vue"),
      },

      // --- BOX ---
      {
        path: "box/create",
        component: () => import("../screens/box/CreateBox.vue"),
      },
      {
        path: "box/:id",
        component: () => import("../screens/box/BoxDetail.vue"),
      },
      {
        path: "box/:id/edit",
        component: () => import("../screens/box/EditBox.vue"),
      },

      // --- POST ---
      {
        path: "post/create",
        component: () => import("../screens/post/CreatePost.vue"),
      },
      {
        path: "post/:id",
        component: () => import("../screens/post/PostDetail.vue"),
      },
      // {
      //   path: "post/:id/edit",
      //   component: () => import("../screens/EditPost.vue"),
      // },

      // --- EVENT ---
      {
        path: "event/create",
        component: () => import("../screens/event/CreateEvent.vue"),
      },
      {
        path: "events",
        component: () => import("../screens/event/Events.vue"),
      },
      {
        path: "event/:id",
        component: () => import("../screens/event/EventDetail.vue"),
      },
      {
        path: "event/:id/participants",
        component: () => import("../screens/event/EventParticipants.vue"),
      },
      {
        path: "search",
        component: () => import("../screens/search/Search.vue"),
      },
      // {
      //   path: "event/:id/edit",
      //   component: () => import("../screens/event/EditEvent.vue"),
      // },

      // --- SKIP ---
      {
        path: "messages",
        component: () => import("../components/Messages.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
