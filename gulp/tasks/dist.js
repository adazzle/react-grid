var gulp      = require("gulp");
var gutil     = require("gulp-util");
var webpack   = require("webpack");
var webpackConfig = require("../../webpack.config.js");
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var react = require('gulp-react');

gulp.task('compile-jsx', ['clean'], function () {
    return gulp.src('./lib/**')
        .pipe(react({harmony : true}))
        .pipe(gulp.dest('./lib-compiled'));
});

gulp.task("dist", ['compile-jsx'], function(callback) {

    // run webpack
    webpack(Object.create(webpackConfig), function(err, stats) {
        if(err) {
          throw new gutil.PluginError("webpack", err);
        }
        gutil.log("[dist]", stats.toString({
            // output options
        }));

        gulp.src('./dist/*.js').pipe(uglify()).pipe(rename({suffix: '.min'})).pipe(gulp.dest('./dist'));

        callback();
    });
});
