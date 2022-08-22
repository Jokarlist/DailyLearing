module.exports = {
  mode: "development",
  devServer: {
    open: ["list.html"],
    proxy: {
      "/api": {
        target: "http://study.yuanjin.tech/",
        changeOrigin: true,
      },
    },
  },
};
