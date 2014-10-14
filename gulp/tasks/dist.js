var gulp      = require("gulp");
var gutil     = require("gulp-util");
var webpack   = require("webpack");
var webpackConfig = require("../../webpack.config.js");

var gulp = require('gulp');
var react = require('gulp-react');

gulp.task('compile-jsx', function () {
    return gulp.src('../../src')
        .pipe(react({harmony : true}))
        .pipe(gulp.dest('../../lib'));
});

gulp.task("standalone", ['compile-jsx'], function(callback) {

    // run webpack
    webpack(Object.create(webpackConfig), function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[standalon]", stats.toString({
            // output options
        }));
        callback();
    });
});
