Simple Linear Regression
===
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Coverage Status][coveralls-image]][coveralls-url] [![Dependencies][dependencies-image]][dependencies-url]

> A [least squares](http://en.wikipedia.org/wiki/Least_squares) [estimator](http://stats.stackexchange.com/questions/7581/what-is-the-relation-between-estimator-and-estimate) for a [linear regression](http://en.wikipedia.org/wiki/Simple_linear_regression) model having a single explanatory variable.


## Installation

``` bash
$ npm install compute-linear-regression
```

For use in the browser, use [browserify](https://github.com/substack/node-browserify).


## Usage

``` javascript
var lr = require( 'compute-linear-regression' );
```

#### lr( x[, y[, opts] ] )

Performs a [linear regression](http://en.wikipedia.org/wiki/Simple_linear_regression) to model the relationship between an independent variable `x` and a dependent variable `y`. 

``` javascript
var x, y;

x = [ 0, 1, 4, 2, 3, 3, 2, 4, 0, 1 ];
y = [ 10, 18, 24.75, 16.5, 14, 26, 13.5, 25.25, 0, 2 ];

var model = lr( x, y );
```

If provided a single `array`, the function assumes a [zipped](https://github.com/compute-io/zip) `array` of 2-element tuples `[x_i,y_i]`.

``` javascript
var data = [
	[0,10],
	[1,18],
	[4,24.75],
	[2,16.5],
	[3,14],
	[3,26],
	[2,13.5],
	[4,25.25],
	[0,0],
	[1,2]
];

var model = lr( data );
```

The function accepts the following `options`:

* 	__accessors__: `object` providing accessor `functions`.
	-	__x__: accessor `function` for accessing explanatory values.
	-	__y__: accessor `function` for accessing response values.
*	__slope__: known slope.
*	__intercept__: known *y*-intercept.

To facilitate arbitrary input data structures, the function accepts accessor `functions`.

``` javascript
function xValue( d, i ) {
	return d.x;
}

function yValue( d, i ) {
	return d.y;
}

var x, y, data, model;

// Separate input arrays...
x = [
	{'x':0},
	{'x':1},
	{'x':4},
	{'x':2},
	{'x':3},
	{'x':3},
	{'x':2},
	{'x':4},
	{'x':0},
	{'x':1}
];

y = [ 10, 18, 24.75, 16.5, 14, 26, 13.5, 25.25, 0, 2 ];

model = lr( x, y, {
	'accessors': {
		'x': xValue
	}
});

// Single input array...
data = [
	{'x':0,'y':10},
	{'x':1,'y':18},
	{'x':4,'y':24.75},
	{'x':2,'y':16.5},
	{'x':3,'y':14},
	{'x':3,'y':26},
	{'x':2,'y':13.5},
	{'x':4,'y':25.25},
	{'x':0,'y':0},
	{'x':1,'y':2}
];

model = lr( data, {
	'accessors': {
		'x': xValue,
		'y': yValue
	}
});
```

By default, the implementation assumes that all model parameters (slope and *y*-intercept) are __unknown__. Should either one or both be known, set the corresponding options.

``` javascript
var model;

// Known y-intercept:
model = lr( x, y, {
	'intercept': 5
});

// Known slope:
model = lr( x, y, {
	'slope': 5
});

// Both are known:
model = lr( x, y, {
	'slope': 5,
	'intercept': 5
});
```

Note that, in the special case where the *y*-intercept is `0`, this is equivalent to computing a linear model which assumes a polynomial of the form

```
f(x) = y = bx
```

Hence, to compute a model lacking a constant term

``` javascript
x = [ 0, 1, 4, 2, 3, 3, 2, 4, 0, 1 ];
y = [ 5, 13, 19.75, 11.5, 9, 21, 8.5, 20.25, -5, -3 ];

var model = lr( x, y, {
	'intercept': 0
});
```


===
#### Model

The computed linear `model` has the following properties and methods...

__Note__: to prevent the model's state from being corrupted, all properties return copies of internal data structures when accessed. Thus, rather than using the model to access properties, you are encouraged to cache references to accessed model data, as demonstrated in the examples below.


##### model.params

Model parameters and corresponding linear regression coefficients. The model has two parameters: __intercept__ and __slope__. 

``` javascript
var params = model.params;
// returns [y-intercept, slope]; e.g., [ 5, 5 ]
```



##### model.fit

Model __fit__; i.e., the predicted value `f(x_i) = y^{hat}_i` for each `x_i`.

``` javascript
var fit = model.fit;
// returns [ 5, 10, 25, 15, 20, 20, 15, 25, 5, 10 ]
```


##### model.residuals

Model __residuals__; i.e., the difference between each observation `y_i` and its corresponding prediction `f(x_i) = y^{hat}_i`.

``` javascript
var residuals = model.residuals;
// returns [ 5, 8, -0.25, 1.5, -6, 6, -1.5, 0.25, -5, -8 ]
```


##### model.ci

Confidence intervals for the estimated model parameters.

``` javascript
var ci = model.ci;
// returns [[],[]] // TODO
```


##### model.summary

A model's statistical summary.

``` javascript
var summary = model.summary;
// returns {...} // TODO
```

A `summary` is an `object` comprised as follows...

``` javascript
{
	... // TODO
}
```


##### model.predict( x[, opts] )

Based on the linear model, computes a predicted response `y^{hat}_i` for each `x_i`. `x` may be either a single input value or an input `array`.

``` javascript
var prediction,
	x;

// Single input value...
x = 5;

prediction = model.predict( x );
// returns 30

// Input array...
x = [ 4, 0, 5 ];

prediction = model.predict( x );
// returns [ 25, 5, 30 ]
```

The method accepts the following `options`...

* 	__accessor__: accessor `function` for accessing `array` values.
*	__ci__: `boolean` indicating whether to compute confidence intervals for predicted responses. Default: `false`.
*	__copy__: `boolean` indicating whether to return a new `array` when computing predicted responses. Default: `true`.

For a non-numeric input `array`, provide an accessor `function` for accessing `array` values.

``` javascript
function xValue( d ) {
	return d.x;
}

var x = [
	{'x':4},
	{'x':0},
	{'x':5}
];

var prediction = model.predict( x, {
	'accessor': xValue
});
// returns [ 25, 5, 30 ]
```

To compute confidence intervals, set the `ci` option to `true`.

``` javascript
var x = [ 4, 0, 5 ];

var prediction = model.predict( x, {
	'ci': true	
});
// returns [[],[],...[]] // TODO
```

To mutate the input `array`, set the `copy` option to `false`.

``` javascript
var x = [ 4, 0, 5 ];

var prediction = model.predict( x, {
	'copy': false
});
// returns [ 25, 5, 30 ]

console.log( x === prediction );
// returns true
```

__Note__: the method returns the following outputs...
*	if provided a single `numeric` value and `opts.ci === false`, the method returns a `numeric` value.
*	if provided a `numeric array` and `opts.ci === false`, the method returns a `numeric array`.
*	if `opts.ci === true`, the method returns an `array` of `arrays`, where each sub-array is a 3-element tuple

	```
	[ prediction, lower_bound, upper_bound ]
	```




##### model.toString()

Pretty prints a model.

``` javascript
var str = model.toString();
/* returns

=> TBD // TODO


*/
```






## Notes

Simple linear regression assumes a *linear polynomial* of the form

```
f(x) = y = a + bx
```

describing the relationship between an independent variable `x` and a dependent variable `y`. `x` is commonly referred to as the __explanatory__, __predictor__, or __regressor__ variable, and `y` is commonly referred to as the __response__ variable. `a` and `b` are (possibly) unknown __coefficients__ to be determined based on the inputs `x` and `y`. Interpreted geometrically, `f(x)` is a straight line having a *y*-intercept `a` and a slope `b`.

To determine the model parameters `a` and `b`, this implementation uses [ordinary least squares](http://en.wikipedia.org/wiki/Ordinary_least_squares) (OLS) to fit a straight line to the data. Intuitively, our goal is to find a line having a slope and *y*-intercept which minimizes the distance between an observation and its corresponding fitted (predicted) value. To achieve this goal, OLS seeks to minimize the function

```
L = sum^{N-1}_{i=0} [y_i - f(x_i)]^2
```

where `N` is the number of observations and `y_i - f(x_i)` corresponds to the vertical distance between an observation `y_i` and a predicted value `f(x_i)`. The smaller each distance between `y_i` and `f(x_i)` is, the smaller the sum and the better the fit (prediction).



## Examples

``` javascript
var lr = require( 'compute-linear-regression' );

// TODO: mini-tutorial.
```

To run the example code from the top-level application directory,

``` bash
$ node ./examples/index.js
```


### Data Sources

Three of the example data sets are from the following source:
*	Larsen, Richard J., Marx, Morris L. (2006) *An Introduction to Mathematical Statistics and its Applications*. 4th Edition. pages 646-661.


## Tests

### Unit

Unit tests use the [Mocha](http://mochajs.org/) test framework with [Chai](http://chaijs.com) assertions. To run the tests, execute the following command in the top-level application directory:

``` bash
$ make test
```

All new feature development should have corresponding unit tests to validate correct functionality.


### Test Coverage

This repository uses [Istanbul](https://github.com/gotwarlost/istanbul) as its code coverage tool. To generate a test coverage report, execute the following command in the top-level application directory:

``` bash
$ make test-cov
```

Istanbul creates a `./reports/coverage` directory. To access an HTML version of the report,

``` bash
$ make view-cov
```


---
## License

[MIT license](http://opensource.org/licenses/MIT). 


## Copyright

Copyright &copy; 2015. Athan Reines.


[npm-image]: http://img.shields.io/npm/v/compute-linear-regression.svg
[npm-url]: https://npmjs.org/package/compute-linear-regression

[travis-image]: http://img.shields.io/travis/compute-io/linear-regression/master.svg
[travis-url]: https://travis-ci.org/compute-io/linear-regression

[coveralls-image]: https://img.shields.io/coveralls/compute-io/linear-regression/master.svg
[coveralls-url]: https://coveralls.io/r/compute-io/linear-regression?branch=master

[dependencies-image]: http://img.shields.io/david/compute-io/linear-regression.svg
[dependencies-url]: https://david-dm.org/compute-io/linear-regression

[dev-dependencies-image]: http://img.shields.io/david/dev/compute-io/linear-regression.svg
[dev-dependencies-url]: https://david-dm.org/dev/compute-io/linear-regression

[github-issues-image]: http://img.shields.io/github/issues/compute-io/linear-regression.svg
[github-issues-url]: https://github.com/compute-io/linear-regression/issues
