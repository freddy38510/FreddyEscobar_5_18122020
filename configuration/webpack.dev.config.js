/* eslint-disable import/no-extraneous-dependencies */
const { merge } = require('webpack-merge');

const { DefinePlugin } = require('webpack');
const webpackConfiguration = require('../webpack.config');
const environment = require('./environment');

module.exports = merge(webpackConfiguration, {
  mode: 'development',

  /* Manage source maps generation process */
  devtool: 'inline-source-map',

  /* Development Server Configuration */
  devServer: {
    contentBase: environment.paths.output,
    watchContentBase: true,
    publicPath: '/',
    open: true,
    historyApiFallback: false,
    compress: true,
    overlay: true,
    hot: false,
    watchOptions: {
      poll: 300,
    },
    ...environment.server,
  },

  /* File watcher options */
  watchOptions: {
    aggregateTimeout: 300,
    poll: 300,
    ignored: /node_modules/,
  },

  /* Additional plugins configuration */
  plugins: [new DefinePlugin({
    'process.env.PROD': JSON.stringify(false),
    'process.env.DEV': JSON.stringify(true),
  })],
});
