var agroind = angular.module('agroind', []);

agroind.controller('authController', function($scope, $auth) {
  $scope.handleRegBtnClick = function() {
    $auth.submitRegistration($scope.submitRegistrationForm)
      .then(function(resp) {
        console.log("ok");
        console.log(resp);
      })
      .catch(function(err) {
        console.log("err");
        console.log(err);
      });
  };

  $scope.handleLoginBtnClick = function() {
    $auth.submitLogin($scope.loginForm)
      .then(function(resp) {
        console.log("ok");
        console.log(resp);
      })
      .catch(function(err) {
        console.log("err");
        console.log(err);
      });
  };
});