var gulp = require('gulp')
var connect = require('gulp-connect')
var babel = require('gulp-babel')
var sourcemaps = require('gulp-sourcemaps')
var rename = require('gulp-rename')
var uglify = require('gulp-uglify')
var cleanCss = require('gulp-clean-css')
var autoprefixer = require('autoprefixer')
var postCss = require('gulp-postcss')

// 起服务
gulp.task('connect', function () {
  return connect.server({
    root: 'dist',
    livereload: true,
    port: 9000
  })
})

// html文件
gulp.task('html', function () {
  return gulp.src('./src/*.html')
    .pipe(connect.reload())
    .pipe(gulp.dest('./dist'))
})

// css文件
gulp.task('css', ['html'], function () {
  return gulp.src('./src/css/*.css')
    .pipe(postCss([autoprefixer({ browsers: ['last 2 versions'] })]))
    .pipe(gulp.dest('./dist/css'))
    .pipe(cleanCss())
    .pipe(rename({ extname: '.min.css' }))
    .pipe(connect.reload())
    .pipe(gulp.dest('./dist/css/min'))
})

// js文件
gulp.task('js', ['html'], function () {
  return gulp.src('./src/js/*.js')
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulp.dest('./dist/js'))
    .pipe(uglify())
    .pipe(rename({ extname: '.min.js' }))
    .pipe(sourcemaps.write())
    .pipe(connect.reload())
    .pipe(gulp.dest('./dist/js/min'))
})

// 图片
gulp.task('img', function () {
  return gulp.src('./src/img/*.*')
    .pipe(connect.reload())
    .pipe(gulp.dest('./dist/img'))
})

// 监控
gulp.task('watch', function () {
  gulp.watch(['./src/js/*.js'], ['js'])
  gulp.watch(['./src/css/*.css'], ['css'])
  gulp.watch(['./src/*.html'], ['html'])
})

// 默认任务
gulp.task('default', ['connect', 'watch', 'js', 'css', 'img'])
