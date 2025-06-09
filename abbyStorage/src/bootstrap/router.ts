import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    component: () => import("../components/holders/AppHolder.vue"),
    children: [
      {
        path: "",
        component: () => import("../components/Overview.vue"),
      },
      {
        path: "account/:id",
        component: () => import("../screens/Account.vue"),
      },
      {
        path: "login",
        component: () => import("../components/LoginForm.vue"),
      },
      {
        path: "messages",
        component: () => import("../components/Messages.vue"),
      },
      {
        path: "register",
        component: () => import("../components/RegisterForm.vue"),
      },
      {
        path: "box/:id",
        component: () => import("../screens/BoxDetail.vue"),
      },
      {
        path: "post/:id",
        component: () => import("../screens/PostDetail.vue"),
      },
      {
        path: "event/:id",
        component: () => import("../screens/event/EventDetail.vue"),
      },
      {
        path: "event/create",
        component: () => import("../screens/event/CreateEvent.vue"),
      },
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
