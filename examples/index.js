'use strict';

var lr = require( './../lib' );

var x = [ 4.0, 8.0, 12.5, 16.0, 20.0, 25.0, 31.0, 36.0, 40.0, 40.0 ];

var y = [ 3.7, 7.8, 12.1, 15.6, 19.8, 24.5, 31.1, 35.5, 39.4, 39.5 ];

var model = lr( x, y );

console.log( model.coefficients );

x = [ 5, 10, 15, 20, 25, 30, 32 ];
y = [ 17.1, 29.6, 63.6, 117.1, 186.4, 346.5, 285.1 ];

model = lr( x, y );

console.log( model.coefficients );

x = [
	2.745,
	2.7,
	2.69,
	2.68,
	2.675,
	2.67,
	2.665,
	2.66,
	2.655,
	2.655,
	2.65,
	2.65,
	2.645,
	2.635,
	2.63,
	2.625,
	2.625,
	2.62,
	2.615,
	2.615,
	2.615,
	2.61,
	2.59,
	2.59,
	2.565
];

y = [
	2.08,
	2.045,
	2.05,
	2.005,
	2.035,
	2.035,
	2.02,
	2.005,
	2.01,
	2,
	2,
	2.005,
	2.015,
	1.99,
	1.99,
	1.995,
	1.985,
	1.97,
	1.985,
	1.99,
	1.995,
	1.99,
	1.975,
	1.995,
	1.955
];

model = lr( x, y );

console.log( model.coefficients );

x = [
	22,
	68,
	108,
	137,
	255,
	315,
	390,
	405,
	685,
	700,
	1100
];

y = [
	0.75,
	2.4,
	3.2,
	4.7,
	9.3,
	12.0,
	13.4,
	14.4,
	24.5,
	26,
	38
];

model = lr( x, y, {
	'intercept': 0
});

console.log( model.coefficients );

var xy = 0;
var x2 = 0;
for ( var i = 0; i < x.length; i++ ) {
	xy += x[i]*y[i];
	x2 += x[i]*x[i];
}
console.log( xy/x2 );


var sumx = 0;
var sumy = 0;

for ( i = 0; i < x.length; i++ ) {
	sumx += x[i];
	sumy += y[i];
}

console.log( sumy / sumx );
console.log( (sumy/x.length) / (sumx/x.length) );
