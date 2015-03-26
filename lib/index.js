/**
*
*	COMPUTE: linear-regression
*
*
*	DESCRIPTION:
*		- Computes a least squares estimator of a linear regression model having a single explanatory variable.
*
*
*	NOTES:
*		[1]
*
*
*	TODO:
*		[1]
*
*
*	LICENSE:
*		MIT
*
*	Copyright (c) 2015. Athan Reines.
*
*
*	AUTHOR:
*		Athan Reines. kgryte@gmail.com. 2015.
*
*/

'use strict';

// MODULES //

var isObject = require( 'validate.io-object' ),
	isArray = require( 'validate.io-array' ),
	isFunction = require( 'validate.io-function' ),
	isNumber = require( 'validate.io-number' ),
	createModel = require( './model.js' );


// FUNCTIONS //

/**
* FUNCTION: xValue( d )
*	x-value accessor when provided a zipped array.
*
* @private
* @param {Array} d - tuple
* @returns {Number} x-value
*/
function xValue( d ) {
	return d[ 0 ];
} // end FUNCTION xValue()

/**
* FUNCTION: yValue( d )
*	y-value accessor when provided a zipped array.
*
* @private
* @param {Array} d - tuple
* @returns {Number} y-value
*/
function yValue( d ) {
	return d[ 1 ];
} // end FUNCTION yValue()


// LINEAR REGRESSION //

/**
* FUNCTION: lr( x[, y[, options]] )
*	Computes a least squares estimator of a linear regression model having a single explanatory variable.
*
* @param {Array|Array[]} x - independent variable array (regressor) or zipped array
* @param {Array} [y] - dependent variable array (response)
* @param {Object} [options] - function options
* @returns {Model} new Model instance
*/
function lr( arr, val, options ) {
	var nargs = arguments.length,
		x = arr,
		slope,
		yint,
		opts,
		xVal,
		yVal,
		y,
		len,
		tmp,
		i;

	// [0] Validate input array:
	if ( !isArray( x ) ) {
		throw new TypeError( 'lr()::invalid input argument. First argument must be an array. Value: `' + x + '`.' );
	}
	// [1] Check if provided a single array and options or two arrays...
	if ( nargs === 2 ) {
		if ( isObject( val ) ) {
			opts = val;
		}
		else if ( isArray( val ) ) {
			y = val;
		}
		else {
			throw new TypeError( 'lr()::invalid input argument. Second argument must either be a dependent variable array or an options object. Value: `' + val + '`.' );
		}
	}
	// [2] Validate that the second argument is an array and options is an object...
	else if ( nargs === 3 ) {
		y = val;
		if ( !isArray( y ) ) {
			throw new TypeError( 'lr()::invalid input argument. Second argument must be an array. Value: `' + y + '`.' );
		}
		opts = options;
		if ( !isObject( opts ) ) {
			throw new TypeError( 'lr()::invalid input argument. Options must be an object. Value: `' + opts + '`.' );
		}
	}
	len = x.length;

	// [3] Validate that the explanatory variable array and the response array are the same length...
	if ( y ) {
		if ( len !== y.length ) {
			throw new Error( 'lr()::invalid input argument. Input arrays must be of equal length.' );
		}
	} else {
		// If no response array, we require accessors to extract the response values from the input array...
		xVal = xValue;
		yVal = yValue;
	}
	// [4] Validate the function options...
	if ( opts ) {
		if ( opts.hasOwnProperty( 'accessors' ) ) {
			if ( !isObject( opts.accessors ) ) {
				throw new TypeError( 'lr()::invalid option. Accessors option must be an object. Option: `' + opts.accessors + '`.' );
			}
			if ( opts.accessors.hasOwnProperty( 'x' ) ) {
				xVal = opts.accessors.x;
				if ( !isFunction( xVal ) ) {
					throw new TypeError( 'lr()::invalid option. x-accessor must be a function. Option: `' + xVal + '`.' );
				}
			}
			if ( opts.accessors.hasOwnProperty( 'y' ) ) {
				yVal = opts.accessors.y;
				if ( !isFunction( yVal ) ) {
					throw new TypeError( 'lr()::invalid option. y-accessor must be a function. Option: `' + yVal + '`.' );
				}
			}
		}
		if ( opts.hasOwnProperty( 'slope' ) ) {
			slope = opts.slope;
			if ( !isNumber( slope ) ) {
				throw new TypeError( 'lr()::invalid option. Slope must be numeric. Option: `' + slope + '`.' );
			}
		}
		if ( opts.hasOwnProperty( 'intercept' ) ) {
			yint = opts.intercept;
			if ( !isNumber( yint ) ) {
				throw new TypeError( 'lr()::invalid option. y-intercept must be numeric. Option: `' + yint + '`.' );
			}
		}
	}
	// NOTE: we copy the values for two reasons: 1) to simplify computations and 2) create private arrays for use by the computed model.

	// [5] Copy the x-values...
	tmp = x;
	x = [];
	if ( xVal ) {
		for ( i = 0; i < len; i++ ) {
			x.push( xVal( tmp[ i ] ) );
		}
	} else {
		for ( i = 0; i < len; i++ ) {
			x.push( tmp[ i ] );
		}
	}
	// [6] Copy the y-values...
	if ( y ) {
		tmp = y;
		y = [];
		if ( yVal ) {
			for ( i = 0; i < len; i++ ) {
				y.push( yVal( tmp[ i ] ) );
			}
		} else {
			for ( i = 0; i < len; i++ ) {
				y.push( tmp[ i ] );
			}
		}
	} else {
		// Recall: tmp = x => zipped/object array
		y = [];
		for ( i = 0; i < len; i++ ) {
			y.push( yVal( tmp[ i ] ) );
		}
	}

	// [ ] Return a new linear model:
	return createModel( x, y, null, null );
} // end FUNCTION lr()


// EXPORTS //

module.exports = lr;
