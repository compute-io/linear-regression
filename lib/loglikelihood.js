/**
*
*	LOG LIKELIHOOD
*
*
*	DESCRIPTION:
*		- Computes the log likelihood.
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
* FUNCTION: loglikelihood( N, rss )
*	Computes the log likelihood.
*
* @param {Number} N - number of observations
* @param {Number} rss - residual sum of squares (sum of squared errors)
* @returns {Number} log likelihood
*/
function loglikelihood( N, rss ) {
	return -N / 2 * ( Math.log( (rss/N) * 2 * Math.PI ) + 1 );
} // end FUNCTION loglikelihood()


// EXPORTS //

module.exports = loglikelihood;
