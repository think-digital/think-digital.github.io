// Paths

var theme = 'boilerplate';
var csspath = 'assets/styles';
var jspath = 'assets/js';
var imgpath = 'assets/img';

// Gulp dependencies

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    path = require('path');

// Compress less

gulp.task('sass', function () {
  return gulp.src(csspath + '/styles.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(csspath + '/', {overwrite: true} ));
});

// Compress js

gulp.task('js', function () {
    gulp.src(jspath + '/global.js')
    .pipe(gulp.dest(jspath + '/min/', {overwrite: true} ));
});

// Watch for changes

gulp.task('watch', ['sass', 'js'], function (){
    gulp.watch(csspath + '/**/*.scss', ['sass']);
    gulp.watch(jspath + '/global.js', ['js']);
});
