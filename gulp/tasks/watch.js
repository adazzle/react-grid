var gulp = require('gulp');

gulp.task('watch', ['setWatch', 'browserSync'], function() {
	gulp.watch('themes/**', ['styles']);
	gulp.watch('src/**', ['examples']);
	// Note: The browserify task handles js recompiling with watchify
});
