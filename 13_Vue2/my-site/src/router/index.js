import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { titleController } from "@/utils";

// 若是用CDN引入相关模块则会在全局暴露一个变量，因此可以用来判断是否是CDN引入方式
if (!window.VueRouter) {
  Vue.use(VueRouter);
}

const router = new VueRouter({
  routes,
  mode: "history",
  // 设置路由基地址
  base: process.env.BASE_URL,
});

export default router;

router.afterEach((to, from) => {
  if (to.meta.title) {
    titleController.setRouteTitle(to.meta.title);
  }
});
