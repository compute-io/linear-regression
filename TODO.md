TODO
====

1. `predictor` method
	-	return `function` (generate) for computing predictions based on the model parameters
		-	`new Function()`
	-	**currently**, allow for providing an input `array`, removing the need for fcn generation. While multiple `predict` calls entail repeated validation, this can be avoided by just providing all inputs up front.
2. 
3. `summary` method
	-	F statistic / prob of F stat
	-	[omnibus](http://en.wikipedia.org/wiki/Omnibus_test)
	-	[jarque-bera test](http://en.wikipedia.org/wiki/Jarque%E2%80%93Bera_test)
	-	[condition number](http://en.wikipedia.org/wiki/Condition_number)
	-	p-value
	-	estimate std error
	-	t-value
	-	t-prob
	-	skew
	-	kurt
	-	influential observations
	-	leverage
	-	cooks distance
	-	
	-	see
		-	[statsmodels](http://statsmodels.sourceforge.net/devel/examples/notebooks/generated/ols.html)
		-	[summary](http://www.r-tutor.com/elementary-statistics/simple-linear-regression/significance-test-linear-regression)
4. results to have a print method?
	-	pretty printing; see statsmodels
	-	may want to reconsider overriding `toString()` and rename. `toString` is commonly called by many external things, like when an error occurs on the model, thus resulting in lazy evaluation being triggered unnecessarily.
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
	-	**Currently**, just returning an ordered `array`: `[b0,b1,b2,b3,...]`. This should be general enough for the above case.
8. missing values
	-	how to handle?
	-	allow encoding to be specified?
	-	will affect how values are copied!
	-	dido for prediction, how to handle? skip over...
9. check against `len < 2`!!!
	-	only a single data point; unless pass through (0,0), then cannot model!
	-	should it return `null` or error?
10. for the more general linear model implementation, ability to set the coefficient names
	-	here, the names are assumed `slope` and `intercept`
	-	in the more general case, may want to associate a feature with a particular coefficient value --> essentially creating a mapping
11. 
