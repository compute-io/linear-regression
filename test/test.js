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

	it( 'should perform a linear regression', function test() {
		var model, params, x, y;

		// Slope: 1, Intercept: 0
		x = [1,2,3,4,5,6,7,8,9,10];
		y = [1,2,3,4,5,6,7,8,9,10];

		model = lr( x, y );
		params = model.params;

		assert.strictEqual( params[0], 0, 'intercept' );
		assert.strictEqual( params[1], 1, 'slope' );

		// Slope: 2, Intercept: 0
		x = [1,2,3,4,5];
		y = [2,4,6,8,10];

		model = lr( x, y );
		params = model.params;

		assert.strictEqual( params[0], 0, 'intercept' );
		assert.strictEqual( params[1], 2, 'slope' );

		// Slope: -1, Intercept: 6
		x = [1,2,3,4,5];
		y = [5,4,3,2,1];

		model = lr( x, y );
		params = model.params;

		assert.strictEqual( params[0], 6, 'intercept' );
		assert.strictEqual( params[1], -1, 'slope' );

		// Slope: -2, Intercept -5
		x = [1,2,3,4,5];
		y = [-7,-9,-11,-13,-15];

		model = lr( x, y );
		params = model.params;

		assert.strictEqual( params[0], -5, 'intercept' );
		assert.strictEqual( params[1], -2, 'slope' );

		// Slope: 1, Intercept 1
		x = [1,1,2,2,3,3,4,4,5,5,6,6];
		y = [1,3,2,4,3,5,4,6,5,7,6,8];

		model = lr( x, y );
		params = model.params;

		assert.strictEqual( params[0], 1, 'intercept' );
		assert.strictEqual( params[1], 1, 'slope' );
	});

	it( 'should return a corresponding model when provided a slope and intercept', function test() {
		var model, params, x, y;

		x = [1,2,3,4,5];
		y = [9,7,3,6,1];

		model = lr( x, y, {
			'slope': 100,
			'intercept': -999
		});
		params = model.params;

		assert.strictEqual( params[0], -999 );
		assert.strictEqual( params[1], 100 );
	});

	it( 'should compute the intercept if provided a slope', function test() {
		var model, params, x, y;

		x = [1,2,3,4,5];
		y = [11,21,31,41,51];

		model = lr( x, y, {
			'slope': 10
		});
		params = model.params;

		assert.strictEqual( params[0], 1 );
		assert.strictEqual( params[1], 10 );
	});

	it( 'should return the mean of the response variable if the slope is 0', function test() {
		var model, params, x, y;

		x = [1,2,3,4,5,6];
		y = [4,6,3,7,-5,15];

		model = lr( x, y, {
			'slope': 0
		});
		params = model.params;

		assert.strictEqual( params[0], 5 );
		assert.strictEqual( params[1], 0 );
	});

	it( 'should compute the slope if provided the y-intercept', function test() {
		var model, params, x, y;

		// Slope: 100, Intercept: 0
		x = [1,1,2,2,3,3];
		y = [50,150,150,250,250,350];

		model = lr( x, y, {
			'intercept': 0
		});
		params = model.params;

		assert.strictEqual( params[0], 0 );
		assert.strictEqual( params[1], 100 );

		// Slope: -5, Intercept: 10
		x = [1,2,3,4,5];
		y = [5,0,-5,-10,-15];

		model = lr( x, y, {
			'intercept': 10
		});
		params = model.params;

		assert.strictEqual( params[0], 10 );
		assert.strictEqual( params[1], -5 );
	});

	it( 'should perform a linear regression using an x-accessor', function test() {
		var model, params, x, y;

		x = [
			{'x':1},
			{'x':2},
			{'x':3},
			{'x':4},
			{'x':5}
		];
		y = [1,2,3,4,5];

		model = lr( x, y, {
			'accessors': {
				'x': xValue
			}
		});
		params = model.params;

		assert.strictEqual( params[0], 0 );
		assert.strictEqual( params[1], 1 );

		function xValue( d ) {
			return d.x;
		}
	});

	it( 'should perform a linear regression using a y-accessor', function test() {
		var model, params, x, y;

		x = [1,2,3,4,5];
		y = [
			['beep',1],
			['boop',2],
			['foo',3],
			['bar',4],
			['woo',5]
		];

		model = lr( x, y, {
			'accessors': {
				'y': yValue
			}
		});
		params = model.params;

		assert.strictEqual( params[0], 0 );
		assert.strictEqual( params[1], 1 );

		function yValue( d ) {
			return d[ 1 ];
		}
	});

	it( 'should perform a linear regression on a zipped array', function test() {
		var model, params, data;

		data = [
			[1,4],
			[2,6],
			[3,8],
			[4,10],
			[5,12]
		];

		model = lr( data );
		params = model.params;

		assert.strictEqual( params[0], 2 );
		assert.strictEqual( params[1], 2 );
	});

	it( 'should perform a linear regression on a single object array using accessors', function test() {
		var model, params, data;

		data = [
			{'x':2,'y':6},
			{'x':4,'y':5},
			{'x':6,'y':4},
			{'x':8,'y':3},
			{'x':10,'y':2}
		];

		model = lr( data, {
			'accessors': {
				'x': xValue,
				'y': yValue
			}
		});
		params = model.params;

		assert.strictEqual( params[0], 7 );
		assert.strictEqual( params[1], -0.5 );

		function xValue( d ) {
			return d.x;
		}
		function yValue( d ) {
			return d.y;
		}
	});

});
