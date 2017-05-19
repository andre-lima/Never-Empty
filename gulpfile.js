'use strict';

var gulp = require('gulp');
const babel = require('gulp-babel');

gulp.task('index', function () {
    return gulp.src('./src/index.js')
        .pipe(babel({
            presets: ['es2015', 'es2017']
        }))
        .pipe(gulp.dest('./'))
});

gulp.task('walktree', function () {
    return gulp.src('./src/walktree.js')
        .pipe(babel({
            presets: ['es2015', 'es2017']
        }))
        .pipe(gulp.dest('./lib'))
});

gulp.task('default', ['index', 'walktree']);
