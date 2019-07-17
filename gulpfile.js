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
var htmlmin = require('gulp-htmlmin');
// var babel = require("gulp-babel");

var base_folder = "www";

var paths = {
	indexRoot: {
		source: [
			"index.html"
		],
		dest: "./" + base_folder
	},
	templates: {
		source: [
			"./templates/*.html",
			"./templates/modals/*.html"
		],
		dest: "./" + base_folder + "/templates",
		compiledName: "templates.min.html"
	},
	styles: {
		source: [

		],
		dest: "./" + base_folder + "/css",
		compiledName: "styles.min.css"
	},
	scripts: {
		source: [
			"./app/*.js",
			"./app/controllers/*.js",
			"./app/directives/*.js",
			"./app/services/*.js"
		],
		dest: "./" + base_folder + "/js",
		compiledName: "app.min.js"
	}
};

function indexRoot() {
	return gulp.src(paths.indexRoot.source)
		.pipe(gulp.dest(paths.indexRoot.dest));
}

function templates() {
	return gulp.src(paths.templates.source)
		.pipe(concat(paths.templates.compiledName))
		.pipe(htmlmin({
			collapseWhitespace: true
		}))
		.pipe(gulp.dest(paths.templates.dest));
}

function scripts() {
	return gulp.src(paths.scripts.source)
		.pipe(concat(paths.scripts.compiledName))
		.pipe(uglify())
		.pipe(lineEndingCorrector())
		.pipe(gulp.dest(paths.scripts.dest));
}

function watch() {
	browserSync.init({
		server: {
			baseDir: "./"
		},
		port: 3000
	});

	gulp.watch(paths.indexRoot.source, indexRoot);
	gulp.watch(paths.templates.source, templates);
	gulp.watch(paths.scripts.source, scripts);

	gulp.watch(paths.indexRoot.source).on("change", browserSync.reload);
	gulp.watch(paths.templates.source).on("change", browserSync.reload);
	gulp.watch(paths.scripts.source).on("change", browserSync.reload);
}

exports.indexRoot = indexRoot;
exports.templates = templates;
exports.scripts = scripts;
exports.watch = watch;

var build = gulp.parallel(watch);

gulp.task("default", build);