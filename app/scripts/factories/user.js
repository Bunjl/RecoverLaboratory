'use strict';

angular.module('RecoverLaboratory')
  .factory('User', function Auth($rootScope) {

    return {
      /**
       * Gets all available info on authenticated user
       *
       * @return {Object} user
       */
      setCurrentUser: function(selection) {
         $rootScope.currentUser = selection;
      },

      getCurrentUser: function() {
        console.log($rootScope.currentUser)
          return $rootScope.currentUser;
      },

    };
  });
