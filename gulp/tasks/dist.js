var gulp      = require("gulp");
var gutil     = require("gulp-util");
var webpack   = require("webpack");
var uglify = require('gulp-uglify');
var webpackConfig = require("../../webpack.config.js");
var gulp = require('gulp');
var rename = require('gulp-rename');

gulp.task("webpack",function(callback) {

    // run webpack
    webpack(Object.create(webpackConfig), function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
        gutil.log("[standalone]", stats.toString({
            // output options
        }));
        callback();
    });
});


gulp.task("dist", ['webpack'], function() {
  gulp.src('dist/ReactGridAddons.js')
  .pipe(uglify())
  .pipe(rename('ReactGridAddons.min.js'))
  .pipe(gulp.dest('dist'))
  .on('error', gutil.log)

  return gulp.src('dist/ReactGrid.js')
  .pipe(uglify())
  .pipe(rename('ReactGrid.min.js'))
  .pipe(gulp.dest('dist'))
  .on('error', gutil.log)
});
