var path = require("path");
var webpack = require('webpack');

module.exports = {
	entry: {
		'Grid' : "./index",
		'WithAddons' : './addons',
		'Editors' : "./editors",
		'Formatters' : './formatters'
	},
	output: {
		path: path.join(__dirname, "./dist"),
		filename: "ReactGrid.[name].js",
		library: ["ReactGrid", "[name]"],
		libraryTarget: "umd"
	},
	externals: {
	 "react": "React",
   "react/addons": "React",
	 "moment" : "moment"
	},
	plugins: [
			new webpack.ProvidePlugin({React: "React"})
		]
}
