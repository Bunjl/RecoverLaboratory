'use strict';

/**
 * @ngdoc function
 * @name RecoverLaboratory.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the RecoverLaboratory
 */
angular.module('RecoverLaboratory')
  .controller('crewCtrl', function ($scope, User) {
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
  		User.getFriend();
  	}else{
  		$scope.none = true;
  	}

  });
