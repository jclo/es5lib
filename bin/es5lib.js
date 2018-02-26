#!/usr/bin/env node
/* *****************************************************************************
 * es5lib.js creates the skeleton for writing large UMD Javascript libraries.
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2018 jclo <jclo@mobilabs.fr> (http://www.mobilabs.fr)
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 * ************************************************************************** */
/* eslint-env node */
/* eslint one-var: 0, semi-style: 0 */

// -- Node modules
const fs           = require('fs')
    , { Readable } = require('stream')
    , nopt         = require('nopt')
    , path         = require('path')
    ;

// -- Global variables
const baseapp     = process.cwd()
    , baseumdlib  = __dirname.replace('/bin', '')
    , { version } = require('../package.json')
    , src         = 'src'
    , test        = 'test'
    , tasks       = 'tasks'
    // Command line Options
    , opts = {
      help: [Boolean, false],
      version: [String, null],
      collection: [Boolean, false],
      path,
      name: [String, null],
    }
    , shortOpts = {
      h: ['--help'],
      v: ['--version', version],
      c: ['--collection'],
      p: ['--path'],
      n: ['--name'],
    }
    , parsed = nopt(opts, shortOpts, process.argv, 2)
    ;

// -- Templates
const readme = [
  '# MyApp',
  ' ',
  'Bla bla ...',
  ' ',
  '## License',
  ' ',
  'MIT.',
  '',
].join('\n');

const license = [
  'The MIT License (MIT)',
  '',
  'Copyright (c) 2018 John Doe <jdo@johndoe.com> (http://www.johndoe.com)',
  '',
  'Permission is hereby granted, free of charge, to any person obtaining a copy',
  'of this software and associated documentation files (the "Software"), to deal',
  'in the Software without restriction, including without limitation the rights',
  'to use, copy, modify, merge, publish, distribute, sublicense, and/or sell',
  'copies of the Software, and to permit persons to whom the Software is',
  'furnished to do so, subject to the following conditions:',
  '',
  'The above copyright notice and this permission notice shall be included in',
  'all copies or substantial portions of the Software.',
  '',
  'THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR',
  'IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,',
  'FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE',
  'AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER',
  'LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,',
  'OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN',
  'THE SOFTWARE.',
  '',
].join('\n');

const changelog = [
  '### HEAD',
  '',
  '',
  '### 0.0.0 (Month Day, Year)',
  '',
  '  * Initial build.',
  ''].join('\n');

const gitignore = '';


// -- Private functions --------------------------------------------------------
/* eslint-disable no-underscore-dangle */

/**
 * Removes the cached files and returns the array.
 *
 * @function (arg1)
 * @private
 * @param {Array}     an array of files,
 * @returns {Array}   returns the filtered array,
 */
function _filter(files) {
  const filtered = []
    ;

  for (let i = 0; i < files.length; i++) {
    if (!files[i].match(/^\./)) {
      filtered.push(files[i]);
    }
  }

  return filtered;
}

/**
 * Copies source file to destination.
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}    the source file,
 * @param {String}    the destination file,
 * @returns {}        -,
 */
function _copyFile(source, dest) {
  fs.createReadStream(source).pipe(fs.createWriteStream(dest));
}

/**
 * Copies source data to destination file.
 *
 * @function (arg1, arg2)
 * @private
 * @param {String}    the destination path,
 * @param {Array}     the files to create and their contents,
 * @returns {}        -,
 */
function _createFiles(destpath, files) {
  let s
    ;

  for (let i = 0; i < files[0].length; i++) {
    // Convert the string to a readable stream:
    s = new Readable();
    s.push(files[0][i]);
    s.push(null);
    // Write the stream to the destination file:
    s.pipe(fs.createWriteStream(path.join(destpath, files[1][i])));
    process.stdout.write(`  ${files[1][i]}\n`);
  }
}

/**
 * Removes ES5Lib dependencies to package.json.
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {String}    the root path of ES5Lib,
 * @param {String}    the root path of UMD library,
 * @param {String}    the name of the UMD library,
 * @returns {}        -,
 */
