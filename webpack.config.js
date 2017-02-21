const {
  resolve
} = require('path')
const webpack = require('webpack')
var CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const url = require('url')
const publicPath = ''
var srcCatalog = "./webrc/"

module.exports = (options = {}) => ({
  entry: {
    "build": srcCatalog + '/app.js'
  },
  output: {
    path: resolve(__dirname, 'dist'),
    publicPath: '/dist/',
    filename: options.dev ? '[name].js' : '[name].js?[chunkhash]',
    chunkFilename: '[id].js?[chunkhash]'
  },
  module: {
    rules: [{
      test: /\.vue$/,
      use: ['vue-loader']
    }, {
      test: /\.js$/,
      use: ['babel-loader'],
      exclude: /node_modules/
    }, {
      test: /\.jade$/,
      use: ['jade-loader']
    }, {
      test: /\.html$/,
      use: [{
        loader: 'html-loader',
        options: {
          root: resolve(__dirname, 'src'),
          attrs: ['img:src', 'link:href']
        }
      }]
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
    }, {
      test: /favicon\.png$/,
      use: [{
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }]
    }, {
      test: /\.(png|jpg|jpeg|gif|eot|ttf|woff|woff2|svg|svgz)(\?.+)?$/,
      exclude: /favicon\.png$/,
      use: [{
        loader: 'url-loader',
        options: {
          limit: 10000
        }
      }]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: '4G LINKHUB',
      hash: true,
      template: srcCatalog + 'index.ejs',
      filename: '../index.html'
    }),
    new CopyWebpackPlugin([{
      from: srcCatalog + 'i18n/',
      to: 'i18n'
    }, {
      from: srcCatalog + '/cfgbak',
      to: '../cfgbak'
    }])
  ],
  resolve: {
    alias: {
      '~': resolve(__dirname, 'src')
    }
  },
  devServer: {
    host: '127.0.0.1',
    port: 8018,
    proxy: {
      '/jrd/webapi': {
        //target: 'http://127.0.0.1:9096',
        target: 'http://192.168.1.1'
      },
      '/firmware/*': {
        target: 'http://www.alcatel-move.com',
        secure: true
      },
      '/svnlog': {
        target: 'http://10.129.60.82:8000',
        secure: false
      },
      '/smartreleaseapi': {
        target: 'http://127.0.0.1:8000',
        secure: false
      }
    }
  },
  //devtool: options.dev ? '#eval-source-map' : '#source-map'
})
