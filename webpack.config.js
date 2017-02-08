var path = require('path')
var CopyWebpackPlugin = require('copy-webpack-plugin');
var HtmlWebpackPlugin = require('html-webpack-plugin')
var webpack = require('webpack')

module.exports = {
  entry: {
    "build": './src/app.js',
    //"config": "./src/config.js"
  },
  //entry: './src/app.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
    filename: '[name].js'
  },
  /*
  resolveLoader: {
    root: path.join(__dirname, 'node_modules'),
  },*/
  module: {
    loaders: [{
      test: /\.vue$/,
      loader: 'vue'
    }, {
      test: /\.jade$/,
      loader: 'jade'
    }, {
      test: /\.js$/,
      loader: 'babel',
      exclude: /node_modules/
    }, {
      test: /\.css$/,
      loader: 'style!css'
    }, {
      test: /\.(eot|ttf|woff|woff2)(\?\S*)?$/,
      loader: 'file'
    }, {
      test: /\.(png|jpe?g|gif|svg)(\?\S*)?$/,
      loader: 'file',
      query: {
        name: '[name].[ext]?[hash]'
      }
    }]
  },
  //添加，否则类似const Bar = { template: '<div>bar</div>' };不可用
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue'
    }
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    proxy: {
      '/jrd/webapi': {
        target: 'http://127.0.0.1:9096',
        target: 'http://192.168.1.1',
        secure: false
      },
      '/setSimState/*': {
        target: 'http://127.0.0.1:9096',
        secure: false
      }
    }
  },
  devtool: '#eval-source-map'
}


if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map'
    // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new HtmlWebpackPlugin({
      title: '4G LINKHUB',
      hash: true,
      template: 'index.ejs',
      filename: '../index.html'
    }),
    new CopyWebpackPlugin([{
      from:'src/i18n',
      to: 'i18n'
    },{
      from:'src/cfgbak',
      to: '../cfgbak'
    }]),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ])
}
