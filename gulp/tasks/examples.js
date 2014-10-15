var gulp        = require('gulp');
var concat			= require('gulp-concat');
var webpackConfig = require("../../examples/webpack.config.js");
var webpack   = require("webpack");
var gutil     = require("gulp-util");

gulp.task('script-deps', ['build'], function() {
	return gulp.src([
		'node_modules/react/dist/react-with-addons.js',
		'node_modules/jquery/dist/jquery.min.js',
		'node_modules/moment/min/moment.min.js',
		'node_modules/es5-shim/es5-shim.js',
		'node_modules/es5-shim/es5-sham.js',
		'node_modules/es6-shim/es6-shim.js'
	])
	.pipe(concat('lib.js'))
	.pipe(gulp.dest('./examples/build'))
});

gulp.task("examples", ['script-deps'],  function(callback) {

		// run webpack
		webpack(Object.create(webpackConfig), function(err, stats) {
				if(err) throw new gutil.PluginError("webpack", err);
				gutil.log("[standalone]", stats.toString({
						// output options
				}));
				callback();
		});
});
