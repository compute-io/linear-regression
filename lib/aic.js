/**
*
*	AIC
*
*
*	DESCRIPTION:
*		- Computes the Akaike information criterion.
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
* FUNCTION: aic( ll, k )
*	Computes the Akaike information criterion.
*
* @param {Number} ll - log likelihood
* @param {Number} k - number of parameters
* @returns {Number} Akaike information criterion
*/
function aic( ll, k ) {
	return 2 * ( k - ll );
} // end FUNCTION aic()


// EXPORTS //

module.exports = aic;
