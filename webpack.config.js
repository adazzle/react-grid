var path = require("path");
module.exports = {
	entry: {
		main : "./index",
		withAddons : "./addons",
    editors : "./editors"
	},
	output: {
		path: path.join(__dirname, "js"),
		filename: "reactGrid.[name].js",
		library: ["ReactGrid", "[name]"],
		libraryTarget: "umd"
	}
}
