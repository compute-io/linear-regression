/**
*
*	ADJUSTED COEFFICIENT OF DETERMINATION
*
*
*	DESCRIPTION:
*		- Computes the adjusted coefficient of determination (adjusted R squared).
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

var rsq = require( './rsquared.js' );


// ADJUSTED R SQUARED //

/**
* FUNCTION: arsq( mss, tss, mdf, rdf )
*	Computes the adjusted coefficient of determination.
*
* @param {Number} mss - model sum of squares
* @param {Number} tss - total sum of squares
* @param {Number} mdf - model degrees of freedom
* @param {Number} rdf - residual degrees of freedom
* @returns {Number} adjusted coefficient of determination
*/
function arsq( mss, tss, mdf, rdf ) {
	var r2 = rsq( mss, tss );
	return r2 - (1-r2)*(mdf/rdf);
} // end FUNCTION arsq()


// EXPORTS //

module.exports = arsq;
