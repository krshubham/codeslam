var gulp = require('gulp');
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');

gulp.task('default', function () {
    var jsFiles = 'public/javascripts/**/*.js',
        jsDest = 'public/dist';

    return gulp.src(jsFiles)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(uglify())
        .pipe(gulp.dest(jsDest));
});