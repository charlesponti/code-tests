const env = process.env.NODE_ENV
const path = require('path')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

module.exports = {
  entry: './src/views/index.js',
  devtool: 'eval',
  output: {
    path: path.resolve(__dirname, './src/assets/js'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.css?$/,
        exclude: /node_modules/,
        use: [ 'style-loader', 'css-loader', 'postcss-loader' ]
        // (
        //   env === 'production'
        //     ? ExtractTextPlugin.extract({
        //       fallback: 'style-loader',
        //       use: [ 'style-loader', 'css-loader', 'postcss-loader' ]
        //     })
        //     : 
        // )
      }
    ]
  },
  plugins: (
    env === 'production'
      ? [
        new ExtractTextPlugin({
          filename: '[name].css'
        })
      ]
      : []
  ),
  resolve: {
    extensions: ['*', '.js', '.jsx']
  },
  devServer: {
    contentBase: './dist'
  }
}
