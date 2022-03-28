import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import store from "@/store";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "hash",
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.path !== "/login") {
    const userInfo = store.state.userInfo;
    if (userInfo.appkey && userInfo.username && userInfo.role && userInfo.email) {
      return next();
    } else {
      return next("/login");
    }
  }

  return next();
});

export default router;
