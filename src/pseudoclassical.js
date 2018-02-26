/** ****************************************************************************
 *
 * A ...
 *
 * pseudoclassical.js is built upon the Pseudoclassical Instantiation pattern.
 * It returns an object by calling its constructor with the new
 * keyword.
 *
 * Private Functions:
 *  . ...                    ...,
 *
 * Public Methods:
 *  . string                 returns a string message,
 *  . array                  returns an array message,
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


// -- Public -------------------------------------------------------------------

/**
 * Initializes the object.
 * (Pseudoclassical Instantiation Pattern)
 *
 * @constructor (arg1)
 * @public
 * @param {String}      argument to be saved as an object variable,
 * @returns {}          -,
 * @throws {Object}     throws an error if the object isn't created by caller,
 * @since 0.0.0
 */
ES5Lib = function(name) {
  if (!(this instanceof ES5Lib)) {
    /* istanbul ignore next */
    throw new Error('ES5Lib needs to be called with the new keyword!');
  }
  this.name = name;
};

// Saves the previous value of the library variable, so that it can be
// restored later on, if noConflict is used.
previousES5Lib = root.ES5Lib;

// Runs ES5Lib in noConflict mode, returning the ES5Lib variable to its
// previous owner. Returns a reference to this ES5Lib object.
/* istanbul ignore next */
/* eslint-disable no-param-reassign */
ES5Lib.noConflict = function() {
  root.ES5Lib = previousES5Lib;
  return this;
};
/* eslint-enable no-param-reassign */

// Current version of the library:
ES5Lib.VERSION = '{{lib:version}}';

// Export the module:
module.exports = ES5Lib;


// -- Public Methods ---------------------------------------------------------

ES5Lib.prototype = {

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
};
