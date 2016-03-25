'use strict';

/**
 * @ngdoc function
 * @name RecoverLaboratory.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the RecoverLaboratory
 */
angular.module('RecoverLaboratory')
  .controller('MainCtrl', function ($scope) {

  	$scope.friend = false;
  	$scope.snake = false;
  	$scope.me = false;


  	$('.whoareyou').typed({
    	strings: ["Who are you?"],
	 	contentType: 'html', // or 'text'
	 	startDelay: 1000,
	});

  	$('.friend').typed({
    	strings: ["Friend?"],
	 	contentType: 'html', // or 'text'
	 	startDelay: 2000,
	 	showCursor: false,
	});
  	$('.snake').typed({
    	strings: ["a Snake?"],
	 	contentType: 'html', // or 'text'
	 	startDelay: 3000,
	 	showCursor: false,
	});
  	$('.me').typed({
    	strings: ["Me?"],
	 	contentType: 'html', // or 'text'
	 	startDelay: 4000,
	 	showCursor: false,
	});			

  });
