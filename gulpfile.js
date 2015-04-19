var gulp = require("gulp"),
    source = require("vinyl-source-stream"),
    buffer = require("vinyl-buffer"),
    browserify = require("browserify"),
    uglify = require("gulp-uglify"),
    watchify = require("watchify"),
    reactify = require("reactify"),
    concat = require("gulp-concat");

gulp.task("watch", function () {

    var bundler = browserify({
        entries: ["./static/scripts/main.js"],
        transform: [reactify],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    });

    var watcher = watchify(bundler);

    return watcher
        .on("update", function () {

            var updateStart = Date.now();

            console.log('Change detected, updating');
            watcher.bundle()
                .pipe(source("main.js"))
                .pipe(gulp.dest("./static/scripts/build/"));

            console.log('Updated in', (Date.now() - updateStart) + 'ms');

        })
        .bundle()
        .pipe(source("main.js"))
        .pipe(gulp.dest("./static/scripts/build/"));

});

gulp.task("build", function () {

    var bundler = browserify({
        entries: ["./static/scripts/main.js"],
        transform: [reactify],
        debug: true,
        cache: {},
        packageCache: {},
        fullPaths: true
    });

    bundler.bundle()
        .pipe(source("main.js"))
        .pipe(buffer())
        .pipe(uglify())
        .pipe(gulp.dest("./static/scripts/build/"));

});

gulp.task("default", ["build"]);