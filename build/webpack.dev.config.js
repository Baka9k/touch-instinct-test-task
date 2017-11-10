const merge = require('webpack-merge');
const common = require('./webpack.common.config.js');
const path = require('path');

const buildDirectory = path.resolve(__dirname, '../dist');

module.exports = merge(common, {
  devtool: 'inline-source-map',
  devServer: {
    // Content not from webpack is served from this directory
    contentBase: buildDirectory,
    port: 8080
  }
});