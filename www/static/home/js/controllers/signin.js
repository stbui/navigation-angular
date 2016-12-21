'use strict';

/* Controllers */
  // signin controller
app.controller('SigninFormController', ['$scope', '$http', '$state','$localStorage', function($scope, $http, $state,$localStorage) {
    $localStorage.userInfo = {};

    $scope.user = {};
    $scope.authError = null;
    $scope.login = function() {
      $scope.authError = null;
      // Try to login
      $http.post('/api/login', {email: $scope.user.email, password: $scope.user.password})
      .then(function(response) {
          if(response.data.errno != 0) {
              $scope.authError = response.data.errmsg;
          } else {

              $state.go('app.favorite');
          }
      }, function(x) {
        $scope.authError = 'Server Error';
      });
    };
  }])
;