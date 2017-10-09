// Paths

var theme = 'ifc';
var csspath = 'css';
var jspath = 'js';
var imgpath = 'img';

// Gulp dependencies

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    watch = require('gulp-watch'),
    path = require('path');

// Compress less

gulp.task('sass', function () {
  return gulp.src(csspath + '/app.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(csspath + '/', {overwrite: true} ));
});

// Compress js

gulp.task('js', function () {
    gulp.src(jspath + '/app.js')
    .pipe(gulp.dest(jspath + '/', {overwrite: true} ));
});

// Watch for changes

gulp.task('watch', ['sass', 'js'], function (){
    gulp.watch(csspath + '/**/*.scss', ['sass']);
    gulp.watch(jspath + '/app.js', ['js']);
});
