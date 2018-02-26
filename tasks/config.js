/* eslint one-var: 0, semi-style: 0 */

// -- Node modules

// -- Local modules

// -- Local constants
const { name } = require('../package.json')
    , release  = require('../package.json').version
    ;

// -- Configuration file for Gulp
module.exports = {
  name,
  release,
  dist: './_dist',
  lib: './lib',
  // Specific to browserify:
  browserify: {
    // The entry point:
    app: 'src/prototypal.js',
    debug: false,
    // The Name to expose outside the module:
    exportname: 'ES5Lib',
  },
  license: ['/** ****************************************************************************',
    ` * ${name} v${release}`,
    ' *',
    ' * A tiny modular Javascript ...',
    ' * (you can download it from npm or github repositories)',
    ' * Copyright (c) 2018 John Doe <john@doe.com> (http://www.doe.com).',
    ' * Released under the MIT license. You may obtain a copy of the License',
    ' * at: http://www.opensource.org/licenses/mit-license.php).',
    ' * ************************************************************************** */',
    ''].join('\n'),
};
