const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const autoprefixer = require('autoprefixer');
const browserSync = require('browser-sync').create();

gulp.task('sass', function () {
  const plugins = [
    autoprefixer({ browsers: ['last 1 version'] }),
  ];
  return gulp.src('./source/scss/all.scss')
    .pipe($.plumber())
    .pipe($.postcss(plugins))
    .pipe($.sass().on('error', $.sass.logError))
    .pipe(gulp.dest('./public/css/'))
    .pipe(browserSync.stream());
});

gulp.task('html', function () {
  gulp.src('./source/index.html')
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.stream());
});

gulp.task('htmlCopy', function () {
  gulp.src('./source/product.html')
    .pipe(gulp.dest('./public/'))
    .pipe(browserSync.stream());
});

gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: './public',
    },
  });
});

gulp.task('imgCopy', function () {
  gulp.src('./source/imgs/**')
    .pipe(gulp.dest('./public/imgs/'));
});

gulp.task('watch', () => {
  gulp.watch('./source/scss/**/*.scss', ['sass']);
  gulp.watch('./source/**/*.html', ['html', 'htmlCopy']);
});

gulp.task('default', ['sass', 'html', 'htmlCopy', 'imgCopy', 'browser-sync', 'watch']);
