var gulp = require('gulp');
var execFile = require('child_process').execFile;

gulp.task('flow', function(done) {
  execFile('./flow/flow.exe', ['check','--lib','./flow/lib','--strip-root','./flow'],function (err, stdout, stderr) {
    if(err) console.log('Error:' + err);
    if(stdout) console.log(stdout);
  });
//flow not picking up our files.. NO idea why, so using a manual task above
  // return gulp.src('./flow')
  //   .pipe(flow({
  //       all: false,
  //       weak: false,
  //       declarations: './flow/lib',
  //       killFlow: false,
  //       beep: true,
  //       generalErrorRegEx: /./
  //   }));
});
