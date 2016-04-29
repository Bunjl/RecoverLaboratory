'use strict';

/**
 * @ngdoc function
 * @name RecoverLaboratory.controller:friendCtrl
 * @description
 * # friendCtrl
 * Controller of the RecoverLaboratory
 */
angular.module('RecoverLaboratory')
  .controller('FriendCtrl', function ($scope, User) {
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
