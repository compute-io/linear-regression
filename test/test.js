/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	lr = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'compute-linear-regression', function tests() {

	it( 'should export a function', function test() {
		expect( lr ).to.be.a( 'function' );
	});

	it( 'should do something' );

});
