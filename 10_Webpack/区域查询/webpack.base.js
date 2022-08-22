const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: {
    detail: "./src/detail/index.js",
    list: "./src/list/index.js",
  },
  output: {
    filename: "scripts/[name].[chunkhash:5].js",
    path: path.resolve(__dirname, "dist"),
  },
  stats: {
    colors: true,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/page/list.html",
      filename: "page/list.html",
      chunks: ["list"],
    }),
    new HtmlWebpackPlugin({
      template: "./public/page/detail.html",
      filename: "page/detail.html",
      chunks: ["detail"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: "./public/img",
          to: "img",
        },
        {
          from: "./public/style",
          to: "style",
        },
      ],
    }),
  ],
};
