/*
 * @Author: z_ly
 * @Description: 
 * @FilePath: \webpack-practice\src\postcss.config.js
 * 
 */
module.exports = {
  // parser: 'sugarss',
    plugins: [
      require('autoprefixer')()
    ]
}