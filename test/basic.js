// ESLint declarations:
/* global describe, it */
/* eslint one-var: 0, no-unused-vars: 0, semi-style: 0 */

// -- Node modules
const should     = require('chai').should()
    , { expect } = require('chai')
    ;

// -- Local modules
const ES5Lib = require('../src/basic.js')
    ;

// -- Local constants

// -- Local variables


// -- Main
describe('Test ES5Lib:', () => {
  // Test the lib:
  describe('Test ES5Lib.VERSION and ES5Lib.noConflict:', () => {
    it('Expects ES5Lib.VERSION to return a string.', () => {
      expect(ES5Lib.VERSION).to.be.a('string');
    });
    it('Expects ES5Lib.noConflict to return a function.', () => {
      expect(ES5Lib.noConflict).to.be.a('function');
    });
  });

  describe('Test the ES5Lib methods:', () => {
    //
    it('Expects ES5Lib to own the method "string".', () => {
      expect(ES5Lib.string).to.be.a('function');
    });

    it('Expects ES5Lib.getString() to return the string "I am a string!".', () => {
      expect(ES5Lib.string()).to.be.a('string').that.is.equal('I am a string!');
    });

    it('Expects ES5Lib to own the method "array".', () => {
      expect(ES5Lib.array).to.be.a('function');
    });

    it('Expects ES5Lib.array() to return the string "I am an array!".', () => {
      expect(ES5Lib.array()).to.be.a('string').that.is.equal('I am an array!');
    });
  });
});
