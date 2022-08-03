import { createRouter, createWebHashHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "home",
    component: () => import("../components/Home/index.vue"),
  },
  {
    path: "/formWave",
    name: "formWave",
    component: () => import("../components/FormWave/index.vue"),
  },
  {
    path: "/eventKeycodes",
    name: "eventKeycodes",
    component: () => import("../components/EventKeycodes/index.vue"),
  },
  {
    path: "/randomChoicePicker",
    name: "randomChoicePicker",
    component: () => import("../components/RandomChoicePicker/index.vue"),
  },
  {
    path: "/drinkWater",
    name: "drinkWater",
    component: () => import("../components/DrinkWater/index.vue"),
  },
  {
    path: "/themeClock",
    name: "themeClock",
    component: () => import("../components/ThemeClock/index.vue"),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
