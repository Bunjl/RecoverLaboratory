'use strict';

/**
 * @ngdoc function
 * @name RecoverLaboratory.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the RecoverLaboratory
 */
angular.module('RecoverLaboratory')
  .controller('MainCtrl', function ($scope, User, $location) {

  	$scope.setPathToFollow =  function(choice){
  		User.setCurrentUser(choice);
  	}
  	$scope.choice = User.getCurrentUser();

  	if($scope.choice === 'snake'){
  		$scope.snake = true;
  	}else if($scope.choice === 'me'){
  		$scope.me = true;
  	}else if($scope.choice === 'illusion'){
  		$scope.illusion = true;

  	}else if($scope.choice === 'friend'){
  		$scope.friend = true;
  	}else{
  		$scope.none = true;
  	}
  	

  });
