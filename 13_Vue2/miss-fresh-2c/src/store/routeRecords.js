export default {
  namespaced: true,
  state: {
    routeRecords: [],
  },
  mutations: {
    setRouteRecords(state, payload) {
      state.routeRecords = payload;
    },
  },
  actions: {
    setRouteRecords({ commit }, payload) {
      commit("setRouteRecords", payload);
    },
  },
};
