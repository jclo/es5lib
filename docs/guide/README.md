# Guide

ES5Lib is a template for writing large ES5 Javascript libraries that run both in Node.js and the browser.

The source code can be split into multiple files as on Node.js thanks to `module.exports` and `require` statements.

ES5Lib relies on [Browserify](http://browserify.org) to bundle all the files together in an unique UMD library that can run in a browser.

ES5Lib relies on [Mocha](https://mochajs.org) and [Chai](http://chaijs.com) for unitary testing. It relies on [Istanbul](https://gotwarlost.github.io/istanbul/) for code coverage.

ES5Lib uses [Travis CI](https://travis-ci.org) for continuous integration and [Coveralls.io](https://coveralls.io) to display test coverage.


## Quick Startup

You can easily get your first UMD library running in a couple of minutes by just typing a few command lines. But first, you need to create an empty folder. It will contain your library.

Then, you have to install the `ES5Lib` package globally. Open a terminal session and type the command line:

```
npm install es5lib -g
```

Or, if you don't have the rights to install ES5Lib globally, you can install it locally in your project. Open a terminal session, move to your working directory - the empty folder you created - and type the following command line:

```
npm install es5lib
```

Now populate your empty folder and create your first UMD library:

```
// populate
es5lib populate -n myapp
// Or, if you installed the package locally:
./node_modules/es5lib/bin/es5lib.js populate -n myapp
// Install Node.js packages
npm install
```

Now your folder contains the following files:

```
YourFolder
    |_ lib
    |   |_ es5lib.js         // Your library generated by the build,
    |
    |_ src
    |   |_ xxx.js            // The sources files,
    |   |_ yyy.js
    |   |_ zzz.js
    |
    |_ tasks
    |   |_ config.js         // The build configuration file,
    |   |_ browserify.js     // The Gulp build to bundle the source files,
    |   |_ makedist          // The Gulp build to create a distribution,
    |
    |_ test
    |   |_ main.js           // Your Mocha, Chai test file,
    |
    |_ .eslintrc             // A Configuration file for the ESLint linter tool (if you use it),
    |_ .gitignore            // Files that Git must ignore (if you use git),
    |_ .travis.yml           // A configuration file for Travis CI (if you use it),
    |
    |_ CHANGELOG.md          // The changes between your different versions,
    |_ eslint.sh             // A Bash script to switch from ES5 to ES6 linter,
    |_ eslint-es5            // The ES5 configuration file for the linter,
    |_ eslint-es6            // The ES6 configuration file for the linter,
    |_ gulpfile.js           // The general Gulp build,
    |_ index.js              // The link to the entry point of your UMD library,
    |_ LICENSE.md            // The license that applies to your library (here MIT),
    |_ package.json          // The NPM package dependencies for your library,
    |_ README.md             // Your README file,
```

This folder is now a NPM package.

## How to build it

The file `gulpfile.js` contains the build instructions. These instructions populate the folder `lib` from the sources files included in the folder `src`.

`gulpfile.js` implements three operations for the build:
  * the command `npm run build` creates the library at the execution,
  * the command `npm run watch` updates the library when one of the source files is modified,
  * the command `npm run makedist` creates a distribution version,

## How to test it

Your `package.json` file contains three scripts to test your UMD library:

  * `npm run test`,
  * `npm run check-coverage`,
  * `npm run display-coverage`,
  * `npm run report`.

`npm run test` executes the tests and computes the test coverage.

`npm run check-coverage` checks if the test coverage matches the requirements. Here 100%.

`npm run display-coverage` opens your browser and reports the test coverage.

`npm run report` prints a table showing the percentage of coverage.


## How to use it

On Node.js, your project folder is viewed as a NPM package. Choose a working directory outside your project folder, create a folder `node_modules` and copy your project folder into `node_modules`. Then, on your terminal, type (at your working directory level):

```
node
> const MyLib = require('my_umd_lib');
undefined
> const mylib = MyLib();
> mylib.string();
'I am a string!'
> mylib.array();
'I am an array!'
>
```

On the browser, pick-up the JS file `lib/es5lib.js` and add it as a script in your HTML file. `es5lib` is an immediately-invoked function expression. It attaches the `ES5Lib` variable to the current context.

```
<!DOCTYPE html>
<html>
  <body>
    <script src="es5lib.js"></script>
    <script>
    	console.log(ES5Lib.VERSION);
    </script>
  </body>
</html>
```

Enjoy!