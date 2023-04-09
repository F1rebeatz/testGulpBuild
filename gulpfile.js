const gulp = require("gulp");
const sass = require("gulp-sass");
const cleanCSS = require("gulp-clean-css");
const rename = require("gulp-rename");
const babel = require("gulp-babel");
const uglify = require("gulp-uglify");
const concat = require("gulp-concat");
const del = require("del");
// пути к изначальным файлам и к конечным
const paths = {
  styles: {
    src: "src/styles/**/*.scss",
    dest: "dist/css/",
  },
  scripts: {
    src: "src/scripts/**/*.js",
    dest: "dist/js/",
  },
};

// очищает папку dist
function clean() {
  return del(["dist"]);
}

// запускает стили
function styles() {
  return gulp
    .src(paths.styles.src)
    .pipe(sass())
    .pipe(cleanCSS())
    .pipe(
      rename({
        basename: "main",
        suffix: ".min",
      })
    )
    .pipe(gulp.dest(paths.styles.dest));
}
// запуск скриптов и соединяем в один файл
function scripts() {
  return gulp
    .src(paths.scripts.src, {
      sourcemaps: true,
    })
    .pipe(babel())
    .pipe(uglify())
    .pipe(concat("main.min.js"))
    .pipe(gulp.dest(paths.scripts.dest));
}
// просмотр изменений в режиме онлайн
function watch() {
  gulp.watch(paths.styles.src, styles, scripts);
}
const build = gulp.series(clean, gulp.parallel(styles, scripts), watch);
exports.clean = clean;
exports.styles = styles;
exports.scripts = scripts;
exports.watch = watch;
exports.build = build;
exports.default = build;
