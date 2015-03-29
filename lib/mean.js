/**
*
*	MEAN
*
*
*	DESCRIPTION:
*		- Computes the mean of an array.
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

/**
* FUNCTION: mean( arr )
*	Computes the arithmetic mean of an array.
*
* @private
* @param {Array} arr - input array
* @returns {Number} arithmetic mean
*/
function mean( arr ) {
	var len = arr.length,
		delta,
		mu,
		i;

	mu = 0;
	for ( i = 0; i < len; i++ ) {
		delta = arr[ i ] - mu;
		mu += delta / (i+1);
	}
	return mu;
} // end FUNCTION mean()


// EXPORTS //

module.exports = mean;
