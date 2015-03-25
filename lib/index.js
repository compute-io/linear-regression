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
	isNumericArray = require( 'validate.io-number-array' );


// LINEAR REGRESSION //

/**
* FUNCTION: lr( x, y[, options])
*	Computes a least squares estimator of a linear regression model having a single explanatory variable.
*
* @param {Number[]} x - independent variable array (regressor)
* @param {Number[]} y - dependent variable array (response)
* @param {Object} [options] - function options
* @returns {Object} results object
*/
function lr( x, y, opts ) {
	var len;
	if ( !isNumericArray( x ) || !isNumericArray( y ) ) {
		throw new TypeError( 'lr()::invalid input argument. Must provide numeric arrays.' );
	}
	len = x.length;
	if ( len !== y.length ) {
		throw new Error( 'lr()::invalid input argument. Input arrays must be of equal length.' );
	}
	if ( arguments.length > 2 ) {
		if ( !isObject( opts ) ) {
			throw new TypeError( 'lr()::invalid input argument. Options must be an object. Value: `' + opts + '`.' );
		}
	}
} // end FUNCTION lr()


// EXPORTS //

module.exports = lr;
