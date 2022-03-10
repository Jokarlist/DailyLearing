import routes from "./routes";
import VueRouter from "vue-router";
import Vue from "vue";
import store from "@/store";

Vue.use(VueRouter);

const router = new VueRouter({
  routes,
  mode: "history",
});

/**
 * 每当导航触发时（包括刷新页面的第一次），该函数会执行
 * to：即将进入的目标路由对象、from：当前导航正要离开的路由
 * next：确认导航的函数，无参数调用其时会直接进入to，有参数调用其时会根据传入的参数进入新的导航
 */
router.beforeEach((to, from, next) => {
  if (to.meta.auth) {
    // 需要鉴权
    const status = store.getters["loginUser/status"];
    
    if (status === "loading") {
      // 状态为加载中
      next({
        path: "/loading",
        query: {
          desturl: to.path,
        },
      });
    } else if (status === "login") {
      // 状态为已登录
      next();
    } else {
      // 状态为未登录
      alert("此页面需要登录后方可访问，请先登录");
      next({
        path: "/login",
        query: {
          desturl: to.path,
        },
      });
    }
  } else {
    next();
  }
});

export default router;
