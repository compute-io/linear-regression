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

	it( 'should throw an error if not provided a data array', function test() {
		var values = [
			'5',
			5,
			NaN,
			null,
			undefined,
			true,
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				lr( value );
			};
		}
	});

	it( 'should throw an error if not provided an array or an options object as a second argument', function test() {
		var values = [
			'5',
			5,
			NaN,
			null,
			undefined,
			true,
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				lr( [[1,1],[2,2]], value );
			};
		}
	});

	it( 'should throw an error if provided a dependent variable which is not an array', function test() {
		var values = [
			'5',
			5,
			NaN,
			null,
			undefined,
			true,
			{},
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				lr( [1,2,3], value, {} );
			};
		}
	});

	it( 'should throw an error if provided an options argument which is not an object', function test() {
		var values = [
			'5',
			5,
			NaN,
			null,
			undefined,
			true,
			[],
			function(){}
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				lr( [1,2], [1,2], value );
			};
		}
	});

	it( 'should throw an error if the independent and dependent variable arrays are of unequal length', function test() {
		expect( foo ).to.throw( Error );
		function foo() {
			lr( [1,2], [1,2,3] );
		}
	});

	it( 'should throw an error if provided an accessors option which is not an object', function test() {
		var values = [
			'5',
			5,
			NaN,
			null,
			undefined,
			true,
			function(){},
			[]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				lr( [1,2], [1,2], {
					'accessors': value
				});
			};
		}
	});

	it( 'should throw an error if provided an x-accessor which is not a function', function test() {
		var values = [
			'5',
			5,
			NaN,
			null,
			undefined,
			true,
			{},
			[]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				lr( [1,2], [1,2], {
					'accessors': {
						'x': value
					}
				});
			};
		}
	});

	it( 'should throw an error if provided a y-accessor which is not a function', function test() {
		var values = [
			'5',
			5,
			NaN,
			null,
			undefined,
			true,
			{},
			[]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				lr( [1,2], [1,2], {
					'accessors': {
						'y': value
					}
				});
			};
		}
	});

	it( 'should throw an error if provided a non-numeric slope', function test() {
		var values = [
			'5',
			function(){},
			NaN,
			null,
			undefined,
			true,
			{},
			[]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				lr( [1,2], [1,2], {
					'slope': value
				});
			};
		}
	});

	it( 'should throw an error if provided a non-numeric intercept', function test() {
		var values = [
			'5',
			function(){},
			NaN,
			null,
			undefined,
			true,
			{},
			[]
		];

		for ( var i = 0; i < values.length; i++ ) {
			expect( badValue( values[i] ) ).to.throw( TypeError );
		}
		function badValue( value ) {
			return function() {
				lr( [1,2], [1,2], {
					'intercept': value
				});
			};
		}
	});

	it( 'should return a model object', function test() {
		assert.isObject( lr( [1,2], [1,2] ) );
	});

	it( 'should...' );

});
