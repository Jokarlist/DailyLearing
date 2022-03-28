import Vue from "vue";
import VueRouter from "vue-router";
import { routes, appendRoutes } from "./routes";
import store from "@/store";
import { routeFilter } from "@/utils";

Vue.use(VueRouter);

const router = new VueRouter({
  mode: "hash",
  routes,
});

let isAppend = false;
router.beforeEach((to, from, next) => {
  if (to.path !== "/login") {
    const userInfo = store.state.userInfo;
    if (userInfo.appkey && userInfo.username && userInfo.role) {
      if (!isAppend) {
        const filteredRoutes = routeFilter(userInfo.role, appendRoutes);
        router.addRoutes(filteredRoutes);
        store.commit(
          "routeRecords/setRouteRecords",
          routes.concat(filteredRoutes)
        );
        isAppend = true;
      }
      return next();
    }

    return next("/login");
  }

  return next();
});

export default router;
