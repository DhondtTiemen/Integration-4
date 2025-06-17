import { createRouter, createWebHashHistory } from "vue-router";

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

      // --- SKIP ---
      {
        path: "messages",
        component: () => import("../components/Messages.vue"),
      },
      {
        path: "/:pathMatch(.*)*",
        name: "NotFound",
        component: () => import("../views/NotFound.vue"),
      },
      {
        path: "onboarding/1",
        component: () => import("../views/onboarding/ExploreShelves.vue"),
      },
      {
        path: "onboarding/2",
        component: () => import("../views/onboarding/ExpressYourself.vue"),
      },
      {
        path: "onboarding/3",
        component: () => import("../views/onboarding/Connect.vue"),
      }
    ],
  },
];

const router = createRouter({
  history: createWebHashHistory('/Integration-4/'),
  routes,
});

export default router;
