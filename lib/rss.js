/**
*
*	RSS
*
*
*	DESCRIPTION:
*		- Computes the sum of squared residuals (RSS). Also referred to as the sum of squared errors (SSE).
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
* FUNCTION: rss( arr )
*	Computes the sum of squared residuals.
*
* @param {Number[]} arr - residuals
* @returns {Number} sum of squared residuals
*/
function rss( arr ) {
	var len = arr.length,
		sum = 0,
		i;

	for ( i = 0; i < len; i++ ) {
		sum += arr[ i ] * arr[ i ];
	}
	return sum;
} // end FUNCTION rss()


// EXPORTS //

module.exports = rss;
