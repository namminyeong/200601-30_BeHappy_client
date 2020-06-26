const path = require('path');

const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const miniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
  entry: './src/index.js', // 연결돼 있는 각 파일 중 최상위 파일
  output: {
    path: path.resolve(__dirname, 'dist'), // bundle된 파일을 export할 경로
    filename: 'bundle.js', // bundle된 파일 이름
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css'],
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)?$/,
        loader: 'babel-loader',
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
