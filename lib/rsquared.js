/**
*
*	COEFFICIENT OF DETERMINATION
*
*
*	DESCRIPTION:
*		- Computes the coefficient of determination (R squared).
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
* FUNCTION: rsq( mss, tss )
*	Computes the coefficient of determination.
*
* @param {Number} mss - model sum of squares
* @param {Number} tss - total sum of squares
* @returns {Number} coefficient of determination
*/
function rsq( mss, tss ) {
	return mss / tss;
} // end FUNCTION rsq()


// EXPORTS //

module.exports = rsq;
