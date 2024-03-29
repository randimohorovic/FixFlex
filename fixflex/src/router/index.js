import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    path: "/login",
    name: "login",

    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Login.vue"),
  },

  {
    path: "/signup",
    name: "signup",
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Signup.vue"),
  },
  {
    path: "/edit-profile",
    name: "EditProfile",
    // Lazy load UserProfileEdit view
    component: () =>
      import(
        /* webpackChunkName: "editProfile" */ "../views/UserProfileEdit.vue"
      ),
  },

  // new route
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
