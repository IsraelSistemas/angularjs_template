var gulp = require("gulp");
var autoprefixer = require("gulp-autoprefixer");
var browserSync = require("browser-sync").create();
var reload = browserSync.reload;
var sass = require("gulp-sass");
var cleanCSS = require("gulp-clean-css");
var sourceMaps = require("gulp-sourcemaps");
var concat = require("gulp-concat");
var changed = require("gulp-changed");
var uglify = require("gulp-uglify");
var lineEndingCorrector = require("gulp-line-ending-corrector");
// var babel = require("gulp-babel");

var paths = {
	html: {
		source: [
			"./templates/*.html"
		]
	},
	styles: {
		source: [],
		dest: "./dest/"
	},
	scripts: {
		source: [
			"./app/*.js",
			"./app/controllers/*.js",
			"./app/directives/*.js",
			"./app/services/*.js"
		],
		dest: "./dest/"
	}
};

function scripts() {
	return gulp.src(paths.scripts.source)
		.pipe(concat("main.min.js"))
		.pipe(uglify())
		.pipe(lineEndingCorrector())
		.pipe(gulp.dest(paths.scripts.dest));
}

function html() {
	return gulp.src(paths.html.source);
}

function watch() {
	browserSync.init({
		server: {
			baseDir: "./"
		},
		port: 3000
	});

	gulp.watch(paths.html.source, html);
	gulp.watch(paths.scripts.source, scripts);

	gulp.watch(paths.scripts.source).on("change", browserSync.reload);
	gulp.watch(paths.html.source).on("change", browserSync.reload);
}

exports.html = html;
exports.scripts = scripts;
exports.watch = watch;

var build = gulp.parallel(watch);

gulp.task("default", build);