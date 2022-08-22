const baseConfig = require("./webpack.base");
const devConfig = require("./webpack.dev");
const prodConfig = require("./webpack.prod");

module.exports = function (env) {
  if (env && env.prod) {
    const config = {
      ...baseConfig,
      ...prodConfig,
    };

    config.plugins = [...baseConfig.plugins, ...prodConfig.plugins];

    return config;
  } else {
    return {
      ...baseConfig,
      ...devConfig,
    };
  }
};
