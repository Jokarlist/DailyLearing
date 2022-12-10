import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    a: 1,
  },
  getters: {},
  mutations: {
    commitMutation(state, payload) {
      state.a += 1;
    },
  },
  actions: {
    dispatchAction(ctx) {
      this.state.a = this.state.a + 1;
    }
  },
  modules: {},
});
