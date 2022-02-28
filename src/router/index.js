import { createRouter, createWebHistory } from "vue-router";
import { useAuthStore } from "../store/useAuth";
import HomeView from "../views/HomeView.vue";
import PinView from "../views/PinView.vue";

const redirectToHomeOnLoggedIn = (to, from, next) => {
  if (useAuthStore().loggedIn) next({ name: "index" });
  else next();
};

const routes = [
  {
    path: "/",
    name: "index",
    component: HomeView,
    meta: { layout: "default" },
  },
  {
    path: "/pin",
    name: "pin",
    component: PinView,
    meta: { layout: "default" },
  },
  // {
  //   path: "/accounts/login",
  //   name: "accounts-login",
  //   component: () => import("~~/accounts/login"),
  //   beforeEnter: redirectToHomeOnLoggedIn,
  // },
  // {
  //   path: "/accounts/reset",
  //   name: "accounts-reset",
  //   component: () => import("~~/accounts/reset"),
  //   beforeEnter: (to, from, next) => {
  //     if (useAuthStore().loggedIn) next({ name: "index" });
  //     else if (!to.query.email || !to.query.token)
  //       next({ name: "accounts-login" });
  //     else next();
  //   },
  // },
  // {
  //   path: "/accounts/forgot",
  //   name: "accounts-forgot",
  //   component: () => import("~~/accounts/forgot"),
  //   beforeEnter: redirectToHomeOnLoggedIn,
  // },
  // {
  //   path: "/accounts/register",
  //   name: "accounts-register",
  //   component: () => import("~~/accounts/register"),
  //   beforeEnter: redirectToHomeOnLoggedIn,
  // },
  // {
  //   path: "/accounts/logout",
  //   name: "accounts-logout",
  //   component: () => import("~~/accounts/logout"),
  //   meta: { requireAuth: true },
  // },
  // {
  //   path: "/:pathMatch(.*)*",
  //   component: () => import("~~/404.vue"),
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.meta.requireAuth && !useAuthStore().loggedIn)
    next({ name: "accounts-login" });
  else next();
});

export default router;
