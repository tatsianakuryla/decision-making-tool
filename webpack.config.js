const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './decision-making-tool/src/index.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    publicPath: '/decision-making-tool/',
  },
  mode: 'development',
  devtool: 'source-map',
  devServer: {
    static: './dist',
    hot: true,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './decision-making-tool/src/index.html',
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: './decision-making-tool/src/images/favicon.png',
          to: 'favicon.png',
        },
        {
          from: './decision-making-tool/src/assets',
          to: 'assets',
        },
      ],
    }),
  ],
};
