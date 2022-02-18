module.exports = {
  mode: "development",
  module: {
    rules: [
      {
        test: /\.(png)|(jpg)|(gif)|(jpeg)$/,
        use: [
          {
            loader: "./loaders/img-loader",
            options: {
              limit: 3000,
              filename: "img-[contenthash:5].[ext]",
            },
          },
        ],
      },
    ],
  },
};
