const { series, src, dest, watch } = require("gulp");
const htmlClean = require("gulp-htmlclean");
const cssClean = require("gulp-clean-css");
const less = require("gulp-less");
const terser = require("gulp-terser");
const stripDebug = require("gulp-strip-debug");
const imageMin = require("gulp-imagemin");
const connect = require("gulp-connect");

const folder = {
  src: "src/",
  dist: "dist/",
};

function compileHTML() {
  return src(folder.src + "pages/*")
    .pipe(htmlClean())
    .pipe(dest(folder.dist + "pages/"))
    .pipe(connect.reload());
}

function compileCSS() {
  return src(folder.src + "styles/*")
    .pipe(less())
    .pipe(cssClean())
    .pipe(dest(folder.dist + "styles/"))
    .pipe(connect.reload());
}

function compileJS() {
  return src(folder.src + "scripts/*")
    // .pipe(stripDebug())
    // .pipe(terser())
    .pipe(dest(folder.dist + "scripts/"))
    .pipe(connect.reload());
}

function compileImg() {
  return src(folder.src + "img/*")
    .pipe(imageMin())
    .pipe(dest(folder.dist + "img/"));
}

function openServer(cb) {
  connect.server({
    port: 2333,
    livereload: true,
  });
  cb();
}

watch(folder.src + "pages/*", (cb) => {
  compileHTML();
  cb();
});

watch(folder.src + "styles/*", (cb) => {
  compileCSS();
  cb();
});

watch(folder.src + "scripts/*", (cb) => {
  compileJS();
  cb();
});

exports.default = series(
  compileHTML,
  compileCSS,
  compileJS,
  compileImg,
  openServer
);
