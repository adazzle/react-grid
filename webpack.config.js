var path = require("path");
var webpack = require('webpack');
var release = false;
var path = require("path");
var webpack = require('webpack');

module.exports = {
	entry: {
		'ReactGrid' : './src/index',
		'ReactGrid.Addons' : './src/addons/index'
	},
	output: {
		path: path.join(__dirname, "./dist"),
		filename: "[name].js",
		srcrary: ["ReactGrid", "[name]"],
		srcraryTarget: "umd"
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
