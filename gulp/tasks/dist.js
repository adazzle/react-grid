var gulp      = require("gulp");
var gutil     = require("gulp-util");
var webpack   = require("webpack");
var webpackConfig = require("../../webpack.config.js");


var gulp = require('gulp');
var react = require('gulp-react');

gulp.task('compile-jsx', ['clean'], function () {
    return gulp.src('./lib/**')
        .pipe(react({harmony : true}))
        .pipe(gulp.dest('./lib-compiled'));
});

gulp.task("dist", ['compile-jsx'], function(callback) {

    // run webpack
    webpack(Object.create(webpackConfig), function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[standalone]", stats.toString({
            // output options
        }));
        callback();
    });
});
