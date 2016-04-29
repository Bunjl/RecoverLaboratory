'use strict';

angular.module('RecoverLaboratory')
  .factory('User', function Auth($rootScope, $cookies) {

    return {
      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      setCurrentUser: function(selection) {
        console.log(selection);
         $rootScope.currentUser = selection;
          $cookies.put('choice', selection);

      },

      getCurrentUser: function() {
        var userChoice = $cookies.get('choice');
          return userChoice;
      },

    };
  });
