var gulp        = require('gulp');
var concat			= require('gulp-concat');
var webpack   = require("webpack");
var gutil     = require("gulp-util");
var path = require("path");

webpackConfig = {
	entry: {
		'index' : './examples/index.js',
		'shared' : './examples/shared.js'
	},
	output: {
		path: path.join(__dirname, "../../examples/build"),
		filename: "[name].js"
	},
	module: {
		loaders: [
		{ test: /\.js$/, loader: 'jsx-loader?stripTypes&harmony' } // loaders can take parameters as a querystring
		]
	}
}


gulp.task('script-deps',  function() {

	return gulp.src([
		'node_modules/es5-shim/es5-shim.js'
	])
	.pipe(concat('libs.js'))
	.pipe(gulp.dest('./examples/build'))
});


gulp.task("copy-dist", ['build'], function(){
	//copy dist folder to examples
	return gulp.src([
		'dist/**',
		])
		.pipe(gulp.dest('./examples/build'))
});

// task
gulp.task('styles', function () {
	return gulp.src('./themes/reactGrid.css')
	.pipe(gulp.dest('./examples/build'));
});


gulp.task("examples", ['script-deps', 'copy-dist', 'styles'],  function(callback) {

		// run webpack
		webpack(Object.create(webpackConfig), function(err, stats) {
				if(err) throw new gutil.PluginError("webpack", err);
				gutil.log("[standalone]", stats.toString({
						// output options
				}));

				callback();
		});
});
