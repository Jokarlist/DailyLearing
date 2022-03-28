import Vue from "vue";
import { install, Store } from "vuex";

install(Vue);

export default new Store({
  state: {
    // 用于切换menu的展开状态，true代表折叠，false代表展开
    collapsed: false,
  },
  mutations: {
    setCollapsed(state) {
      state.collapsed = !state.collapsed;
    },
  },
  actions: {
    toggleCollapsed({ commit }) {
      commit("setCollapsed");
    },
  },
  strict: true,
  modules: {},
});
