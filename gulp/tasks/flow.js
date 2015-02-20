var gulp = require('gulp');
var flow = require('gulp-flowtype');

gulp.task('flow', function() {
  return gulp.src('./flow')
    .pipe(flow({
        all: false,
        weak: false,
        declarations: './flow/lib',
        killFlow: false,
        beep: true,
        generalErrorRegEx: /./
    }));

})
