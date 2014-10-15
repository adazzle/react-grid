var path = require("path");
module.exports = {
	entry: {
		main : "./index",
		withAddons : './addons',
		editors : "./editors",
		formatters : './formatters'
	},
	output: {
		path: path.join(__dirname, "./dist"),
		filename: "reactGrid.[name].js",
		library: ["ReactGrid", "[name]"],
		libraryTarget: "umd"
	}
}
