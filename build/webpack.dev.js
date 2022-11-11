/*
 * @Author: z_ly
 * @Description: 
 * @FilePath: \webpack-practice\build\webpack.dev.js
 * 
 */
const webpack = require('webpack')
const path = require('path')
const {VueLoaderPlugin} = require('vue-loader')

const devConfig = {
  mode: 'development',
  // mode: 'production',
  devtool: 'source-map',
  devServer: {
    contentBase: './dist',
    open: true,
    port: 8083,
    hot: true,
    // staticOptions: {
    //   directory: path.join(__dirname, '../public'),
    // },
    // hotOnly: true,
    proxy: {
      '/api': {
        target: 'https://img.mukewang.com',
        secure: false,
        changeOrigin: true,
        pathRewrite: {
          '^/api': '',
        },
        headers: {
          referer: 'https://img.mukewang.com',
          origin: 'https://img.mukewang.com',
        },
      },
    },
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.styl(us)?$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'stylus-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader'],
      },
    ],
  },
  plugins: [new VueLoaderPlugin(), new webpack.HotModuleReplacementPlugin()],
  optimization: {},
}
module.exports = devConfig