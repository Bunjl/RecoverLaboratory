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
    'typer',
    'ngCookies'
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
      .when('/friend', {
        templateUrl: 'views/friend.html',
        controller: 'FriendCtrl',
        controllerAs: 'friend'
      })
      .when('/snake', {
        templateUrl: 'views/snake.html',
        controller: 'SnakeCtrl',
        controllerAs: 'snake'
      })
      .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactCtrl',
        controllerAs: 'contact'
      })
      .when('/illusion', {
        templateUrl: 'views/illusion.html',
        controller: 'IllusionCtrl',
        controllerAs: 'illusion'
      })
      .when('/me', {
        templateUrl: 'views/me.html',
        controller: 'MeCtrl',
        controllerAs: 'me'
      })
      .when('/2015', {
        templateUrl: 'views/2015.html',
        controller: '2015Ctrl',
        controllerAs: '2015'
      })
      .otherwise({
        redirectTo: '/'
      });
        $(".button-collapse").sideNav();

  });
