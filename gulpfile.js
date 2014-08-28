var gulp   = require('gulp');
var concat = require('gulp-concat');
var sass   = require('gulp-ruby-sass');
var prefix = require('gulp-autoprefixer');

gulp.task('js', function() {
  gulp.src(['src/js/**/*'])
  .pipe(gulp.dest('dist/js/'));
});

gulp.task('views', function() {
  gulp.src('src/index.html').pipe(gulp.dest('dist/'));
  gulp.src('src/views/**/*').pipe(gulp.dest('dist/views'));
});

gulp.task('styles', function() {
  gulp.src('src/styles/*.scss')
  .pipe(sass({ onError: function(e) {console.log(e); } }))
  // .pipe(prefix("last 2 versions", "> 1%", "ie 8"))
  .pipe(gulp.dest('dist/css/'));
});

gulp.task('img', function() {
  gulp.src('src/img/**.*').pipe(gulp.dest('dist/img'));
});

gulp.task('watch', function() {
  gulp.watch(['src/js/**', 'src/js/**/*.js'], ['js']);
  gulp.watch(['src/index.html', 'src/views/**'], ['views']);
  gulp.watch(['src/styles/**'], ['styles']);
});

gulp.task('default', ['watch']);

gulp.task('build', ['js', 'views', 'styles', 'img']);