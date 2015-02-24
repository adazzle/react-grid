var path = require("path");
var webpack = require('webpack');
var release = false;
var path = require("path");

module.exports = {
  entry: {
    'Grid' : './src/index',
    'GridAddons' : './src/addons/index'
  },
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "React[name].js",
    library: ["ReactGrid", "[name]"],
    libraryTarget: "umd"
  },
  externals: {
    "react/addons": {
      root : 'React',
      commonjs : 'react/addons',
      commonjs2 : 'react/addons',
      amd : 'react/addons'
    },
    "moment" : "moment"
  },
  module: {
    loaders: [
    { test: /\.js$/, loader: 'jsx-loader?stripTypes&harmony' } // loaders can take parameters as a querystring
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.AggressiveMergingPlugin()
  ]
}
