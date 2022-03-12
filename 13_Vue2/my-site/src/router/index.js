import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { titleController } from "@/utils";

if (!window.VueRouter) {
  Vue.use(VueRouter);
}

const router = new VueRouter({
  routes,
  mode: "history",
});

export default router;

router.afterEach((to, from) => {
  if (to.meta.title) {
    titleController.setRouteTitle(to.meta.title);
  }
});
