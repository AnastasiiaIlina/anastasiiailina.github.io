const gulp = require('gulp');
const sass = require('gulp-sass');
const browserSync = require('browser-sync').create();
const cleanCSS = require('gulp-clean-css');
const babel = require('gulp-babel');
const minify = require('gulp-babel-minify');
const concat = require('gulp-concat');

function styles() {
    return gulp.src('src/scss/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
}
 
function scripts() {
    return gulp.src('src/js/**/*.js')
    .pipe(babel({
        presets: ['env']
    }))
    .pipe(minify())
    .pipe(concat('script.js'))
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
}

function watch() {
    browserSync.init({
        server: {
           baseDir: "./",
        }
    });
    gulp.watch('src/scss/**/*.scss', styles)
    gulp.watch('src/js/**/*.js', scripts)
    gulp.watch('./*.html').on('change',browserSync.reload);
}
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;