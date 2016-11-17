var fs = require('fs');
var gulp = require('gulp');
var herc = require('hercule');
var aglio = require('gulp-aglio');

srcFolder = './analysis/src'
distFolder = './analysis/generated'

// Hercule Task
gulp.task('hercule', function(cb) {
	herc.transcludeFile(srcFolder + '/master.apib', function(output) {
		fs.writeFile(distFolder + '/open-api.apib', output, function(err) {
            cb(err);
        });
	});
});

// Aglio Task
gulp.task('aglio', function () {
	gulp.src(distFolder + '/open-api.apib')
		.pipe(aglio({ template: 'default', themeFullWidth: 'true', themeTemplate: 'triple' }))
		.pipe(gulp.dest(distFolder));
});

// Watches
gulp.task('watch', function() {
	gulp.watch([srcFolder + '/**/*'], ['hercule']);
	gulp.watch([distFolder + '/open-api.apib'], ['aglio']);
});

// do all at once
gulp.task('dist', ['hercule'], function() {
    gulp.start('aglio');

});
