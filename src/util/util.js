/** ****************************************************************************
 *
 * A ...
 *
 * basic.js is just a literal object that contains a set of functions. It
 * can't be intantiated.
 *
 * Private Functions:
 *  . ...                    ...,
 *
 * Public Functions:
 *  . string                 returns a string message,
 *  . array                  returns an array message,
 *
 *
 * @namespace    util
 * @dependencies none
 * @exports      -
 * @author       -
 * @since        0.0.0
 * @version      -
 * ************************************************************************** */
/* eslint one-var: 0, semi-style: 0 */

'use strict';

// -- Local modules

// -- Local constants

// -- Local variables


// -- Private Functions ---------------------------------------------------------


// -- Public Functions ---------------------------------------------------------

module.exports = {

  /**
   * Returns a string message.
   *
   * @function ()
   * @public
   * @param {}           -,
   * @returns {String}   returns a string message,
   * @since 0.0.0
   */
  printStringMessage: function() {
    return 'I am a string!';
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
  printArrayMessage: function() {
    return 'I am an array!';
  }
};
