var path = require("path");
var webpack = require('webpack');
var release = false;

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
		stats: {
			colors: true,
			reasons: !release
		},

		plugins: release ? [
		new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.js"),
		new webpack.DefinePlugin({'process.env.NODE_ENV': '"production"', React: "React"}),
		new webpack.optimize.DedupePlugin(),
		new webpack.optimize.UglifyJsPlugin(),
		new webpack.optimize.OccurenceOrderPlugin(),
		new webpack.optimize.AggressiveMergingPlugin()
		] : [
		new webpack.ProvidePlugin({React: "React"}),
		new webpack.optimize.CommonsChunkPlugin(/* chunkName= */"vendor", /* filename= */"vendor.bundle.js")],

		resolve: {
			extensions: ['', '.webpack.js', '.web.js', '.js', '.jsx']
		},
		module: {
			preLoaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader: 'jshint'
			}
			],

			loaders: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				loader:  '6to5-loader'
			},
			{
				test: /\.css$/,
				loader: 'style!css'
			},
			{
				test: /\.less$/,
				loader: 'style!css!less'
			},
			{
				test: /\.gif/,
				loader: 'url-loader?limit=10000&mimetype=image/gif'
			},
			{
				test: /\.jpg/,
				loader: 'url-loader?limit=10000&mimetype=image/jpg'
			},
			{
				test: /\.png/,
				loader: 'url-loader?limit=10000&mimetype=image/png'
			},
			{
				test: /\.js$/,
				loader: 'jsx-loader?harmony'
			}
			]
		}
}
