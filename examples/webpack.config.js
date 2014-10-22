var path = require("path");
var webpack = require('webpack');
module.exports = {
	entry: {
		'app' : "./examples/index.js"
	},
	output: {
		path: path.join(__dirname, "./build"),
		filename: "[name].js"
	},
	externals: {
	 "react": "React",
   "react/addons": "React",
	 "moment" : "moment"
	},
	module: {
    loaders: [
      { test: /\.js$/, loader: 'jsx-loader?harmony' } // loaders can take parameters as a querystring
    ]
  },
	plugins: [
			new webpack.ProvidePlugin({React: "React"})
		]
}
