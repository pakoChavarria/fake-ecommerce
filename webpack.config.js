const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('path')

const isProduction = process.env.production === 'production'

module.exports = {
  mode: isProduction ? 'production' : 'development',
  entry: './src/index.jsx',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/bundle.[name].js',
    chunkFilename: 'js/chunk.[name].js'
  },
  devtool: isProduction ? false : 'inline-source-map',
  devServer: {
    host: 'localhost',
    port: 3000,
    historyApiFallback: true,
    open: true
  },
  resolve: {
    extensions: ['.jsx', '.js']
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader'
        }
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|jpg|jpeg|svg|gif)$/,
        loader: 'file-loader',
        options: {
          name: 'assets/img/[name].[ext]'
        }
      },
      {
        test: /\.(ttf|eot)(\?[\s\S]+)?$/,
        loader: 'file-loader',
        options: {
          name: 'assets/fonts/[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: 'css/[name].css',
      chunkFilename: 'css/[name].css'
    })
  ]
}
