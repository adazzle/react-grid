var gulp = require('gulp');
var react = require('gulp-react');
var flow = require('gulp-flowtype'); //using custom version till https://github.com/charliedowler/gulp-flowtype/pull/15 is done

gulp.task('flow', function() {
  return gulp.src('./src/**.js')
    .pipe(flow({
        all: false,
        weak: false,
        declarations: './flow/lib',
        killFlow: false,
        beep: true,
        flowBin: './flow/flow.exe',
        generalErrorRegEx: /./
    }));
});
