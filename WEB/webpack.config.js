const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');
const uglifyjsWebpackPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
  entry: './src/index.tsx', // 연결돼 있는 각 파일 중 최상위 파일
  output: {
    path: path.resolve(__dirname, 'dist'), // bundle된 파일을 export할 경로
    filename: 'bundle.js', // bundle된 파일 이름
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
      },
      {
        test: /\.css$/,
        loader: [miniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|jpeg|gif|)?$/,
        loader: 'file-loader',
      },
      {
        test: /\.(png|jpg|jpeg|gif|)?$/,
        loader: 'url-loader',
        options: {
          name: '[hash].[ext]',
          limit: 10000,
        },
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
    new miniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],
};
