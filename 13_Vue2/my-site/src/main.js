import Vue from "vue";
import App from "./App";
import router from "@/router";
import store from "@/store";

import "./styles/global.less";

import { showMessage } from "@/utils";
import "./mock";
import "./eventBus";

import vLoading from "@/directives/loading";
import vLazy from "@/directives/lazy";

Vue.prototype.$showMessage = showMessage;

Vue.directive("loading", vLoading);
Vue.directive("lazy", vLazy);

store.dispatch("setting/fetchSetting");

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
