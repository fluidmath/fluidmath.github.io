var app = angular.module('webtoolz',['ngRoute']);

app.config(function($routeProvider){

	$routeProvider
		.when('/math', {
			templateUrl : 'views/math.html'
		})
		.when('/radius', {
			templateUrl : 'views/radius.html',
			controller : 'radiusController'
		})
		.when('/sprite-cow', {
			templateUrl : 'views/sprites.html',
			// controller : 'radiusController'
		})
		.otherwise({
			redirectTo : '/math'
		})
});

// Fluid Math controllers

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

	$scope.clear = function(){ $scope.px = ''; $scope.em = ''; $scope.result = '' };
	$scope.clearBase = function(){ $scope.base = ''; };
	$scope.changeConvertionType = function($event){ convertionType = $event.target.getAttribute('data-convertionType'); }
	$scope.pixelConvertion = function(){
		$scope.result = convert[convertionType]();
	}

});

app.controller('percentConvertion',function($scope){
	$scope.base = 960;

	$scope.clear = function($event){ $event.target.value = ''; $scope.result = '' };
	$scope.calculatePercent = function() {
		if( Number($scope.px) && Number($scope.base)){
			$scope.result = ($scope.px/$scope.base*100)+'%';
		}
	}

});

// Border radius controller

app.controller('radiusController',function($scope){
	
	var mainValue = $scope.topLeft;

	$scope.generalUpdate = function(){
		if ( 	( !($scope.topRight) || ( $scope.topRight === mainValue) ) 
				&& ( !($scope.bottomRight) || ( $scope.bottomRight === mainValue) )
				&& ( !($scope.bottomLeft) || ( $scope.bottomLeft === mainValue) )
			) {

			$scope.result = ($scope.topLeft || 0)+'px';
			// ------------------------------ //
			$scope.topRight = $scope.topLeft;
			$scope.bottomRight = $scope.topLeft;
			$scope.bottomLeft = $scope.topLeft;

			mainValue = $scope.topLeft || 0;

		}
	}

	$scope.updatePreview = function(){

		switch( true ){
			case ( ($scope.topLeft === $scope.topRight)  && ($scope.topLeft === $scope.bottomLeft) && ($scope.topLeft === $scope.bottomRight) ) :
				$scope.result = ($scope.topLeft || 0)+'px';
					break;
			case ( ($scope.topLeft === $scope.bottomRight) && ($scope.topRight === $scope.bottomLeft) ) :
				$scope.result = ($scope.topLeft || 0)+'px ' + ($scope.topRight || 0)+'px ';
					break;
			default: 
				$scope.result = ($scope.topLeft || 0)+'px ' + ($scope.topRight || 0)+'px ' + ($scope.bottomRight || 0)+'px ' + ($scope.bottomLeft || 0)+'px ';
					break;

		}

	}

});