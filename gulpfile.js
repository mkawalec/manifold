var gulp       = require('gulp');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var uglify     = require('gulp-uglify');
var sourcemaps = require('gulp-sourcemaps');
var reactify   = require('reactify');
var spawn      = require('child_process').spawn;
var install    = require('gulp-install');
var rename     = require('gulp-rename');

gulp.task('install', function() {
  return gulp.src([ './package.json' ])
    .pipe(install());
});

gulp.task('build', function() {

  var bundler = browserify({
    entries: [ './client' ],
    extensions: [ '.js', '.jsx' ],
    debug: true
  }).transform(reactify);

  var bundle = function() {
    return bundler
      .bundle()
      .pipe(source('app.js'))
      .pipe(buffer())
      .pipe(sourcemaps.init({ loadMaps: true }))
        // Add transformation tasks to the pipeline here.
        .pipe(uglify())
      .pipe(sourcemaps.write('./'))
      .pipe(gulp.dest('./build/js/'));
  };

  return bundle();
});

var server;
function spawnServer(cb) {
  if (server) {
    server.on('exit', function() {
      console.log('the server is down! Restarting...');
      server = null;
      spawnServer(cb);
    });
    server.kill();
  } else {
    server = spawn('node', [ 'server' ], { stdio: 'inherit' });
    server.on('exit', function(code) {
      server = null;

      if (code && code !== 143) {
        setTimeout(spawnServer, 500);
      }
    });

    if (cb) {
      cb();
    }
  }
}

gulp.task('server', [ 'build' ], spawnServer);

gulp.task('watch', [ 'install', 'server' ], function() {
  gulp.watch([ 'server/**/*.js', 'client/**/*.js', 'client/**/*.jsx' ], [ 'server' ]);
});

gulp.task('default', [ 'watch' ]);
