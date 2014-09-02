var buildBundle = require('../util/bundleBuilder');
var gulp        = require('gulp');
var concat			= require('gulp-concat');
var uglify      = require('gulp-uglify');
var rename      = require('gulp-rename');
var exposify    = require('exposify');

gulp.task('bundle', function() {
  var bundleConfig = {
    // Specify the entry point of your app
    entries: ['./lib/addons/grids/excelGrid.js']

  };

  return buildBundle(bundleConfig, 'react-grid.js', './dist/', undefined, {excludes : ['react', 'react/addons']} );

});


gulp.task('dist', ['bundle'],  function() {

  gulp.src('./dist/react-grid.js')
  .pipe(uglify())
  .pipe(rename('react-grid.min.js'))
  .pipe(gulp.dest('./dist'))
});
