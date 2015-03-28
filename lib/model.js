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
	var N = x.length, // number of observations
		m = 2, // number of params
		residuals,
		summary,
		ci,
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
	* ATTRIBUTE: residuals
	*	Model residuals; i.e., the difference between each observation `y_i` and its corresponding prediction `f(x_i) = y^{hat}_i`. Note: the residuals are lazily evaluated the first time they are accessed. Subsequent access returns a copy of the residual array.
	*
	* @type {Number[]}
	*/
	Object.defineProperty( model, 'residuals', {
		'configurable': false,
		'enumerable': true,
		get: function() {
			var arr = [],
				yhat,
				i;
			if ( !residuals ) {
				residuals = [];
				for ( i = 0; i < N; i++ ) {
					yhat = x[ i ]*slope + yint;
					residuals.push( y[ i ] - yhat );
				}
			}
			for ( i = 0; i < N; i++ ) {
				arr.push( residuals[ i ] );
			}
			return arr;
		}
	});

	/**
	* ATTRIBUTE: ci
	*	Confidence intervals for the estimated model parameters. Note: the confidence intervals are lazily evaluated the first time they are accessed. Subsequent access returns a deep copy of the confidence interval array.
	*
	* @type {Array[]}
	*/
	Object.defineProperty( model, 'ci', {
		'configurable': false,
		'enumerable': true,
		get: function() {
			var arr,
				tmp,
				i;

			if ( !ci ) {
				ci = [];

				// TODO: Slope confidence interval...
				ci.push( [] );

				// TODO: intercept confidence interval...
				ci.push( [] );
			}
			arr = [];
			for ( i = 0; i < m; i++ ) {
				tmp = ci[ i ];
				arr.push( [ tmp[0], tmp[1] ] );
			}
			return arr;
		}
	});

	/**
	* ATTRIBUTE: summary
	*	A model's statistical summary. Note: the summary is lazily evaluated the first time it is accessed. Subsequent access returns a deep copy.
	*
	* @type {Object}
	*/
	Object.defineProperty( model, 'summary', {
		'configurable': false,
		'enumerable': true,
		get: function() {
			if ( !summary ) {
				// TODO: generate a summary
				summary = {};
			}
			// TODO: copy. Possible deep copy depending on the summary structure. If so, use the util-copy module for deep cloning.
			return {};
		}
	});

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
