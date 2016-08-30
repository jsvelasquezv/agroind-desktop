var agroind = angular.module('agroind', [
  'ui.router',
  'ipCookie',
  'ng-token-auth',
  'usersService'
]);

// Configuration of router service
agroind.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/");

  $stateProvider

    .state('home', {
      url: '/',
      templateUrl: 'pages/home.html'
      // controller: 'mainController'
    })
    .state('login', {
      url: '/login',
      templateUrl: 'pages/login.html'
      // controller: 'authController'
    })
    .state('signup', {
      url: '/signup',
      templateUrl: 'pages/signup.html'
      // controller: 'authController'
    });
});

//Configuration of authentication service
agroind.config(function($authProvider) {
  $authProvider.configure({
    apiUrl: 'http://localhost:3000/api/v1',
    storage: 'localStorage'
  });
});

//Controladores

agroind.controller('mainController', function($scope, $rootScope, Users) {
  $rootScope.loggedIn = false;
  $scope.showAll = function() {
    console.log(Users.getUsers());
  };
});

//Controlador de autenticacion

agroind.controller('authController', function($scope, $auth, $rootScope) {
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
        $rootScope.loggedIn = true;
      })
      .catch(function(err) {
        console.log("err");
        console.log(err);
      });
  };

  $scope.handleSignOutBtnClick = function() {
      $auth.signOut()
        .then(function(resp) {
          $rootScope.loggedIn = false;
        })
        .catch(function(resp) {
          // handle error response
        });
    };

  $rootScope.$on('auth:login-success', function(ev, user) {
    console.log("Logueado");
    $rootScope.loggedIn = true;    
  });
  
});