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
      { test: /\.js$/, exclude: /node_modules/, loader: 'babel-loader' }
    ]
  },
  devServer: {
    contentBase: distFolder
  },
  plugins: [new HtmlWebpackPlugin()]
}
