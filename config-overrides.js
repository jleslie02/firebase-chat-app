const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const path = require('path');
const webpack = require('webpack');
const packages = require('./package.json');

module.exports = function override(config, env) {
  const DEV = env !== 'production';
  const vendorLibs = Object.keys(packages.dependencies);
  const publicPath = '/';

  config.entry = {
    'lol-chat': [path.join(__dirname, 'src/index.js')],
    'lol-chat-vendor': vendorLibs,
    'lol-chat-app': [path.join(__dirname, 'src/App/App.js')]
  };
  // Add hot reloading
  if (DEV) {
    config.entry['lol-chat'].push(require.resolve('react-dev-utils/webpackHotDevClient'));
  }

  config.output = {
    path: path.join(__dirname, 'build'),
    filename: '[name].[hash].js',
    chunkFilename: 'lol-chat-[name].[hash].js',
    publicPath
  };

  // Add plugins for code splitting
  config.plugins.concat([
    new webpack.HashedModuleIdsPlugin()
  ]);

  config.optimization.splitChunks = {
    cacheGroups: {
      vendor: {
        name: 'lol-chat-vendor',
        filename: 'lol-chat-vendor.[hash].js',
        chunks: "initial",
      },
      manifest: {
        name: 'manifest',
        filename: 'manifest.js',
        chunks: "initial"
      }
    }
  };
  // Add bundle analyzer
  if (DEV)
    // Get a breakdown of what libraries are being bundled and how much space each takes.
    config.plugins.push(new BundleAnalyzerPlugin());

  // Resolve paths
  config.resolve.alias.Components = path.resolve(__dirname, 'src/components/');
  config.resolve.alias.Utils = path.resolve(__dirname, 'src/utils');
  config.resolve.alias.Locale = path.resolve(__dirname, 'src/locale');
  config.resolve.alias.Logos = path.resolve(__dirname, 'src/assets/logos');
  config.resolve.alias.Images = path.resolve(__dirname, 'src/assets/images');
  return config;
};
