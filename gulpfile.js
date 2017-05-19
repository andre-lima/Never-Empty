'use strict';

var gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('js', function () {
    return gulp.src(['./index.js', './src/walktree.js'])
        .pipe(babel({
            presets: ['es2015', 'es2017']
        }))
        .pipe(gulp.dest('lib/'))
});

gulp.task('default', ['js']);
