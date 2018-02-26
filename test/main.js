// ESLint declarations:
/* global describe, it */
/* eslint one-var: 0, no-unused-vars: 0, semi-style: 0 */

// -- Node modules
const should     = require('chai').should()
    , { expect } = require('chai')
    ;

// -- Local modules
const ES5Lib = require('../src/prototypal.js')
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

  describe('Test ES5Lib constructor and methods:', () => {
    const o = ES5Lib();

    it('Expects ES5Lib() to return an object.', () => {
      expect(o).to.be.an('object');
    });

    it('Expects this object to own the property "string" that is a function.', () => {
      expect(o).to.have.property('string').that.is.a('function');
    });

    it('Expects this object to own the property "array" that is a function.', () => {
      expect(o).to.have.property('array').that.is.a('function');
    });

    it('Expects "string" to return the string "I am a string!".', () => {
      expect(o.string()).to.be.a('string').that.is.equal('I am a string!');
    });

    it('Expects "array" to return the string "I am an array!".', () => {
      expect(o.array()).to.be.a('string').that.is.equal('I am an array!');
    });
  });
});
