'use strict';

var lr = require( './../lib' ),
	model,
	data,
	params;

// Example: zipped data array...
data = require( './data/0.json' );
model = lr( data );

params = model.params;
console.log( 'y-intercept: ' + params[ 0 ] );
console.log( 'slope: ' + params[ 1 ] );
console.log( '\n' );


// Example: JSON data...
data = require( './data/1.json' );
model = lr( data.x, data.y );

params = model.params;
console.log( 'y-intercept: ' + params[ 0 ] );
console.log( 'slope: ' + params[ 1 ] );
console.log( '\n' );


// Example: JSON data...
data = require( './data/2.json' );
model = lr( data.x, data.y );

params = model.params;
console.log( 'y-intercept: ' + params[ 0 ] );
console.log( 'slope: ' + params[ 1 ] );
console.log( '\n' );


// Example: JSON data...
data = require( './data/3.json' );
model = lr( data.x, data.y, {
	'intercept': 0
});

params = model.params;
console.log( 'y-intercept: ' + params[ 0 ] );
console.log( 'slope: ' + params[ 1 ] );
console.log( '\n' );
