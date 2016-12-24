var agroind = angular.module('agroind', [
  'ui.router',
  'ipCookie',
  'ng-token-auth',
  'angular-loading-bar', 
  'ngAnimate',
  'ngMessages',
  'usersService',
  'profilesService',
  'landsService',
  'indicatorsService',
  'variablesService',
]);

agroind.constant('config', {
  apiUrl: 'http://localhost:3000/api/v1'
  // apiUrl: 'https://agroind-api-jsvelasquezv.c9users.io/api/v1'
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
      templateUrl: 'pages/users/new.html',
      controller: 'profilesController'
    })
    .state('myAccount', {
      url: '/myAccount',
      templateUrl: 'pages/users/myAccount.html',
      controller: 'usersController'
    })
    .state('recoverPassword', {
      url: '/recoverPassword',
      templateUrl: 'pages/resetPassword.html'
    })
    .state('users', {
      url: '/users',
      templateUrl: 'pages/users/index.html',
      controller: 'usersController'
    })
    .state('editUser', {
      url: '/editUser/:id',
      templateUrl: 'pages/users/edit.html',
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
    .state('cloneProfile', {
      url: '/cloneProfile/:id',
      templateUrl: 'pages/profiles/clone.html',
      controller: 'profilesController'
    })
    .state('indicators', {
      url: '/indicators',
      templateUrl: 'pages/indicators/index.html',
      controller: 'indicatorsController'
    })
    .state('newIndicator', {
      url: '/newIndicator',
      templateUrl: 'pages/indicators/new.html',
      controller: 'indicatorsController'
    })
    .state('editIndicator', {
      url: '/editIndicator/:id',
      templateUrl: 'pages/indicators/edit.html',
      controller: 'indicatorsController'
    })
    .state('lands', {
      url: '/lands',
      templateUrl: 'pages/lands/index.html',
      controller: 'landsController'
    })
    .state('newLand', {
      url: '/newLand/:id',
      templateUrl: 'pages/lands/new.html',
      controller: 'landsController'
    })
    .state('editLand', {
      url: '/editLand/:id',
      templateUrl: 'pages/lands/edit.html',
      controller: 'landsController'
    })
});

