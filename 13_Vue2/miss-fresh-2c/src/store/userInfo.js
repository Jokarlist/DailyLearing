import { setUserCookies, getUserCookies, removeUserCookies } from "@/utils";

export default {
  namespaced: true,
  state: getUserCookies(),
  mutations: {
    setUserInfo(state, { appkey, email, role, username }) {
      state.appkey = appkey;
      state.email = email;
      state.role = role;
      state.username = username;
    },
    clearUserInfo(state) {
      state.appkey = "";
      state.email = "";
      state.role = "";
      state.username = "";
    },
  },
  actions: {
    login({ commit }, payload) {
      commit("setUserInfo", payload);
      setUserCookies(payload);
    },
    logout({ commit }) {
      commit("clearUserInfo");
      removeUserCookies();
    },
  },
};
