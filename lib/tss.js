/**
*
*	TSS
*
*
*	DESCRIPTION:
*		- Computes the total sum of squares (TSS); i.e., the sum of squared deviations of each array element from the array mean.
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
* FUNCTION: tss( arr, mu )
*	Computes the total sum of squares; i.e., the sum of squared deviations of each array element from the array mean.
*
* @param {Number[]} arr - input array
* @param {Number} mu - array mean
* @returns {Number} total sum of squares
*/
function tss( arr, mu ) {
	var len = arr.length,
		sum = 0,
		delta,
		i;

	for ( i = 0; i < len; i++ ) {
		delta = arr[ i ] - mu;
		sum += delta * delta;
	}
	return sum;
} // end FUNCTION tss()


// EXPORTS //

module.exports = tss;
