var path = require("path");
module.exports = {
	entry: {
		main : "./lib/index",
		withAddons : "./standalone/addons"
	},
	output: {
		path: path.join(__dirname, "./dist"),
		filename: "reactGrid.[name].js",
		library: ["ReactGrid", "[name]"],
		libraryTarget: "umd"
	}
}
