import { defineAsyncComponent, h } from "vue";
import Loading from "../components/Loading.vue";
import Error from "../components/Error.vue";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

NProgress.configure({
  trickleSpeed: 50,
  showSpinner: false,
});

export function delay(duration) {
  if (!duration) {
    duration = getRandom(1000, 5000);
  }

  return new Promise((resolve) => {
    setTimeout(() => {
      resolve();
    }, duration);
  });
}

export function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export function getAsyncComponent(path) {
  return defineAsyncComponent({
    loader: async () => {
      await delay();
      if (Math.random() < 0.5) {
        throw new TypeError();
      }

      return import(/* @vite-ignore */ path);
    },
    loadingComponent: Loading,
    errorComponent: {
      render() {
        return h(Error, "组件加载错误");
      },
    },
  });
}

export function getAsyncPage(path) {
  return defineAsyncComponent({
    loader: async () => {
      NProgress.start();
      await delay();
      const comp = import(/* @vite-ignore */ path);
      NProgress.done();

      return comp;
    },
    loadingComponent: Loading,
  });
}
