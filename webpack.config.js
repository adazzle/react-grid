var path = require("path");
module.exports = {
	entry: {
		main : "./standalone/index",
		withAddons : "./standalone/addons"
	},
	output: {
		path: path.join(__dirname, "./standalone/dist"),
		filename: "reactGrid.[name].js",
		library: ["ReactGrid", "[name]"],
		libraryTarget: "umd"
	}
}
