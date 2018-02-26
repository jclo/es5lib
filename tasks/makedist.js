/* eslint one-var: 0, prefer-arrow-callback: 0, import/no-extraneous-dependencies: 0,
  semi-style: 0 */

// -- Node modules
const del         = require('del')
    , gulp        = require('gulp')
    , concat      = require('gulp-concat')
    , header      = require('gulp-header')
    , runSequence = require('run-sequence')
    , uglify      = require('gulp-uglify')
    ;

// -- Local modules
const config  = require('./config')
    ;

// -- Local constants
const { dist }    = config
    , { lib }     = config
    , { name }    = config
    , { license } = config
    ;

// -- Local variables


// -- Gulp Tasks

// Remove previous dist:
gulp.task('deldist', function() {
  return del.sync(dist);
});

// Copy README and LICENSE:
gulp.task('skeleton', function() {
  return gulp.src(['README.md', 'LICENSE.md'])
    .pipe(gulp.dest(dist));
});

// Copy the development version:
gulp.task('copydev', function() {
  return gulp.src(`${lib}/${name}.js`)
    .pipe(header(license))
    .pipe(gulp.dest(dist));
});

// Create the minified version:
gulp.task('makeminified', function() {
  return gulp.src(`${lib}/${name}.js`)
    .pipe(uglify())
    .pipe(header(license))
    .pipe(concat(`${name}.min.js`))
    .pipe(gulp.dest(dist));
});

// Copy map
// Copy the development version:
gulp.task('copymap', function() {
  return gulp.src(`${lib}/${name}.js.map`)
    .pipe(gulp.dest(dist));
});


// -- Gulp Main Task:
gulp.task('makedist', function(callback) {
  runSequence(
    'deldist',
    ['skeleton', 'copydev', 'makeminified', 'copymap'],
    callback,
  );
});
