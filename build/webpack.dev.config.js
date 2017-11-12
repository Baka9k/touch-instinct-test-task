const merge = require('webpack-merge')
const common = require('./webpack.common.config.js')
const path = require('path')

const staticDirectory = path.resolve(__dirname, '../static')

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    // Content not from webpack is served from this directory
    contentBase: staticDirectory,
    port: 8080
  }
})
