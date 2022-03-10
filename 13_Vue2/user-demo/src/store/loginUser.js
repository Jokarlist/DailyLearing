import * as userApi from "@/api/user";

export default {
  namespaced: true,
  state: {
    loading: false,
    user: null,
  },
  getters: {
    status(state) {
      if (state.loading) {
        // 正在登录
        return "loading";
      } else if (state.user) {
        // 已登录
        return "login";
      } else {
        // 未登录
        return "logout";
      }
    },
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setUser(state, payload) {
      state.user = payload;
    },
  },
  actions: {
    async login(context, payload) {
      context.commit("setLoading", true);
      const res = await userApi.login(payload.loginId, payload.loginPwd);
      context.commit("setUser", res);
      context.commit("setLoading", false);

      return res;
    },
    async logout(ctx) {
      ctx.commit("setLoading", true);
      await userApi.logout();
      ctx.commit("setUser", null);
      ctx.commit("setLoading", false);
    },
    async whoAmI(ctx) {
      ctx.commit("setLoading", true);
      const res = await userApi.whoAmI();
      ctx.commit("setUser", res);
      ctx.commit("setLoading", false);

      return res;
    },
  },
};
