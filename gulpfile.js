var gulp = require("gulp"),
    webpackStream = require("webpack-stream"),
    webpack = require("webpack"),
    named = require("vinyl-named");

gulp.task("watch", function () {

    return gulp.src(["src/client/main.js"])
        .pipe(named())
        .pipe(webpackStream({
            watch: true,
            devtool: "source-map",
            module: {
                loaders: [{
                    test: /\.jsx?$/,
                    exclude: /(node_modules|bower_components)/,
                    loader: "babel",
                    query: {
                        presets: ["react"]
                    }
                }]
            },
            plugins: [
                new webpack.optimize.CommonsChunkPlugin("common.js")
            ]
        }))
        .pipe(gulp.dest("static/dist"));

});

gulp.task("build", function () {

    return gulp.src(["src/client/main.js"])
        .pipe(named())
        .pipe(webpackStream({
            devtool: "source-map",
            module: {
                loaders: [{
                     test: /\.jsx?$/,
                     exclude: /(node_modules|bower_components)/,
                     loader: "babel",
                     query: {
                         presets: ["react"]
                     }
                }]
            },
            plugins: [
                new webpack.optimize.UglifyJsPlugin({
                    sourceMap: true,
                    mangle: true,
                    compress: {
                        warnings: false
                    }
                }),
                new webpack.optimize.CommonsChunkPlugin("common.js")
            ]
        }))
        .pipe(gulp.dest("static/dist"));

});