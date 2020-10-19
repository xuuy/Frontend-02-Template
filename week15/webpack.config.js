const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const ManifestPlugin = require('webpack-manifest-plugin')

const config = {
  mode: process.env.NODE_ENV || 'development',
  devtool: 'inline-source-map',
  entry: './src/main.jsx',
  output: {
    filename: '[name].[hash].js'
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: [
          'cache-loader',
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true,
              cacheCompression: false
            }
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  devServer: {
    hot: true,
    host: 'localhost',
    port: 3000,
    contentBase: './dist'
  },
  optimization: {
    runtimeChunk: 'single',
    moduleIds: 'hashed',
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new ManifestPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: './index.html',
      title: 'Carousel'
    })
  ]
}

module.exports = config