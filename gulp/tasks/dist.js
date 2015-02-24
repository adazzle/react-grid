var gulp      = require("gulp");
var gutil     = require("gulp-util");
var webpack   = require("webpack");
var uglify = require('gulp-uglify');
var webpackConfig = require("../../config/webpack.config.js");
var gulp = require('gulp');
var rename = require('gulp-rename');

gulp.task("webpack", function(callback) {
    // run webpack
    webpack(webpackConfig, callback);
});


gulp.task("dist", ['webpack'], function() {
  gulp.src('dist/ReactGridWithAddons.js')
  .pipe(uglify())
  .pipe(rename('ReactGridWithAddons.min.js'))
  .pipe(gulp.dest('dist'))
  .on('error', gutil.log)

  return gulp.src('dist/ReactGrid.js')
  .pipe(uglify())
  .pipe(rename('ReactGrid.min.js'))
  .pipe(gulp.dest('dist'))
  .on('error', gutil.log)
});
