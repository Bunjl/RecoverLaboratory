'use strict';

/**
 * @ngdoc function
 * @name RecoverLaboratory.controller:AboutCtrl
 * @description
 * # AboutCtrl
 * Controller of the RecoverLaboratory
 */
angular.module('RecoverLaboratory')
  .controller('AboutCtrl', function ($scope, User) {
    if(navigator.userAgent.toLowerCase().indexOf('firefox') > -1){
     //Bro update away from FF
     $scope.firefox = true;
    }
  	// path chosen.
  	$scope.choice = User.getCurrentUser();

  	if($scope.choice === 'snake'){
  		$scope.snake = true;
  		 User.getSnake();
  	}else if($scope.choice === 'me'){
  		$scope.me = true;
  		User.getMe();
  	}else if($scope.choice === 'illusion'){
  		$scope.illusion = true;
  	}else if($scope.choice === 'friend'){
  		$scope.friend = true;
  	}else{
  		$scope.none = true;
  	}
	
  	if($scope.friend){
  		User.getFriend();
  	}
  });
