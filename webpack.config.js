/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

const isDevelopment = process.env.NODE_ENV !== 'production';

module.exports = {
  mode: isDevelopment ? 'development' : process.env.NODE_ENV,
  target: isDevelopment ? 'web' : 'browserslist',
  devtool: isDevelopment ? 'eval-source-map' : undefined,
  entry: './src/App.tsx',
  output: {
    path: path.resolve(__dirname, 'dist/'),
    filename: 'app.[chunkhash].js',
    publicPath: '/',
  },
  resolve: {
    plugins: [new TsconfigPathsPlugin()],
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.(png|jp(e*)g|svg)$/,
        type: 'asset/resource',
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      publicPath: '/',
    }),
    new CopyWebpackPlugin({ patterns: [{ from: 'public' }] }),
  ],
  devServer: {
    port: 8080,
    historyApiFallback: true,
    hot: true,
  },
};
