import { getSettings } from "@/api/setting";
import { titleController } from "@/utils";

export default {
  namespaced: true,
  state: {
    loading: false,
    data: null,
  },
  mutations: {
    setLoading(state, payload) {
      state.loading = payload;
    },
    setData(state, payload) {
      state.data = payload;
    },
  },
  actions: {
    async fetchSetting(ctx) {
      ctx.commit("setLoading", true);
      const res = await getSettings();
      ctx.commit("setData", res);
      ctx.commit("setLoading", false);

      // 给页面标题加入小图标
      if (res.favicon) {
        // <link rel="shortcut icon" type="images/x-icon" href="./favicon.ico">
        let link = document.querySelector("link[rel='icon']");
        if (link) {
          return;
        }

        link = document.createElement("link");
        link.rel = "icon";
        link.type = "images/x-icon";
        link.href = res.favicon;
        document.head.appendChild(link);
      }

      if (res.siteTitle) {
        titleController.setSiteTitle(res.siteTitle);
      }
    },
  },
};
