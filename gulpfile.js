/*!
 * gulpfile.js
 * 
 * Copyright(c) 2018 Contact App
 * Author: Abner Castro
 * Date: February, 10th 2018
 */

const gulp = require('gulp');
const babel = require('gulp-babel');
const strip = require('gulp-strip-comments');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');


gulp.task('minify', function () {
  return gulp.src('public/js/app.js')
    .pipe(strip())
    .pipe(babel({
        presets: ['env', 'es2015', 'stage-0']
    }))
    .pipe(uglify({ mangle: false }))
    .pipe(rename('app.min.js'))
    .pipe(gulp.dest('./public/js'));
});

gulp.task('default', ['minify']);