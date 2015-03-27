/* global require, describe, it */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	createModel = require( './../lib' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'model', function tests() {

	var model = createModel( [1,2], [1,2], 1, 0 );

	it( 'should export a function', function test() {
		expect( createModel ).to.be.a( 'function' );
	});

	it( 'should return a model object', function test() {
		assert.isObject( model );
	});

	describe( 'model#coeffs', function tests() {

		it( 'should have a coefficients attribute', function test() {
			expect( model.coefficients ).to.be.an ('object' );
		});

		it( 'should be read-only' );

		it( 'should contain a numeric slope' );

		it( 'should contain a numeric y-intercept' );

	}); // end TESTS coeffs

	describe( 'model#residuals', function tests() {

		it( 'should provide a method to calculate residuals', function test() {
			expect( model.residuals ).to.be.a( 'function' );
		});

		it( 'should return an array', function test() {
			expect( model.residuals() ).to.be.an( 'array' );
		});

		it( 'should compute the residuals' );

	}); // end TESTS residuals

	describe( 'model#ci', function tests() {

		it( 'should provide a method to compute confidence intervals for estimated model parameters', function test() {
			expect( model.ci ).to.be.a( 'function' );
		});

		it( 'should return a(n)...' );

		it( 'should compute confidence intervals for estimated model parameters' );

	}); // end TESTS ci

	describe( 'model#summary', function tests() {

		it( 'should provide a method to generate a statistical summary', function test() {
			expect( model.summary ).to.be.a( 'function' );
		});

		it( 'should return an object', function test() {
			expect( model.summary() ).to.be.an( 'object' );
		});

		it( 'should generate a statistical summary' );

	}); // end TESTS summary

	describe( 'model#predict', function tests() {

		it( 'should provide a method to compute a predicted response', function test() {
			expect( model.predict ).to.be.a( 'function' );
		});

		it( 'should throw an error if not provided either a single numeric value or an array of numeric values', function test() {
			var values = [
				'5',
				null,
				undefined,
				true,
				NaN,
				{},
				function(){}
			];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}
			function badValue( value ) {
				return function() {
					model.predict( value );
				};
			}
		});

		it( 'should throw an error if provided an options argument which is not an object', function test() {
			var values = [
				'5',
				5,
				null,
				undefined,
				true,
				NaN,
				[],
				function(){}
			];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}
			function badValue( value ) {
				return function() {
					model.predict( [1,2], value );
				};
			}
		});

		it( 'should throw an error if provided an accessor which is not a function', function test() {
			var values = [
				'5',
				5,
				null,
				undefined,
				true,
				NaN,
				[],
				{}
			];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}
			function badValue( value ) {
				return function() {
					model.predict( [1,2], {
						'accessor': value
					});
				};
			}
		});

		it( 'should throw an error if provided an CI option which is not a boolean', function test() {
			var values = [
				'5',
				5,
				null,
				undefined,
				function(){},
				NaN,
				[],
				{}
			];

			for ( var i = 0; i < values.length; i++ ) {
				expect( badValue( values[i] ) ).to.throw( TypeError );
			}
			function badValue( value ) {
				return function() {
					model.predict( [1,2], {
						'ci': value
					});
				};
			}
		});

		it( 'should compute a predicted response' );

	}); // end TESTS predict

	describe( 'model#toString', function tests() {

		it( 'should provide a method to pretty print a model', function test() {
			expect( model.toString ).to.be.a( 'function' );
		});

		it( 'should return a string', function test() {
			expect( model.toString() ).to.be.a( 'string' );
		});

		it( 'should pretty print a model' );

	}); // end TESTS toString

});
