var agroind = angular.module('agroind', [
  'ui.router',
  'ipCookie',
  'ng-token-auth',
  'usersService'
]);

// Configuration of router service
agroind.config(function($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise("/login");

  $stateProvider

    .state('home', {
      url: '/',
      templateUrl: 'pages/home.html',
      resolve: {
        auth: function($auth) {
          return $auth.validateUser();
        }
      }
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

  $scope.checkLogin = function () {
    $rootScope.loggedIn = !$rootScope.loggedIn;
    console.log($rootScope.loggedIn);
  };

  $rootScope.$on('auth:login-success', function(ev, user) {
    console.log(ev);
    $rootScope.loggedIn = true;
  });

  $rootScope.$on('auth:logout-success', function(ev) {
    $rootScope.loggedIn = false;
  });
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
        console.log($rootScope.loggedIn);
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
});