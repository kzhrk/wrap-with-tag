const path = require('path');
const baseConfig = require('./webpack.config');

module.exports = Object.assign(
  baseConfig,
  {
    entry: './src/index.js',

    output: {
      path: path.resolve(__dirname, './docs/js'),
      filename: 'script.js',
      library: 'wrapWithTag',
      libraryTarget: 'umd'
    },

    resolve: {
      extensions: ['.js']
    },

    externals: {},

    devServer: {
      contentBase: path.join(__dirname, './docs'),
      port: 3000
    }
  }
);
