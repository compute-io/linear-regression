/* global require, describe, it, beforeEach */
'use strict';

// MODULES //

var // Expectation library:
	chai = require( 'chai' ),

	// Module to be tested:
	createModel = require( './../lib/model.js' ),

	// Utility for computing the mean of an array:
	mean = require( './../lib/mean.js' ),

	// Fixture data:
	data = require( './fixtures/data.json' );


// VARIABLES //

var expect = chai.expect,
	assert = chai.assert;


// TESTS //

describe( 'model', function tests() {

	// SETUP //

	var model,
		len,
		x, y,
		xmu, ymu,
		i;

	len = data.length;

	x = [];
	for ( i = 0; i < len; i++ ) {
		x.push( data[ i ][ 0 ] );
	}
	y = [];
	for ( i = 0; i < len; i++ ) {
		y.push( data[ i ][ 1 ] );
	}
	xmu = mean( x );
	ymu = mean( y );

	beforeEach( function before() {
		model = createModel( x, y, xmu, ymu, 5, 5 );
	});


	// TESTS //

	it( 'should export a function', function test() {
		expect( createModel ).to.be.a( 'function' );
	});

	it( 'should return a model object', function test() {
		assert.isObject( model );
	});

	describe( 'model#params', function tests() {

		it( 'should have an attribute to access model parameters', function test() {
			expect( model.params ).to.be.an ('array' );
		});

		it( 'should be immutable', function test() {
			var params = model.params;

			params[ 0 ] = 'foo';
			assert.notOk( model.params[ 0 ] === params[ 0 ] );

			expect( foo ).to.throw( Error );
			function foo() {
				model.params = 'beep';
			}
		});

		it( 'should contain a numeric y-intercept', function test() {
			expect( model.params[ 0 ] ).to.be.a( 'number' );
		});

		it( 'should contain a numeric slope', function test() {
			expect( model.params[ 1 ] ).to.be.a( 'number' );
		});

	}); // end TESTS params

	describe( 'model#residuals', function tests() {

		it( 'should provide an attribute to access model residuals', function test() {
			expect( model.residuals ).to.be.an( 'array' );
		});

		it( 'should return the residuals', function test() {
			var actual, expected;

			actual = model.residuals;
			expected = [
				-5,
				5,
				-8,
				8,
				-1.5,
				1.5,
				-6,
				6,
				-0.25,
				0.25
			];

			assert.deepEqual( actual, expected );
		});

		it( 'should be immutable', function test() {
			var arr = model.residuals;

			arr[ 0 ] = 'foo';
			assert.notOk( model.residuals[ 0 ] === arr[ 0 ] );

			expect( foo ).to.throw( Error );
			function foo() {
				model.residuals = 'beep';
			}
		});

	}); // end TESTS residuals

	describe( 'model#fit', function tests() {

		it( 'should provide an attribute to access the model fit', function test() {
			expect( model.fit ).to.be.an( 'array' );
		});

		it( 'should return the fit', function test() {
			var actual, expected;

			actual = model.fit;
			expected = [
				5,
				5,
				10,
				10,
				15,
				15,
				20,
				20,
				25,
				25
			];

			assert.deepEqual( actual, expected );
		});

		it( 'should be immutable', function test() {
			var arr = model.fit;

			arr[ 0 ] = 'foo';
			assert.notOk( model.fit[ 0 ] === arr[ 0 ] );

			expect( foo ).to.throw( Error );
			function foo() {
				model.fit = 'beep';
			}
		});

	}); // end TESTS fit

	describe( 'model#ci', function tests() {

		it( 'should provide an attribute to access confidence intervals for estimated model parameters', function test() {
			expect( model.ci ).to.be.an( 'array' );
		});

		it( 'should return an array of arrays', function test() {
			var ci = model.ci;
			assert.isArray( ci );
			for ( var i = 0; i < ci.length; i++ ) {
				assert.isArray( ci[ i ] );
			}
		});

		it( 'should be immutable', function test() {
			var arr = model.ci;

			arr[ 0 ] = 'foo';
			assert.notOk( model.ci[ 0 ] === arr[ 0 ] );

			arr[ 0 ][ 0 ] = 'foo';
			assert.notOk( model.ci[ 0 ][ 0 ] === arr[ 0 ][ 0 ] );

			expect( foo ).to.throw( Error );
			function foo() {
				model.ci = 'beep';
			}
		});

		it( 'should compute confidence intervals for estimated model parameters' );

	}); // end TESTS ci

	describe( 'model#summary', function tests() {

		it( 'should provide an attribute to access a model\'s statistical summary', function test() {
			expect( model.summary ).to.be.an( 'object' );
		});

		it( 'should be immutable', function test() {
			var summary = model.summary;

			summary.a = 'foo';
			assert.notOk( model.summary.hasOwnProperty( 'a' ) );

			expect( foo ).to.throw( Error );
			function foo() {
				model.summary = 'beep';
			}
		});

		it( 'should generate a statistical summary', function test() {
			console.log( model.summary );

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

		it( 'should throw an error if provided a copy option which is not a boolean', function test() {
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
						'copy': value
					});
				};
			}
		});

		it( 'should compute a predicted response', function test() {
			var actual, expected;

			actual = model.predict( 0 );
			expected = 5;

			assert.strictEqual( actual, expected );

			actual = model.predict( 4 );
			expected = 25;

			assert.strictEqual( actual, expected );

			actual = model.predict( 5 );
			expected = 30;

			assert.strictEqual( actual, expected );
		});

		it( 'should compute multiple predictions', function test() {
			var actual, expected;

			actual = model.predict( [0,4,5] );
			expected = [ 5, 25, 30 ];

			assert.deepEqual( actual, expected );
		});

		it( 'should compute multiple predictions and return the original array (mutation)', function test() {
			var xi = [ 0, 4, 5 ],
				actual,
				expected;

			expected = [ 5, 25, 30 ];

			// Return a copy...
			actual = model.predict( xi );
			assert.deepEqual( actual, expected );
			assert.notOk( actual === xi );

			// Mutate the original array...
			actual = model.predict( xi, {
				'copy': false
			});
			assert.deepEqual( actual, expected );
			assert.strictEqual( actual, xi );
		});

		it( 'should compute multiple predictions using an accessor', function test() {
			var xi, actual, expected;

			xi = [
				{'x':0},
				{'x':4},
				{'x':5}
			];

			actual = model.predict( xi, {
				'accessor': xValue
			});
			expected = [ 5, 25, 30 ];

			assert.deepEqual( actual, expected );

			function xValue( d ) {
				return d.x;
			}
		});

		it( 'should compute multiple predictions using an accessor and return the original array (mutation)', function test() {
			var xi, actual, expected;

			xi = [
				{'x':0},
				{'x':4},
				{'x':5}
			];

			actual = model.predict( xi, {
				'accessor': xValue,
				'copy': false
			});
			expected = [ 5, 25, 30 ];

			assert.deepEqual( actual, expected );
			assert.strictEqual( actual, xi );

			function xValue( d ) {
				return d.x;
			}
		});

		it( 'should compute a prediction along with confidence intervals' );

		it( 'should compute multiple predictions and their associated confidence intervals' );

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
