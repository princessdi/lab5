const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const FilemanagerWebpackPlugin = require("filemanager-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "main.js",
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "src/template.pug",
      inject: "body",
    }),
    new FilemanagerWebpackPlugin({
      events: {
        onStart: {
          delete: ["dist"],
        },
      },
    }),
    new MiniCssExtractPlugin({ filename: "[name].css" }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.pug$/,
        use: ["pug-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  devServer: {
    static: ["public"],
    port: 3030,
    open: true,
  },
  mode: "none",
};
