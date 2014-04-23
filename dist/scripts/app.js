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

app.controller('emConvertion',function($scope){
	$scope.base = 16;

	var convertionType = 'px-to-em',
		convert = {
			'px-to-em' : function(){
				if( Number($scope.px) && Number($scope.base)){
					return ( ($scope.px/$scope.base).toFixed(4).replace(/0{0,2}$/, "") + 'em');
				}
			},
			'em-to-px' : function(){
				if( Number($scope.em) && Number($scope.base)){
					return ( Math.floor($scope.em*$scope.base) + 'px');
				}
			}
		};

	$scope.clear = function(){ $scope.px = ''; $scope.em = ''};
	$scope.clearBase = function(){ $scope.base = ''; };
	$scope.changeConvertionType = function($event){ convertionType = $event.target.getAttribute('data-convertionType'); }
	$scope.pixelConvertion = function(){
		$scope.result = convert[convertionType]();
	}

});

app.controller('percentConvertion',function($scope){
	$scope.base = 960;

	$scope.clear = function($event){ $event.target.value = ''; };
	$scope.calculatePercent = function() {
		if( Number($scope.px) && Number($scope.base)){
			$scope.result = ($scope.px/$scope.base*100)+'%';
		}
	}

});