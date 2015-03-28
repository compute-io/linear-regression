/**
*
*	LINEAR-REGRESSION: Model
*
*
*	DESCRIPTION:
*		- Defines a linear regression model class.
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

// MODULES //

var isArray = require( 'validate.io-array' ),
	isObject = require( 'validate.io-object' ),
	isFunction = require( 'validate.io-function' ),
	isNumber = require( 'validate.io-number' ),
	isBoolean = require( 'validate.io-boolean-primitive' );


// MODEL //

/**
* FUNCTION: createModel( x, y, slope, yint )
*	Creates a new linear model.
*
* @param {Number[]} x - explanatory variable array
* @param {Number[]} y - response variable array
* @param {Number} slope - line slope
* @param {Number} yint - line y-intercept
* @returns {Object} model object
*/
function createModel( x, y, slope, yint ) {
	var N = x.length,
		model;

	model = {};

	/**
	* ATTRIBUTE: params
	*	Model parameters and corresponding linear regression coefficients.
	*
	* @type {Number[]}
	*/
	Object.defineProperty( model, 'params', {
		'configurable': false,
		'enumerable': true,
		get: function() {
			// Define a getter so as to prevent corrupting the internal model state. Return a new parameter array each time the `params` property is accessed...
			return [ yint, slope ];
		}
	});

	/**
	* METHOD: residuals()
	*	Computes the difference between each observation `y_i` and its corresponding prediction `f(x_i) = y^{hat}_i`.
	*
	* @returns {Number[]} residuals
	*/
	model.residuals = function() {
		var arr = [],
			i;

		for ( i = 0; i < N; i++ ) {
			arr.push( y[ i ] - (x[ i ]*slope + yint) );
		}
		return arr;
	}; // end METHOD residuals()

	/**
	* METHOD: ci()
	*	Computes confidence intervals for the estimated model parameters.
	*
	* @returns {Object} confidence intervals for each model parameter
	*/
	model.ci = function() {
		return [[],[]];
	}; // end METHOD ci()

	/**
	* METHOD: summary()
	*	Generates a statistical summary.
	*
	* @returns {Object} statistical summary
	*/
	model.summary = function() {
		return {};
	}; // end METHOD summary()

	/**
	* METHOD: predict( val[, opts] )
	*	Computes a predicted response `y^{hat}_i` for each `x_i`.
	*
	* @param {Number|Number[]} val - independent variable
	* @param {Object} [opts] - method options
	* @returns {Number|Array|Object} prediction(s)
	*/
	model.predict = function( val, opts ) {
		var isNum = isNumber( val ),
			clbk,
			ci,
			x;

		if ( !isNum && !isArray( val ) ) {
			throw new TypeError( 'predict()::invalid input argument. Must provide either a single value or an an array of values. Value: `' + val + '`.' );
		}
		if ( arguments.length > 1 ) {
			if ( !isObject( opts ) ) {
				throw new TypeError( 'predict()::invalid input argument. Options must be an object. Value: `' + opts + '`.' );
			}
			if ( opts.hasOwnProperty( 'accessor' ) ) {
				clbk = opts.accessor;
				if ( !isFunction( clbk ) ) {
					throw new TypeError( 'predict()::invalid option. Accessor must be a function. Option: `' + clbk + '`.' );
				}
			}
			if ( opts.hasOwnProperty( 'ci' ) ) {
				ci = opts.ci;
				if ( !isBoolean( ci ) ) {
					throw new TypeError( 'predict()::invalid option. CI option must be a boolean primitive. Option: `' + ci + '`.' );
				}
			}
		}
		x = val;
		if ( isNum ) {
			x = [ x ];
		}
		// TODO: compute prediction
		// TODO: ability to compute ci

		return [];
	}; // end METHOD predict()

	/**
	* METHOD: toString()
	*	Pretty prints a model.
	*
	* @returns {String} pretty printed model
	*/
	model.toString = function() {
		return '';
	}; // end METHOD toString()

	return model;
} // end FUNCTION createModel()


// EXPORTS //

module.exports = createModel;
