const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  mode: "development",
  entry: {
    main: "./src/index.js",
  },
  output: {
    filename: "scripts/[name].[chunkhash:5].js",
    path: path.resolve(__dirname, "dist"),
    // publicPath: "/",
  },
  module: {
    rules: [
      {
        test: /\.pcss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: {
              modules: true,
            },
          },
          "postcss-loader",
        ],
      },
      {
        test: /\.jpg$/,
        use: {
          loader: "file-loader",
          options: {
            name: "img/[hash:5].[ext]",
          },
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new MiniCssExtractPlugin({
      filename: "styles/[name].[contenthash:5].css",
    }),
  ],
  devServer: {
    open: ["index.html"],
  },
};
