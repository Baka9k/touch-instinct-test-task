const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const appDirectory = path.resolve(__dirname, '../src')
const buildDirectory = path.resolve(__dirname, '../dist')

const HtmlWebpackPluginConfig = new HtmlWebpackPlugin({
  template: appDirectory + '/html/index.html',
  // Name of file that the plugin will generate
  filename: 'index.html',
  // Add any JavaScript into the bottom of the body
  inject: 'body'
})

const config = {
  entry: appDirectory + '/js/index.js',
  output: {
    path: buildDirectory,
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
      { test: /\.scss$/, loaders: ['style-loader', 'css-loader', 'sass-loader'] },
      { test: /\.css$/, loaders: ['style-loader', 'css-loader'] }
    ]
  },
  plugins: [HtmlWebpackPluginConfig]
}

module.exports = config
