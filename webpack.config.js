var path = require("path");
module.exports = {
	entry: {
		'reactGrid' : "./index",
		'reactGrid.withAddons' : './addons',
		'reactGrid.editors' : "./editors",
		'reactGrid.formatters' : './formatters'
	},
	output: {
		path: path.join(__dirname, "./dist"),
		filename: "[name].js",
		library: ["ReactGrid", "[name]"],
		libraryTarget: "umd"
	},
	externals: {
	 "react": "React",
   "react/addons": "React",
	 "moment" : "moment"
	}
}
