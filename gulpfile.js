const gulp = require('gulp');
const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const babel = require('gulp-babel');
const uglify = require('gulp-uglify');


function compilaSass() {
  return gulp.src(['./scss/**/*.scss'])
    .pipe(sass({
      outputStyle: 'compressed',
    }))
    .pipe(autoprefixer({
      overrideBrowserslist: ['last 3 versions'],
      cascade: false,
    }))
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('css/'))
    .pipe(browserSync.stream());
}

function gulpJS() {
  return gulp
    .src([
      'js/scripts/main.js',
    ])
    .pipe(concat('all.min.js'))
    .pipe(babel({
      presets: ['@babel/env'],
    }))
    .pipe(uglify())
    .pipe(gulp.dest('js/'))
    .pipe(browserSync.stream());
}


function browser() {
  browserSync.init({
    server: {
      baseDir: './',
    },
  });
}

function watch() {
  gulp.watch('./scss/*.scss', compilaSass);
  gulp.watch('js/scripts/*.js', gulpJS);
  gulp.watch(['*.html']).on('change', browserSync.reload);
}

gulp.task('sass', compilaSass);
gulp.task('mainjs', gulpJS);
gulp.task('browser-sync', browser);
gulp.task('watch', watch);

gulp.task('default', gulp.parallel('watch', 'browser-sync', 'sass', 'mainjs'));
