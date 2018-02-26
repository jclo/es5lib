/* *****************************************************************************
 *
 * Note: run-sequence doesn't work with arrow function. Use the old fashion!
 *
 * ************************************************************************** */
/* eslint-env node */
/* eslint one-var: 0, semi-style: 0 */

// -- Node modules
const gulp        = require('gulp')
    , connect     = require('gulp-connect')
    , open        = require('open')
    , runSequence = require('run-sequence')
    ;

// -- Local modules

// Include all build files:
require('require-dir')('./tasks');

// -- Local constants
const watch = 'src/**/*.js'
    ;

// -- Local variables

// -- Gulp Tasks
gulp.task('build', (callback) => {
  runSequence('browserify', callback);
});

gulp.task('watch', () => {
  gulp.watch(watch, ['watchify']);
});

gulp.task('default', (callback) => {
  runSequence('browserify', 'makedist', callback);
});

gulp.task('connect', () => {
  connect.server({
    root: './',
    port: 3000,
    livereload: true,
  });
  open('http://localhost:3000/');
});
