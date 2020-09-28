const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: {
    index: './main.js',
    animation: '../week13/animation-demo.js'
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: '[name]/[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: [['@babel/plugin-transform-react-jsx', {
              pragma: 'h'
            }]]
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|webp)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 4096,
            fallback: {
              loader: 'file-loader',
              options: {
                name: 'img/[name].[ext]',
              }
            }
          }
        }
      }
    ]
  },
  plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index/index.html',
        chunks: ['index'],
      }),
      new HtmlWebpackPlugin({
        template: '../week13/animation.html',
        filename: 'animation/animation.html',
        chunks: ['animation']
      })
  ]
}