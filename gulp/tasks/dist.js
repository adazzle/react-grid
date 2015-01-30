var gulp      = require("gulp");
var gutil     = require("gulp-util");
var webpack   = require("webpack");
var webpackConfig = require("../../webpack.config.js");
var gulp = require('gulp');

gulp.task("dist",function(callback) {

    // run webpack
    webpack(Object.create(webpackConfig), function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[standalone]", stats.toString({
            // output options
        }));
        callback();
    });
});
