var gulp = require('gulp');
var clean = require('gulp-clean');

gulp.task('clean', function() {
    return gulp.src(['examples/build/', 'lib', 'dist'], {read: false}).pipe(clean());
});
