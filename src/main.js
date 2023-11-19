import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import io from "socket.io-client";
import { socketURL } from "@/api/api-settings";
const socketOptions = {
  autoConnect: false,
};
console.log("socketURL", socketURL);
const socket = io(socketURL, socketOptions);

Vue.prototype.$socket = socket;

Vue.use(ElementUI);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
