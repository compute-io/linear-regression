/**
*
*	AIC
*
*
*	DESCRIPTION:
*		- Computes the corrected Akaike information criterion for finite sample sizes.
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

var aic = require( './aic.js' );


// CORRECTED AIC //

/**
* FUNCTION: aicc( ll, N, k )
*	Computes the corrected Akaike information criterion for finite sample sizes.
*
* @param {Number} ll - log likelihood
* @param {Number} N - sample size
* @param {Number} k - number of parameters
* @returns {Number} Akaike information criterion
*/
function aicc( ll, N, k ) {
	return aic( ll, k ) + (2*k*(k+1)) / (N-k-1);
} // end FUNCTION aicc()


// EXPORTS //

module.exports = aicc;
