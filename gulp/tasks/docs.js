var gulp = require('gulp');

var ghpages = require('gh-pages');
var path = require('path');
gulp.task('docs', ['build'], function (done) {
  ghpages.publish(path.join(__dirname, '../../examples'), function(err) { throw err; });
});
