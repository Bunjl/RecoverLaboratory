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
	
  });
