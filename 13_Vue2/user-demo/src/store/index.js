import Vuex from "vuex";
import Vue from "vue";

import loginUser from "@/store/loginUser";
import counter from "@/store/counter";

Vue.use(Vuex);

const store = new Vuex.Store({
  modules: {
    loginUser,
    counter,
  },

  // 开启严格模式后仅允许通过mutation修改状态
  strict: true,
});

export default store;

window.store = store;
