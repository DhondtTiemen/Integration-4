import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../components/holders/AppHolder.vue"),
    children: [
      // --- HOME ---
      {
        path: "",
        component: () => import('../views/Overview.vue'),
      },

      // --- USER ---
      {
        path: "account/:id",
        component: () => import("../views/user/Account.vue"),
      },
      {
        path: "scanner/:id",
        component: () => import("../views/user/Scanner.vue"),
      },
      {
        path: "scanner/scan",
        component: () => import("../views/user/Scan.vue"),
      },
      {
        path: "account/:id/following",
        component: () => import("../views/user/Following.vue"),
      },
      {
        path: "account/:id/followers",
        component: () => import("../views/user/Followers.vue"),
      },
      // TODO
      {
        path: "account/:id/edit",
        component: () => import("../views/user/EditAccount.vue"),
      },
      {
        path: "login",
        component: () => import("../views/LoginView.vue"),
      },
      {
        path: "register",
        component: () => import("../views/user/RegisterForm.vue"),
      },
      {
        path: "chat/:userId",
        component: () => import("../views/Chat.vue"),
      },

      // --- BOX ---
      {
        path: "box/create",
        component: () => import("../views/box/CreateBox.vue"),
      },
      {
        path: "box/:id",
        component: () => import("../views/box/BoxDetail.vue"),
      },
      {
        path: "box/:id/edit",
        component: () => import("../views/box/EditBox.vue"),
      },

      // --- POST ---
      {
        path: "post/create",
        component: () => import("../views/post/CreatePost.vue"),
      },
      {
        path: "post/:id",
        component: () => import("../views/post/PostDetail.vue"),
      },
      // {
      //   path: "post/:id/edit",
      //   component: () => import("../views/EditPost.vue"),
      // },

      // --- EVENT ---
      {
        path: "event/create",
        component: () => import("../views/event/CreateEvent.vue"),
      },
      {
        path: "events",
        component: () => import("../views/event/Events.vue"),
      },
      {
        path: "event/:id",
        component: () => import("../views/event/EventDetail.vue"),
      },
      {
        path: "event/:id/participants",
        component: () => import("../views/event/EventParticipants.vue"),
      },
      {
        path: "search",
        component: () => import("../views/search/Search.vue"),
      },
      // {
      //   path: "event/:id/edit",
      //   component: () => import("../views/event/EditEvent.vue"),
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
