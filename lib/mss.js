/**
*
*	MSS
*
*
*	DESCRIPTION:
*		- Computes the model sum of squares (MSS). Also referred to as the sum of squares due to regression (SSR) or the explained sum of squares (ESS).
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

/**
* FUNCTION: mss( arr, mu )
*	Computes the model sum of squares.
*
* @param {Number[]} arr - model predictions (fit)
* @param {Number} mu - mean of response variable
* @returns {Number} model sum of squares
*/
function mss( arr, mu ) {
	var len = arr.length,
		sum = 0,
		delta,
		i;

	for ( i = 0; i < len; i++ ) {
		delta = arr[ i ] - mu;
		sum += delta * delta;
	}
	return sum;
} // end FUNCTION mss()


// EXPORTS //

module.exports = mss;
