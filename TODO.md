TODO
====

1. `predictor` method
	-	return `function` (generate) for computing predictions based on the model parameters
		-	`new Function()`
	-	should provide option to return the confidence intervals of a prediction
2. allow for only a single input `array`
	-	if no accessors, assume a zipped array

	``` javascript
	function xValue( d ) {
		return d[ 0 ];
	}
	function yValue( d ) {
		return d[ 1 ];
	}
	```

3. `summary` method
	-	return a statistical [summary](http://www.r-tutor.com/elementary-statistics/simple-linear-regression/significance-test-linear-regression)
	-	num observations
	-	F statistic / prob of F stat
	-	[omnibus](http://en.wikipedia.org/wiki/Omnibus_test)
	-	[jarque-bera test](http://en.wikipedia.org/wiki/Jarque%E2%80%93Bera_test)
	-	[condition number](http://en.wikipedia.org/wiki/Condition_number)
	-	dof (residuals and model)
	-	r-squared
	-	adjusted r-squared
	-	p-value
	-	log likelihood
	-	estimate std error
	-	t-value
	-	t-prob
	-	sum of squares (anova)
	-	mse
	- 	aic
	-	bic
	-	skew
	-	kurt
	-	influential observations
	-	see [statsmodels](http://statsmodels.sourceforge.net/devel/examples/notebooks/generated/ols.html)
4. results to have a print method?
	-	pretty printing; see statsmodels
	-	
5. see [linear model](http://www.mathworks.com/help/stats/linearmodel.fit.html)
	-	when move beyond single explanatory variable
6. In `README.md` notes section,
	-	state assumptions of OLS
	-	when to use/when not to use
	-	note how taking the squared difference gives greater weight to large deviations
		-	note sensitivity to outliers
7. coefficient naming
	-	slope and intercept???
	-	constant and ...
	-	a, b
		-	lends itself to a, b1, b2, b3,... for other linear models involving multiple explanatory variables
8. missing values
	-	how to handle?
	-	allow encoding to be specified?
	-	will affect how values are copied!
	-	dido for prediction, how to handle? skip over...
9. 
