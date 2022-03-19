import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  server: {
    proxy: {
      "/api": {
        target:
          "http://127.0.0.1:5500/%E5%BD%95%E6%92%AD%E8%AF%BE/14_Vue3/test-composition-api-data/",
        rewrite: (path) => path.replace(/^\/api\//, ""),
      },
    },
  },
});
