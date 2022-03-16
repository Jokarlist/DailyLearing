const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      "/api": {
        target: "https://test.my-site.com",
      },
    },
  },
  // 部署该项目时若该项目只是某个大项目的一个小模块，则需要修改基地址以保证各种静态资源引用正常
  publicPath: "/news",
  configureWebpack: require("./webpack.config"),
});
