var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var webserver = require('gulp-webserver');
var layout = require('gulp-layout');
var frontMatter = require('gulp-front-matter');
var sass = require('gulp-sass');

gulp.task('webserver', function() {
  gulp.src('./public')
    .pipe(webserver({
      livereload: true,
      open: true,
      host: '0.0.0.0',
      port: 10000,
    }));
});

gulp.task('gulp-layout', function() {
  return gulp.src('./source/**/*.html')
    .pipe(frontMatter())
    .pipe(layout(function(file) {
      return file.frontMatter;
    }))
    .pipe(gulp.dest('./public'));
});

gulp.task('sass', function () {
  gulp.src('./source/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public'));
});

gulp.task('copy', function(){
  gulp.src(['./source/**/*.css',
    './source/**/*.png',
    './source/**/*.jpg',
    './source/**/*.svg',
    './source/**/*.js'])
    .pipe(gulp.dest('./public'));
});

gulp.task('watch', function () {
  gulp.watch( './source/**/*.html', { interval: 500 }, ['gulp-layout']);
  gulp.watch( './source/**/*.scss', { interval: 500 }, ['sass']);
  gulp.watch( ['./source/**/*.css',
    './source/**/*.png',
    './source/**/*.jpg',
    './source/**/*.svg',
    './source/**/*.js'], { interval: 500 }, ['copy']);
});

gulp.task('deploy', function() {
  return gulp.src('./public/**/*')
    .pipe(ghPages());
});


gulp.task('default', ['webserver','gulp-layout', 'copy', 'sass', 'watch']);