var browserSync = require('browser-sync');
var gulp        = require('gulp');

gulp.task('browserSync', ['examples'], function() {
	browserSync({
		server: {
			baseDir: './',
    	index: "examples/index.html",
			routes: {
				"/bower_components": "./bower_components",
			}
    }
  });
});
