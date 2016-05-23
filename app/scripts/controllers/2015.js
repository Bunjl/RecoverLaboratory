'use strict';

/**
 * @ngdoc function
 * @name RecoverLaboratory.controller:2015Ctrl
 * @description
 * # 2015Ctrl
 * Controller of the RecoverLaboratory
 */
angular.module('RecoverLaboratory')
  .controller('2015Ctrl', function ($scope, User) {
    console.log('here')
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
  		User.getFriend();
  	}else{
  		$scope.none = true;
  	}
	
  });
