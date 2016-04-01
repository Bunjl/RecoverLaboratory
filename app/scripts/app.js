'use strict';

/**
 * @ngdoc overview
 * @name RecoverLaboratory
 * @description
 * # RecoverLaboratory
 *
 * Main module of the application.
 */
angular
  .module('RecoverLaboratory', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'typer'
  ])
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main'
      })
      .when('/info', {
        templateUrl: 'views/about.html',
        controller: 'AboutCtrl',
        controllerAs: 'about'
      })
       .when('/crew', {
        templateUrl: 'views/crew.html',
        controller: 'crewCtrl',
        controllerAs: 'crew'
      })
        .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'contactCtrl',
        controllerAs: 'contact'
      })
      .otherwise({
        redirectTo: '/'
      });
        $(".button-collapse").sideNav();

  });