//Configuration of authentication service
agroind.config(function($authProvider) {
  $authProvider.configure({
    apiUrl: 'http://localhost:3000/api/v1',
    // apiUrl: 'https://agroind-api-jsvelasquezv.c9users.io/api/v1',
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

  $rootScope.$on('auth:login-error', function(ev) {
    Materialize.toast('Correo o contraseña incorrectos!', 4000);
  });

  $scope.$on('auth:registration-email-success', function(ev, message) {
    Materialize.toast('Registro de usuario correcto!', 4000);
    $state.go('users');
    console.log(message);
  });

  $scope.$on('auth:registration-email-error', function(ev, reason) {
    Materialize.toast('Error al registrar el usuario!', 4000);
    console.log(reason.errors);
  });

  $scope.$on('auth:account-update-success', function(ev) {
    Materialize.toast('Se actualizo la informacion correctamente!', 4000);
  });

  $scope.$on('auth:account-update-error', function(ev, reason) {
    alert("Registration failed: " + reason.errors[0]);
  });

  $rootScope.$on('auth:logout-success', function(ev) {
    Materialize.toast('Cierre de sesion correcto!', 4000);
    $rootScope.loggedIn = false;
    $state.go('login');
  });

  $rootScope.$on('auth:logout-error', function(ev) {
    Materialize.toast('Error al cerrar sesion');
  });

  $rootScope.$on('auth:password-reset-request-success', function(ev) {
    Materialize.toast('Ok');
  });

  $rootScope.$on('auth:password-reset-request-error', function(ev) {
    Materialize.toast('No');
  });

});

//Controlador para la gestion de usuarios
agroind.controller('usersController', function ($scope, $rootScope, $stateParams, $state, $auth, Users, config, Profiles) {

 $scope.loadMyAccountForm = function () {
    // console.log($scope.updateAccountForm);
    var user = $rootScope.loggedUser;
    $scope.updateAccountForm = {
      name: user.name,
      last_name: user.last_name,
      address: user.address,
      email: user.email
    };
  }

  $scope.indexUser = function () {
    Users.getUsers().then(function (response) {
      $scope.allUsers = response.data;
    });
  }

  $scope.viewUser = function () {
    Users.getUser($stateParams.id).then(function (response) {
      $scope.user = response.data;
      // console.log(response.data);
    });
  }

  $scope.editUser = function (id, name, last_name, address, email, profile_id) {
    user = $scope.user;
    Users.editUser(user.id,
                   user.name,
                   user.last_name,
                   user.address,
                   user.email,
                   user.profile_id).then(function (response) {
                     Materialize.toast('Se ha actualizado el usuario correctamente!', 4000);
                     $state.go('users');
                   });
  }

  $scope.listProfiles = function () {
     Profiles.getProfiles().then(function (response) {
      $scope.allProfiles = response.data; 
    });
  }

  $scope.delete = function (id) {
    Users.deleteUser(id).then(function (response) {
      $scope.allUsers.splice(id,1);
      // Materialize.toast('Cierre de sesion correcto!', 4000);
    });
  }

});

// Controlador para la gestion de perfiles
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
        // id: response.data.id,
        // name: response.data.name,
        // users_permission: response.data.users_permission,
        // indicators_permission: response.data.indicators_permission,
        // reports_permission: response.data.reports_permission,
        // profiles_permission: response.data.profiles_permission
        id: response.data.id,
        name: response.data.name,
        users_permission: response.data.users_permission,
        list_users: response.data.list_users,
        create_users: response.data.create_users,
        edit_users: response.data.edit_users,
        deactivate_users: response.data.deactivate_users,
        indicators_permission: response.data.indicators_permission,
        reports_permission: response.data.reports_permission,
        statistics_permission: response.data.statistics_permission,
        profiles_permission: response.data.profiles_permission,
        list_profiles: response.data.list_profiles,
        create_profiles: response.data.create_profiles,
        edit_profiles: response.data.edit_profiles,
        clone_profiles: response.data.clone_profiles
      }
      // console.log($scope.profile);
    });
  }

  $scope.newProfile = function () {
    Profiles.newProfile($scope.name,
                        $scope.users_permission,
                        $scope.list_users,
                        $scope.create_users,
                        $scope.edit_users,
                        $scope.deactivate_users,
                        $scope.indicators_permission,
                        $scope.reports_permission,
                        $scope.statistics_permission,
                        $scope.profiles_permission,
                        $scope.list_profiles,
                        $scope.create_profiles,
                        $scope.edit_profiles,
                        $scope.clone_profiles
                        ).then(function (response) {
                          Materialize.toast('Se ha creado el perfil correctamente!', 4000);
                          $state.go('profiles');
                        }).catch(function (error) {
                          for (var i = error.data['name'].length - 1; i >= 0; i--) {
                            Materialize.toast(error.data['name'][i],4000);
                          }
                        });
  }

  $scope.editProfile = function () {
    profile = $scope.profile;
    Profiles.editProfile(profile.id, 
                         profile.name, 
                         profile.users_permission,
                         profile.list_users,
                         profile.create_users,
                         profile.edit_users,
                         profile.deactivate_users,
                         profile.indicators_permission,
                         profile.reports_permission,
                         profile.statistics_permission,
                         profile.profiles_permission,
                         profile.list_profiles,
                         profile.create_profiles,
                         profile.edit_profiles,
                         profile.clone_profiles).then(function (response) {
                          Materialize.toast('Se ha editado el perfil correctamente!', 4000);
                          $state.go('profiles');
                         }).catch(function (error) {
                          for (var i = error.data['name'].length - 1; i >= 0; i--) {
                            Materialize.toast(error.data['name'][i],4000);
                          }
                         });
  }

  $scope.cloneProfile = function (id) {
    profile = $scope.profile;
    Profiles.newProfile(profile.name, 
                        profile.users_permission,
                        profile.list_users,
                        profile.create_users,
                        profile.edit_users,
                        profile.deactivate_users,
                        profile.indicators_permission,
                        profile.reports_permission,
                        profile.statistics_permission,
                        profile.profiles_permission,
                        profile.list_profiles,
                        profile.create_profiles,
                        profile.edit_profiles,
                        profile.clone_profiles).then(function (response) {
                         Materialize.toast('Se ha clonado el perfil correctamente!', 4000);
                         $state.go('profiles');
                        }).catch(function (error) {
                         for (var i = error.data['name'].length - 1; i >= 0; i--) {
                           Materialize.toast(error.data['name'][i],4000);
                         }
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

agroind.controller('landsController', function ($scope, $stateParams, $state, Lands, Users, config) {

  $scope.allUsers = function () {
    Users.getUsers().then(function (response) {
      $scope.allUsers = response.data;
    })
  }
  
  $scope.indexLands = function () {
    Lands.getLands().then(function (response) {
      $scope.allLands = response.data;
    });
  }

  $scope.viewLand = function () {
    Lands.getLand($stateParams.id).then(function (response) {
      $scope.land = response.data;
    });
  }

  $scope.newLand = function () {
    Lands.newLand($scope.newLandForm).then(function (response) {
      console.log('creada');
    });
  }

  $scope.editLand = function () {
    Lands.editLand($scope.land).then(function (response) {
      console.log('creada');
    });
  }

});

// Controlador para la gestion de indicadores
agroind.controller('indicatorsController', function ($scope, $stateParams, $state, Indicators, config) {

  $scope.indexIndicators = function () {
    Indicators.getIndicators().then(function (response) {
      $scope.allIndicators = response.data;
    });
  }

  $scope.viewIndicator = function () {
    Indicators.getIndicator($stateParams.id).then(function (response) {
      $scope.indicator = response.data;
    });
  }

  $scope.newIndicator = function () {
    Indicators.newIndicator($scope.newIndicatorForm).then(function (response) {
      console.log('creado');
    });
  }

  $scope.editIndicator = function () {
    Indicators.editIndicator($scope.indicator).then(function (response) {
      console.log('editado');
    });
  }

});

// Controller for variables
agroind.controller('variablesController', function ($scope, $stateParams, $state, Variables, Indicators, config) {

  $scope.indexVariables = function () {
    Variables.getVariables().then(function (response) {
      $scope.allVariables = response.data;
    });
  }

  $scope.viewVariable = function () {
    Variables.getIndicator($stateParams.id).then(function (response) {
      $scope.variable = response.data;
    });
  }

  $scope.newVariable = function () {
    Variables.newVariable($scope.newLandForm).then(function (response) {
      console.log('creada');
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

  $scope.handlePwdResetBtnClick = function() {
    $auth.requestPasswordReset($scope.pwdResetForm)
      .then(function(resp) {
        // handle success response
      })
      .catch(function(resp) {
        // handle error response
      });
  };

  $scope.handleUpdatePasswordBtnClick = function() {
      $auth.updatePassword($scope.updatePasswordForm)
        .then(function(resp) {
          // handle success response
        })
        .catch(function(resp) {
          // handle error response
        });
    };

});
