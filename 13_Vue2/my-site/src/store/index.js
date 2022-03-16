import { install, Store } from "vuex";
import Vue from "vue";
import banner from "./banner";
import setting from "./setting";
import about from "./about";
import project from "./project";

// 若是用CDN引入相关模块则会在全局暴露一个变量，因此可以用来判断是否是CDN引入方式
if (!window.Vuex) {
  install(Vue);
}

export default new Store({
  modules: {
    banner,
    setting,
    about,
    project,
  },
  strict: true,
});
