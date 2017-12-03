import HtmlWebpackPlugin from 'html-webpack-plugin';
import path from 'path';

const distFolder = path.resolve(__dirname, './dist');

export default {
  entry: './src/main.js',
  output: {
    path: distFolder,
    filename: 'bundle.js'
  },
  module: {
    rules: [
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' },
      { test: /\.css$/, loader: [ 'style-loader', 'css-loader' ] }
    ]
  },
  devServer: {
    contentBase: distFolder
  },
  devtool: 'eval-source-map',
  plugins: [new HtmlWebpackPlugin()]
}
