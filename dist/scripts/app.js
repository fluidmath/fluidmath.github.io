var app = angular.module('webtoolz',['ngRoute']);

app.config(function($routeProvider){

	$routeProvider
		.when('/math', {
			templateUrl : 'views/math.html'
		})
		.when('/radius', {
			templateUrl : 'views/radius.html'
		})
		.otherwise({
			redirectTo : '/math'
		})
});