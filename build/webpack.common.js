/*
 * @Author: z_ly
 * @Description: 
 * @FilePath: \webpack-practice\build\webpack.common.js
 * 
 */
const path = require('path')

const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const merge = require('webpack-merge')
const devConfig = require('./webpack.dev.js')
const prodConfig = require('./webpack.prod.js')

const makePlugins = (config) => {
  const plugins = [
    new CleanWebpackPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
    }),
  ];
  Object.keys(config.entry).forEach((item) => {
    plugins.push(
      new HtmlWebpackPlugin({
        template: 'src/index.html',
        filename: `${item}.html`,
        chunks: ['runtime', 'vendors', item],
      })
    )
  })
  return plugins
}

const commonConfig = {
  stats: { children: false },
  entry: {
    index: './src/index.js',
    main: './src/main.ts',
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
  },
  optimization: {
    runtimeChunk: {
      name: 'runtime',
    },
    usedExports: true,
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          name: 'vendors',
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: {
          loader: 'url-loader',
          options: {
            name: '[name]_[hash].[ext]',
            outputPath: 'images/',
            limit: 2048,
          },
        },
      },
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'ts-loader',
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
}
commonConfig.plugins = makePlugins(commonConfig)
module.exports = (env) => {
  console.log(env)
  if (env && env.production) {
    return merge(commonConfig, prodConfig)
  } else {
    return merge(commonConfig, devConfig)
  }
}