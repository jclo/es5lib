/** ****************************************************************************
 *
 * A ...
 *
 * basicplus.js is based on a variation of the basic.js pattern. The
 * properties are added dynamically. Thus, it can be divided in several
 * chunks of properties and the build can produces several versions of the
 * library by including or not some chunks.
 *
 * Private Functions:
 *  . ...                    ...,
 *
 * Public Functions:
 *  . string                 returns a string,
 *  . array                  returns an array,
 *
 *
 * @namespace    ES5Lib
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ************************************************************************** */
/* eslint one-var: 0, semi-style: 0 */

'use strict';

// -- Local modules
var util = require('./util/util')
  ;

// -- Local constants

// -- Local variables
var ES5Lib
  , previousES5Lib
  , root
  ;

// Define the global space (lost with Browserify):
/* eslint-disable space-infix-ops, block-spacing, space-before-blocks, semi, keyword-spacing, no-restricted-globals, max-len */
/* istanbul ignore next */
if (typeof window!=='undefined'){root=window}else if(typeof global!=='undefined'){root=global}else if(typeof self!=='undefined'){root=self}else{root=this}
/* eslint-enable space-infix-ops, block-spacing, space-before-blocks, semi, keyword-spacing, no-restricted-globals */
/* eslint-enable max-len */


// -- Private Functions ------------------------------------------------------

/**
 * Extends the object with new methods.
 *
 * Nota: this function mutates the object.
 *
 * @function (arg1, arg2)
 * @private
 * @param {Object}    the object to extend,
 * @param {Object}    an object containing a set of methods,
 * @returns {}        -,
 * @since 0.0.0
 */
/* eslint-disable no-param-reassign */
var extend = function(object, methods) {
  var keys = Object.keys(methods)
    , i
    ;

  for (i = 0; i < keys.length; i++) {
    object[keys[i]] = methods[keys[i]];
  }
}; /* eslint-enable no-param-reassign */


// -- Public -------------------------------------------------------------------

// Initializes the object:
ES5Lib = {
  // Filled when the library is loaded.
};

// Saves the previous value of the library variable, so that it can be
// restored later on, if noConflict is used.
previousES5Lib = root.ES5Lib;

// Runs ES5Lib in noConflict mode, returning the ES5Lib variable to its
// previous owner. Returns a reference to this ES5Lib object.
/* istanbul ignore next */
ES5Lib.noConflict = function() {
  root.ES5Lib = previousES5Lib;
  return this;
};

// Current version of the library:
ES5Lib.VERSION = '{{lib:version}}';

// Export the module:
module.exports = ES5Lib;


// -- Public Functions ---------------------------------------------------------
extend(ES5Lib, {

  /**
   * Returns a string message.
   *
   * @function ()
   * @public
   * @param {}           -,
   * @returns {String}   returns a string message,
   * @since 0.0.0
   */
  string: function() {
    return util.printStringMessage();
  },

  /**
   * Returns an array message.
   *
   * @function ()
   * @public
   * @param {}          -,
   * @returns {Array}   returns an array message,
   * @since 0.0.0
   */
  array: function() {
    return util.printArrayMessage();
  }
});
