var agroind = angular.module('agroind', [
  'ui.router',
  'ipCookie',
  'ng-token-auth',
  'usersService',
  'profilesService',
  'angular-loading-bar', 
  'ngAnimate'
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
    })
    .state('profiles', {
      url: '/profiles',
      templateUrl: 'pages/profiles/index.html',
      controller: 'profilesController'
    })
    .state('newProfile', {
      url: '/newProfile',
      templateUrl: 'pages/profiles/new.html',
      controller: 'profilesController'
    })
    .state('editProfile', {
      url: '/editProfile/:id',
      templateUrl: 'pages/profiles/edit.html',
      controller: 'profilesController'
    })
});

//Configuration of authentication service
agroind.config(function($authProvider) {
  $authProvider.configure({
    apiUrl: 'http://localhost:3000/api/v1',
    storage: 'localStorage'
  });
});


//Controladores

agroind.controller('mainController', function($scope, $rootScope, $state, Users, Profiles, config) {
  $rootScope.loggedIn = false;

  $scope.checkLogin = function () {
    config.apiUrl;
    $rootScope.loggedIn = !$rootScope.loggedIn;
  };

  $rootScope.$on('auth:login-success', function(ev, user) {
    Materialize.toast('Inicio de sesion correcto!', 4000);
    $rootScope.loggedIn = true;
    $rootScope.loggedUser = user;
    Profiles.getProfile(user.profile_id).then(function (response) {
      $rootScope.loggedProfile = response.data;
    });
    $state.go('home');
  });

  $rootScope.$on('auth:logout-success', function(ev) {
    Materialize.toast('Cierre de sesion correcto!', 4000);
    $rootScope.loggedIn = false;
    $state.go('login');
  });
});

//Controlador para la gestion de usuarios
agroind.controller('usersController', function ($scope, Users, config) {
  // $scope.users = Users.getUsers();
  $scope.indexUser = function () {
    Users.getUsers().then(function (response) {
      $scope.allUsers = response.data;
    });
  }

  $scope.delete = function (id) {
    Users.deleteUser(id).then(function (response) {
      $scope.allUsers.splice(id,1);
      // Materialize.toast('Cierre de sesion correcto!', 4000);
    });
  }

});

agroind.controller('profilesController', function ($scope, $stateParams, $state, Profiles, config) {

  $scope.indexProfile = function () {
    Profiles.getProfiles().then(function (response) {
      $scope.allProfiles = response.data; 
    });
  }

  $scope.viewProfile = function () {
    // console.log($stateParams);
    Profiles.getProfile($stateParams.id).then(function (response) {
        // console.log(response.data);
      $scope.profile = {
        id: response.data.id,
        name: response.data.name,
        users_permission: response.data.users_permission,
        indicators_permission: response.data.indicators_permission,
        reports_permission: response.data.reports_permission,
        profiles_permission: response.data.profiles_permission 
      }
      // console.log($scope.profile);
    });
  }

  $scope.newProfile = function () {
    Profiles.newProfile($scope.name,
                        $scope.users_permission,
                        $scope.indicators_permission,
                        $scope.reports_permission,
                        $scope.statistics_permission,
                        $scope.profiles_permission).then(function (response) {
                          Materialize.toast('Se ha creado el perfil correctamente!', 4000);
                          $state.go('profiles');
                        });
  }

  $scope.editProfile = function () {
    profile = $scope.profile;
    Profiles.editProfile(profile.id, 
                         profile.name,
                         profile.users_permission,
                         profile.indicators_permission,
                         profile.reports_permission,
                         profile.statistics_permission,
                         profile.profiles_permission).then(function (response) {
                          Materialize.toast('Se ha editado el perfil correctamente!', 4000);
                         });
  }

  $scope.cloneProfile = function (id) {
    var profile = {};
    Profiles.getProfile(id).then(function (response) {
      profile = response.data;
      Profiles.newProfile(profile.name,
                          profile.users_permission,
                          profile.indicators_permission,
                          profile.reports_permission,
                          profile.statistics_permission,
                          profile.profiles_permission).then(function (response) {
                            Materialize.toast('Se ha clonado el perfil correctamente!', 4000);
                          });
      $scope.indexProfile();
    });
  }

  $scope.deleteProfile = function (id) {
    Profiles.deleteProfile(id).then(function (response) {
      // $scope.allProfiles.splice(id,1);
      $scope.indexProfile();
      console.log("eliminado");
    });
  }
});

//Controlador de autenticacion

agroind.controller('authController', function ($scope, $auth, $rootScope) {
  $scope.handleRegBtnClick = function() {
    $auth.submitRegistration($scope.submitRegistrationForm)
      .then(function (resp) {
        console.log("ok");
        console.log(resp);
      })
      .catch(function (err) {
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