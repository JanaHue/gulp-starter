var gulp = require('gulp');
var jshint = require('gulp-jshint');
var stylus = require('gulp-stylus');
var gls = require('gulp-live-server');

var paths = {
    stylusMain: 'dev/styles/main.styl',
    stylusAll: 'dev/styles/*.styl',
    css: 'public/styles/',
    jsDev: 'dev/scripts/script.js',
    jsPub: 'public/scripts/',
    assetsDev: 'dev/assets/*.*',
    assetsPub: 'public/assets/'
};

gulp.task('stylus', function() {
    return gulp.src(paths.stylusMain)
    .pipe(stylus())
    .pipe(gulp.dest(paths.css));
});

gulp.task('js', function() {
    return gulp.src(paths.jsDev)
    .pipe(jshint())
    .pipe(gulp.dest(paths.jsPub));
});

gulp.task('assets', function() {
    return gulp.src(paths.assetsDev)
    .pipe(gulp.dest(paths.assetsPub));
});

gulp.task('serve', ['stylus', 'js'], function() {
    server = gls.static('public', 8080);
    server.start();
})

gulp.task('watch', ['serve'], function(){
    gulp.watch(paths.jsDev, ['js']);

    gulp.watch(paths.jsPub+'**/*.js', function(event) {
        server.notify.apply(server, [event]);
    });

    gulp.watch(paths.stylusAll, ['stylus']);

    gulp.watch(paths.css+'*.css', function(event) {
        server.notify.apply(server, [event]);
    });

    gulp.watch(paths.assetsDev, ['assets']);

    gulp.watch(paths.assetsPub+'*.*', function(event) {
        server.notify.apply(server, [event]);
    });
});

gulp.task('default', ['stylus', 'js', 'assets', 'serve', 'watch']);