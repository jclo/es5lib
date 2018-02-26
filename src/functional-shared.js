/** ****************************************************************************
 *
 * A ...
 *
 * functional-shared.js is built upon the Functional Shared Instantiation
 * pattern. It returns an object by calling its constructor. It doesn't use
 * the new keyword.
 *
 * This pattern allows the objects to share the same methods. It saves space
 * in memory compared to the Functional Instantiation Pattern. So, it should
 * be preferred to this last one.
 *
 * Private Functions:
 *  . extend                 adds new properties to an object,
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
  , methods
  , root
  , extend
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
extend = function(object, objMethods) {
  var keys = Object.keys(objMethods)
    , i
    ;

  for (i = 0; i < keys.length; i++) {
    object[keys[i]] = objMethods[keys[i]];
  }
}; /* eslint-enable no-param-reassign */


// -- Public -------------------------------------------------------------------

/**
 * Returns the object ES5Lib.
 * (Functional Shared Instantiation Pattern)
 *
 * @constructor ()
 * @public
 * @param {String}    the argument to be saved as an object variable,
 * @returns {Object}  returns the ES5Lib object,
 * @since 0.0.0
 */
ES5Lib = function(name) {
  var obj = {};
  obj.name = name;
  extend(obj, methods);
  return obj;
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


// -- Public Methods -----------------------------------------------------------

methods = {

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
