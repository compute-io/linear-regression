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
	isBoolean = require( 'validate.io-boolean-primitive' ),
	copy = require( 'utils-copy' ),
	rss = require( './rss.js' ),
	mss = require( './mss.js' ),
	tss = require( './tss.js' );


// MODEL //

/**
* FUNCTION: createModel( x, y, xmu, ymu, slope, yint )
*	Creates a new linear model.
*
* @param {Number[]} x - explanatory variable array
* @param {Number[]} y - response variable array
* @param {Number} xmu - mean of `x`
* @param {Number} ymu - mean of `y`
* @param {Number} slope - line slope
* @param {Number} yint - line y-intercept
* @returns {Object} model object
*/
function createModel( x, y, xmu, ymu, slope, yint ) {
	var N = x.length, // number of observations
		m = 2, // number of params
		residuals,
		summary,
		fit,
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
	* ATTRIBUTE: fit
	*	Model fit. Note: the fit is lazily evaluated the first time it is accessed. Subsequent access returns a copy of the fit.
	*
	* @type {Number[]}
	*/
	Object.defineProperty( model, 'fit', {
		'configurable': false,
		'enumerable': true,
		get: function() {
			var arr = [],
				yhat,
				i;
			if ( !fit ) {
				fit = [];
				for ( i = 0; i < N; i++ ) {
					yhat = x[ i ]*slope + yint;
					fit.push( yhat );
				}
			}
			for ( i = 0; i < N; i++ ) {
				arr.push( fit[ i ] );
			}
			return arr;
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
				tmp,
				i;
			if ( !residuals ) {
				if ( !fit ) {
					tmp = model.fit;
				}
				residuals = [];
				for ( i = 0; i < N; i++ ) {
					residuals.push( y[ i ] - fit[ i ] );
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
				createSummary();
			}
			return copy( summary );
		}
	});

	/**
	* METHOD: predict( val[, opts] )
	*	Computes a predicted response `y^{hat}_i` for each `x_i`.
	*
	* @param {Number|Number[]} val - independent variable
	* @param {Object} [opts] - method options
	* @param {Function} [opts.accessor] - accessor function for accessing array values
	* @param {Boolean} [opts.ci=false] - boolean indicating whether to compute confidence intervals for predicted responses
	* @param {Boolean} [opts.copy=true] - boolean indicating whether to return a new array when computing predicted responses
	* @returns {Number|Array|Array[]} prediction(s)
	*/
	model.predict = function( val, opts ) {
		var isNum = isNumber( val ),
			copy = true,
			clbk,
			yhat,
			tmp,
			len,
			ci,
			x,
			i;

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
			if ( opts.hasOwnProperty( 'copy' ) ) {
				copy = opts.copy;
				if ( !isBoolean( copy ) ) {
					throw new TypeError( 'predict()::invalid option. Copy option must be a boolean primitive. Option: `' + copy + '`.' );
				}
			}
		}
		if ( isNum ) {
			if ( ci ) {
				tmp = new Array( 3 );
				tmp[ 0 ] = slope*val + yint;

				// TODO: compute ci
				tmp[ 1 ] = null;
				tmp[ 2 ] = null;
				yhat = [ tmp ];
			} else {
				yhat = slope*val + yint;
			}
			return yhat;
		}
		len = val.length;
		if ( copy ) {
			if ( clbk ) {
				x = new Array( len );
				for ( i = 0; i < len; i++ ) {
					x[ i ] = clbk( val[ i ] );
				}
			} else {
				x = val;
			}
			yhat = new Array( len );
		} else {
			x = val;
			if ( clbk ) {
				for ( i = 0; i < len; i++ ) {
					x[ i ] = clbk( x[ i ] );
				}
			}
			yhat = x;
		}
		if ( ci ) {
			// TODO: compute ci.
			for ( i = 0; i < len; i++ ) {
				tmp = new Array( 3 );
				tmp[ 0 ] = slope*x[ i ] + yint;
				tmp[ 1 ] = null;
				tmp[ 2 ] = null;
				yhat[ i ] = tmp;
			}
		} else {
			for ( i = 0; i < len; i++ ) {
				yhat[ i ] = slope*x[ i ] + yint;
			}
		}
		return yhat;
	}; // end METHOD predict()

	/**
	* METHOD: toString()
	*	Pretty prints a model.
	*
	* @returns {String} pretty printed model
	*/
	model.toString = function() {
		var str = '',
			line = '',
			tmp;
		if ( !summary ) {
			// Generate the summary if not generated already...
			tmp = model.summary;
		}
		// TODO: create the string lines.
		str += line;

		return str;
	}; // end METHOD toString()

	return model;

	/**
	* FUNCTION: createSummary()
	*	Creates a model summary.
	*
	* @private
	*/
	function createSummary() {
		summary = {};

		// Number of observations:
		summary.N = N;

		// Residual sum of squares:
		summary.rss = rss( ( residuals ) ? residuals : model.residuals );

		// Model (explained) sum of squares:
		summary.mss = mss( ( fit ) ? fit : model.fit, ymu );

		// Total sum of squares:
		summary.tss = tss( y, ymu );

		// Coefficient of Determination:
		summary.rsq = summary.mss / summary.tss;

		// Total degrees of freedom (number of observations minus 1):
		summary.df = N - 1;

		// Degrees of freedom for the model (number of parameters minus 1):
		summary.mdf = 1;

		// Degrees of freedom for the residuals (number of observations minus the number of parameters):
		summary.rdf = N - 2;

		// Adjusted coefficient of determination:
		summary.arsq = summary.rsq - (1-summary.rsq)*(summary.mdf / summary.rdf);

		// Sample variance:
		summary.variance = summary.tss / summary.df;

		// Sample standard deviation:
		summary.stdev = Math.sqrt( summary.variance );

		// Model sample variance:
		summary.mvariance = summary.mss / summary.mdf;

		// Model sample standard deviation:
		summary.mstdev = Math.sqrt( summary.mvariance );

		// Mean squared error (sample variance of residuals):
		summary.rvariance = summary.rss / summary.rdf;

		// Root mean squared error (sample standard deviation of the residuals):
		summary.rstdev = Math.sqrt( summary.rvariance );

		// F statistic:
		summary.fstat = summary.mvariance / summary.rvariance;
	}
} // end FUNCTION createModel()


// EXPORTS //

module.exports = createModel;
