var gulp = require("gulp");
var less = require("gulp-less");

// task
gulp.task('styles', function () {
    return gulp.src('./themes/bootstrap.less')
    .pipe(less())
    //compile into our examples folder
    .pipe(gulp.dest('./examples/build'));
});
