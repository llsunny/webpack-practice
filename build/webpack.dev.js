/*
 * @Author: z_ly
 * @Description: 
 * @FilePath: \webpack-practice\build\webpack.dev.js
 * 
 */
const webpack = require('webpack')

const devConfig = {
  mode: 'development',
  // mode: 'production',
  // devtool: 'cheap-module-eval-source-map',
  devServer: {
    contentBase: './dist',
    open: true,
    port: 8083,
    hot: true,
    // hotOnly: true,
  },
  output: {
    filename: '[name].js',
    chunkFilename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },
      {
        test: /\.scss$/,
        use: ['style-loader', 'css-loader', 'sass-loader', 'postcss-loader'],
      },
    ],
  },
  plugins: [new webpack.HotModuleReplacementPlugin()],
  optimization: {},
}
module.exports = devConfig