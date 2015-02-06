var gulp = require('gulp');
var execFile = require('child_process').execFile;
var flow = require('gulp-flowtype');

gulp.task('flow-local', function() {
  execFile('./flow/flow.exe', ['check','--lib','./flow/lib','--strip-root','./flow'],function (err, stdout, stderr) {
    if(err) console.log('Error:' + err);
    if(stdout) console.log(stdout);
  });
});

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
