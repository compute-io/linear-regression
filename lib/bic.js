/**
*
*	BIC
*
*
*	DESCRIPTION:
*		- Computes the Bayesian information criterion.
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
* FUNCTION: bic( ll, N, k )
*	Computes the Bayesian information criterion.
*
* @param {Number} ll - log likelihood
* @param {Number} N - number of observations
* @param {Number} k - number of parameters
* @returns {Number} Bayesian information criterion
*/
function bic( ll, N, k ) {
	return -2*ll + k*Math.log( N );
} // end FUNCTION bic()


// EXPORTS //

module.exports = bic;
