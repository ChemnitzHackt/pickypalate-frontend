const path = require('path');
const webpack = require('webpack');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    filename: '[name].[chunkhash].js'
  },
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    compress: true,
    port: 8080
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin(),
    new HtmlWebpackPlugin({
      title: 'ChemnitzHackt 2017 - Staffbase',
      template: 'index.ejs',
      filename: 'index.html'
    }),
    new CleanWebpackPlugin(['dist'], {
      root: __dirname,
      verbose: false,
      dry: false
    }),
    new ExtractTextPlugin('[name].[chunkhash].css')
  ],
  module: {
    rules: [
      {
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'url-loader?limit=10000&mimetype=application/font-woff'
      },
      {
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: 'file-loader'
      },
      {
        test:   /\.(css|scss)$/,
        use: ['style-loader', 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test:   /\.(js|jsx)$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['react', 'env']
          }
        }
      }
    ]
  },
  resolve: { extensions: ['.html', '.js', '.jsx'] }
};