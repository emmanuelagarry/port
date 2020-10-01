const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => {
  return {
    entry: "./src/index.js",
    output: {
      path: path.resolve(__dirname, "dist"),
      filename: "bundle.js",
    },
    devServer: {
      contentBase: path.join(__dirname, "dist"),
      compress: true,
      port: 9000,
    },

    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },

        {
          test: /\.tsx?$/,
          loader: 'babel-loader',
        },

        {
          test: /\.(scss)$/,
          use: [
            {
              loader: "style-loader", // inject CSS to page
            },
            {
              loader: "css-loader", // translates CSS into CommonJS modules
            },
            {
              loader: "postcss-loader", // Run post css actions
              options: {
                plugins: function () {
                  // post css plugins, can be exported to postcss.config.js
                  return [require("precss"), require("autoprefixer")];
                },
              },
            },
            {
              loader: "sass-loader", // compiles Sass to CSS
            },
          ],
        },

        {
          test: /\.css$/i,

          use: ["style-loader", MiniCssExtractPlugin.loader, "css-loader"],
        },

        {
          test: /\.(png|jpeg|jpg|gif)$/i,
          use: {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "img/",
              publicPath: "img/",
            },
          },
        },

        {
          test: /\.html$/i,
          loader: "html-loader",
        },

        {
          test: /\.(eot|svg|ttf|woff|woff2)$/,
          loader: "file-loader",
          options: {
            name: "[name].[ext]",
            outputPath: "webfonts/",
            publicPath: "webfonts/",
          },
        },
      ],
    },
    plugins: [
      new MiniCssExtractPlugin(),
      new HtmlWebpackPlugin(),
      new CleanWebpackPlugin(),
    ],
    optimization: {
      minimizer: [new UglifyJsPlugin()],
    },
  };
};
