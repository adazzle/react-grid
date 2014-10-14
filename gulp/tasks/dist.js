var gulp      = require("gulp");
var gutil     = require("gulp-util");
var webpack   = require("webpack");
var webpackConfig = require("../../webpack.config.js");

gulp.task("standalone", function(callback) {

    // run webpack
    webpack(Object.create(webpackConfig), function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[standalon]", stats.toString({
            // output options
        }));
        callback();
    });
});
