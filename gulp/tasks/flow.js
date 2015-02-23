var gulp = require('gulp');
var execFile = require('child_process').execFile;

gulp.task('flow', function() {
  execFile('./flow/flow.exe', ['check','--lib','./flow/libs','--strip-root','./flow'],function (err, stdout, stderr) {
    if(err) console.log('Error:' + err);
    if(stdout) console.log(stdout);
  });
});


gulp.task('flow-examples', ['examples'], function() {
  execFile('./flow/flow.exe', ['check','--lib','./flow/libs','--strip-root','./flow/examples'],function (err, stdout, stderr) {
    if(err) console.log('Error:' + err);
    if(stdout) console.log(stdout);
  });
});

//
// var flow = require('gulp-flowtype');
//
// gulp.task('flow', function() {
//   return gulp.src('./flow')
//     .pipe(flow({
//         all: false,
//         weak: false,
//         declarations: './flow/libs',
//         killFlow: false,
//         beep: true,
//         generalErrorRegEx: /./
//     }));
//
// })
