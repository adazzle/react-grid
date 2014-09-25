var buildBundle = require('../gulp/util/bundleBuilder');
var gulp        = require('gulp');
var concat			= require('gulp-concat');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var exposify    = require('exposify');
var less = require("gulp-less");

// task
gulp.task('styles', function () {
    return gulp.src('../themes/bootstrap.less')
    .pipe(gulp.src('../bower_components/bootstrap-daterangepicker/daterangepicker-bs3.css'))
    //compile into our examples folder
    .pipe(gulp.dest('styles'));
});


gulp.task('bundle', function() {
  var bundleConfig = {
    // Specify the entry point of your app
    entries: ['./index.js']

  };


  return buildBundle(bundleConfig, '../dist/react-grid-addons.js', '.', undefined, {excludes : ['react', 'react/addons']} );

});


gulp.task('default', ['bundle', 'styles'],  function() {

  gulp.src('../dist/react-grid-addons.js')
  .pipe(uglify())
  .pipe(rename('react-grid-addons.min.js'))
  .pipe(gulp.dest('../dist'))
});
