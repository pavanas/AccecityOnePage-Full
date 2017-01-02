var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
//var scss = require('!css!sass!./file.scss');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
//var purifyCss = require('purifycss-webpack-plugin');
var path = require('path');

//var extractSCSS = new ExtractTextPlugin('accecity.css');

module.exports = {
  context: path.join(__dirname, "src"),
  devtool: debug ? "inline-sourcemap" : null,
  entry: "./js/accecity.js",
  module: {
    loaders: [
      {
        test: /\.js?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015'],
        }
      },
      {
        test: /\.scss?$/i,
        loader: ExtractTextPlugin.extract(['css','sass'])
        //loader: extractSCSS.extract(['css','sass'])
      }
    ]
  },
  output: {
    path: __dirname + "/src/",
    filename: "accecity.min.js"
  },
  // sassLoader: {
  //   includePaths: ['']
  // },
  plugins: debug ? [
    new ExtractTextPlugin('accecity.css')
  ] : [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    new ExtractTextPlugin('accecity.css'),
    //extractSCSS,
    //new purifyCss({ basePath: __dirname+'/src/', minify: true})
  ],
};
