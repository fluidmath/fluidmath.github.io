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
			templateUrl : 'views/sprites.html'
		})
		.when('/color-convertions', {
			templateUrl : 'views/color-convertions.html',
			controller : 'colorController'
		})
		.when('/box-shadow', {
			templateUrl : 'views/box-shadow.html',
			controller : 'boxShadowController'
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
	$scope.clearBase = function(){ $scope.base = ''; $scope.result = '' };
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

// Color convertions controller

app.controller('colorController',function($scope){

	$scope.opacity = 100;

	var convertionType = 'hex-to-rgba',
		convertions = {
			'hex-to-rgba' : function(){
				var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
			    $scope.hex = $scope.hex.replace(shorthandRegex, function(m, r, g, b) {
			        return r + r + g + g + b + b;
			    });

			    var rgba = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec($scope.hex);

			    rgba = rgba ? {
			        r: parseInt(rgba[1], 16),
			        g: parseInt(rgba[2], 16),
			        b: parseInt(rgba[3], 16)
			    } : null;

			    $scope.result = ( 'rgba('+rgba.r+', '+rgba.g+', '+rgba.b+', '+($scope.opacity/100)+');' );

			},
			'rgba-to-hex' : function(){

				var rgb = $scope.rgb.replace(/\s/g,'').split(','),
					red = Number(rgb[0]),
					green = Number(rgb[1]),
					blue = Number(rgb[2]),
					hex = '#' + red.toString(16) +
					           green.toString(16) +
					           blue.toString(16);
				if( ( rgb.length >= 3 ) && ( (Number(red)) && (Number(blue)) && (Number(green)) ) ) {
				    $scope.result = hex;
				}

			}
		};

	$scope.clear = function(){ $scope.hex = ''; $scope.rgb = ''; $scope.result = ''; };

	$scope.changeConvertionType = function( $event ){
		convertionType = $event.target.getAttribute('data-convertionType');
	}

	$scope.convert = function() { convertions[convertionType](); }

});

app.controller('boxShadowController',function($scope){

	$scope.offsetY = 16;
	$scope.offsetX = 62;
	$scope.blur = 32;
	$scope.opacity = 0.5;
	$scope.spread = 10;
	$scope.inset = false;

	$scope.insetValue = '';

	if( $scope.inset ){
		$scope.insetValue = 'inset ';
	} else {
		$scope.insetValue = '';
	}

	$scope.result = ('box-shadow: ' + $scope.insetValue + $scope.offsetX + 'px ' + $scope.offsetY + 'px ' + $scope.blur + 'px ' + $scope.spread + 'px ' + 'rgba(0,0,0,' + $scope.opacity + ');' );

	$scope.updateResult = function(){

		if( $scope.inset ){
			$scope.insetValue = 'inset ';
		} else {
			$scope.insetValue = '';
		}		

		$scope.result = ('box-shadow: ' + $scope.insetValue + $scope.offsetX + 'px ' + $scope.offsetY + 'px ' + $scope.blur + 'px ' + $scope.spread + 'px ' + 'rgba(0,0,0,' + $scope.opacity + ');' );	

	}

});