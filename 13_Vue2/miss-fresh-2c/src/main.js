import Vue from "vue";
import App from "./App.vue";
import "./plugins/ant-design-vue.js";
import "./plugins/v-charts";
import router from "./router";
import store from "./store";
import "./styles/global.less";

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
  router,
  store,
}).$mount("#app");
