var gulp = require('gulp');
var execFile = require('child_process').execFile;

gulp.task('flow-local', function() {
  execFile('./flow/flow.exe', ['check','--lib','./flow/libs','--strip-root','./flow'],function (err, stdout, stderr) {
    if(err) console.log('Error:' + err);
    if(stdout) console.log(stdout);
  });
});
