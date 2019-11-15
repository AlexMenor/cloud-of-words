import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

import Home from "./components/Home.vue";
import PutWords from "./components/PutWords.vue";
import GetCloud from "./components/GetCloud.vue";

const router = new VueRouter({
  mode: "history",
  routes: [
    { path: "/", component: Home },
    { path: "/putwords", component: PutWords },
    { path: "/getcloud", component: GetCloud }
  ]
});

export default router;
