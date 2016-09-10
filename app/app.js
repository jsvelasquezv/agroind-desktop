var agroind = angular.module('agroind', [
  'ui.router',
  'ipCookie',
  'ng-token-auth',
  'usersService'
]);

agroind.constant('config', {
  apiUrl: 'http://localhost:3000/api/v1'
});

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
    })
    .state('users', {
      url: '/users',
      templateUrl: 'pages/users/index.html',
      controller: 'usersController'
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

agroind.controller('mainController', function($scope, $rootScope, Users, config) {
  $rootScope.loggedIn = false;

  $scope.showAll = function() {
    console.log(Users.getUsers());
  };

  $scope.checkLogin = function () {
    config.apiUrl;
    $rootScope.loggedIn = !$rootScope.loggedIn;
  };

  $rootScope.$on('auth:login-success', function(ev, user) {
    $rootScope.loggedIn = true;
    $rootScope.us = user;
  });

  $rootScope.$on('auth:logout-success', function(ev) {
    $rootScope.loggedIn = false;
  });
});

//Controlador para la gestion de usuarios
agroind.controller('usersController', function($scope, Users, config) {
  // $scope.users = Users.getUsers();
  Users.getUsers().then(function (response) {
    $scope.allUsers = response.data;
  });

  $scope.delete = function (id) {
    Users.deleteUser(id).then(function (response) {
      $scope.allUsers.splice(id,1);
      console.log("eliminado");
    });
  }

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