function _customizeApp(locbaseumdlib, locbaseapp, locappname) {
  const npm   = 'package.json'
    ;

  // Read package.json:
  fs.readFile(path.join(locbaseumdlib, npm), 'utf8', (error, data) => {
    if (error) {
      throw error;
    }

    // Fix package.json:
    const obj = JSON.parse(data);
    const pack = {};
    pack.name = locappname.toLowerCase();
    pack.version = '0.0.0';
    pack.description = `${locappname} ...`;
    pack.main = obj.main;
    pack.bin = {};
    pack.scripts = obj.scripts;
    pack.repository = obj.repository;
    pack.repository.url = 'https://github.com/author/libname.git';
    pack.keywords = [];
    pack.author = obj.author;
    pack.author.name = 'John Doe';
    pack.author.email = 'jdo@johndoe.com';
    pack.author.url = 'http://www.johndoe.com';
    pack.license = obj.license;
    pack.bugs = obj.bugs;
    pack.bugs.url = 'https://github.com/author/libname/issues';
    pack.homepage = 'https://github.com/author/libname';
    pack.dependencies = {};
    pack.devDependencies = obj.devDependencies;

    // Write the updated package.json:
    fs.writeFile(path.join(locbaseapp, npm), JSON.stringify(pack, null, 2), 'utf8', (err) => {
      if (err) {
        throw err;
      }

      process.stdout.write(`  ${npm}\n`);
    });
  });
}

/**
 * Removes ES5Lib dependencies to the Gulpfile config.js.
 *
 * @function (arg1, arg2, arg3)
 * @private
 * @param {String}    the root path of ES5Lib,
 * @param {String}    the root path of UMD library,
 * @param {String}    the name of the UMD library,
 * @returns {}        -,
 */
function _customizeGulp(locbaseumdlib, locbaseapp, locappname) {
  const config = 'config.js'
    ;
  // Read config.js file:
  fs.readFile(path.join(locbaseumdlib, tasks, config), 'utf8', (error, data) => {
    if (error) {
      throw error;
    }

    // Replace 'ES5Lib' by the new name of the lib:
    const conf = data.replace(/ES5Lib/, locappname);
    // Save it:
    fs.writeFile(path.join(locbaseapp, tasks, config), conf, 'utf8', (err) => {
      if (err) {
        throw error;
      }
      process.stdout.write(`  ${tasks}/${config}\n`);
    });
  });
}

/**
 * Copies one src file.
 *
 * @function (arg1, arg2, arg3, arg4)
 * @private
 * @param {String}    the path of the src files,
 * @param {String}    the path of the destination files,,
 * @param {Array}     the name of src file,
 * @param {String}    the name of the app,
 * @returns {}        -,
 */
/* eslint-disable no-loop-func */
function _copySrcFile(source, dest, file, app) {
  const re  = new RegExp('ES5Lib', 'g')
      , re2 = new RegExp('{{template:version}}')
      ;
  let s
    ;

  fs.readFile(path.join(source, file), 'utf8', (error, data) => {
    if (error) { throw error; }
    s = data.replace(re, app).replace(re2, version);
    fs.writeFile(path.join(dest, file), s, 'utf8', (err) => {
      if (err) { throw err; }
      process.stdout.write(`  ${src}/${file}\n`);
    });
  });
} /* eslint-enable no-loop-func */

/**
 * Copies src files.
 *
 * @function (arg1, arg2, arg3, arg4)
 * @private
 * @param {String}    the path of the src files,
 * @param {String}    the path of the destination files,,
 * @param {Array}     the name of src files,
 * @param {String}    the name of the app,
 * @returns {}        -,
 */
