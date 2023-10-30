import Vue from "vue";
import VueRouter from "vue-router";
import HomeView from "@/views/home/HomeView.vue";
import MobileSignature from "@/views/home/MobileSignature";
import WindowQRcode from "@/views/home/WindowQRcode";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: HomeView,
  },
  {
    name: "windowQRcode",
    path: "/window/qrcode/:id?",
    component: WindowQRcode,
  },
  {
    name: "mobileSignature",
    path: "/mobile/signature/:id?/:connect?",
    component: MobileSignature,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
