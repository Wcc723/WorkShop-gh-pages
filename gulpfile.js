var gulp = require('gulp');
var ghPages = require('gulp-gh-pages');
var webserver = require('gulp-webserver');
var layout = require('gulp-layout');
var frontMatter = require('gulp-front-matter');
const sass = require('gulp-sass')(require('sass'));

gulp.task('webserver', function() {
  return gulp.src('./public')
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
  return gulp.src('./source/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./public'));
});

gulp.task('copy', function(){
  return gulp.src(['./source/**/*.css',
    './source/**/*.png',
    './source/**/*.jpg',
    './source/**/*.wav',
    './source/**/*.svg',
    './source/**/*.js'])
    .pipe(gulp.dest('./public'));
});

gulp.task('watch', function () {
  gulp.watch( './source/**/*.html', { interval: 500 }, gulp.series('gulp-layout'));
  gulp.watch( './source/**/*.scss', { interval: 500 }, gulp.series('sass'));
  return gulp.watch( ['./source/**/*.css',
    './source/**/*.png',
    './source/**/*.jpg',
    './source/**/*.svg',
    './source/**/*.js'], { interval: 500 }, gulp.series('copy'));
});

gulp.task('deploy', function() {
  return gulp.src('./public/**/*')
    .pipe(ghPages());
});


gulp.task('default', gulp.series('webserver','gulp-layout', 'copy', 'sass', 'watch'));