/* eslint-disable no-loop-func */
function _copySrcFiles(source, dest, files, app) {
  let sub;

  for (let i = 0; i < files.length; i++) {
    if (fs.lstatSync(path.join(source, files[i])).isFile()) {
      _copySrcFile(source, dest, files[i], app);
    } else if (fs.lstatSync(path.join(source, files[i])).isDirectory()) {
      sub = _filter(fs.readdirSync(path.join(source, files[i])));
      fs.mkdirSync(path.join(dest, files[i]));
      _copySrcFiles(path.join(source, files[i]), path.join(dest, files[i]), sub, app);
    }
  }
} /* eslint-enable no-loop-func */

/**
 * Displays help message.
 *
 * @function ()
 * @private
 */
function _help() {
  const message = ['',
    'Usage: command [options]',
    '',
    'populate            populate the app',
    '',
    'Options:',
    '',
    '-h, --help          output usage information',
    '-v, --version       output the version number',
    '-n, --name          the name of the app',
    '',
  ].join('\n');

  process.stdout.write(`${message}\n`);
  process.exit(0);
}

/**
 * Creates and populates the web app.
 *
 * @function (arg1)
 * @private
 * @param {Object}    the command line options,
 * @returns {}        -,
 */
function _populate(locopts) {
  const app = locopts.name || 'myApp'
      , newFiles = [
        [readme, license, changelog, gitignore],
        ['README.md', 'LICENSE.md', 'CHANGELOG.md', '.gitignore'],
      ]
      , dupFiles = ['index.js', '.travis.yml', 'eslint.sh', 'eslintrc-es5', 'eslintrc-es6', 'gulpfile.js']
      , srcFiles = _filter(fs.readdirSync(path.join(baseumdlib, src)))
      , taskFiles = _filter(fs.readdirSync(path.join(baseumdlib, tasks)))
      , testFiles = _filter(fs.readdirSync(path.join(baseumdlib, test)))
      ;

  // Check the folder app is empty:
  process.stdout.write('Checks that the folder app is empty...\n');
  const files = _filter(fs.readdirSync(baseapp));
  if (files.length > 1 || (files[0] !== undefined && files[0] !== 'node_modules')) {
    process.stdout.write('This folder already contains files and/or folders. Clean it up first! Process aborted...\n');
    process.exit(1);
  }

  // Ok. Populate it:
  process.stdout.write('Populates the folder with:\n');

  // Create README.md, LICENSE.md, CHANGELOG.md, gitignore:
  _createFiles(baseapp, newFiles);

  // Duplicate index.js, ...
  for (let i = 0; i < dupFiles.length; i++) {
    process.stdout.write(`  ${dupFiles[i]}\n`);
    _copyFile(path.join(baseumdlib, dupFiles[i]), path.join(baseapp, dupFiles[i]));
  }

  // Add and customize package.json:
  _customizeApp(baseumdlib, baseapp, app);

  // Copy Gulp task files:
  fs.mkdirSync(path.join(baseapp, tasks));
  for (let i = 0; i < taskFiles.length; i++) {
    process.stdout.write(`  ${tasks}/${taskFiles[i]}\n`);
    _copyFile(path.join(baseumdlib, tasks, taskFiles[i]), path.join(baseapp, tasks, taskFiles[i]));
  }
  // Customizes config.js:
  _customizeGulp(baseumdlib, baseapp, app);

  // Copy src files:
  fs.mkdirSync(path.join(baseapp, src));
  _copySrcFiles(path.join(baseumdlib, src), path.join(baseapp, src), srcFiles, app);

  // Copy test files:
  fs.mkdirSync(path.join(baseapp, test));
  _copySrcFiles(path.join(baseumdlib, test), path.join(baseapp, test), testFiles, app);

  // process.stdout.write('Done. Enjoy!\n');
}
/* eslint-disable no-underscore-dangle */

// -- Main
if (parsed.help) {
  _help();
}

if (parsed.version) {
  // console.log('umdlib version: ' + parsed.version);
  process.stdout.write(`umdlib version: ${parsed.version}\n`);
  process.exit(0);
}

if (parsed.argv.remain[0] === 'populate') {
  _populate(parsed);
} else {
  _help();
}
