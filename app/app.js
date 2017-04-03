var agroind = angular.module('agroind', [
  'ui.router',
  'ipCookie',
  'ng-token-auth',
  'angular-loading-bar',
  'ngAnimate',
  'ngMessages',
  'pouchdb',
  'usersService',
  'profilesService',
  'landsService',
  'indicatorsService',
  'variablesService',
  'evaluationsService',
  'scoresService',
  'statisticsService',
  'ncy-angular-breadcrumb'
]);
var compareTo = function() {
    return {
        require: "ngModel",
        scope: {
            otherModelValue: "=compareTo"
        },
        link: function(scope, element, attributes, ngModel) {
             
            ngModel.$validators.compareTo = function(modelValue) {
                return modelValue == scope.otherModelValue;
            };
 
            scope.$watch("otherModelValue", function() {
                ngModel.$validate();
            });
        }
    };
};
 
agroind.directive("compareTo", compareTo);
agroind.factory('ConnectionStatus', function($rootScope, $q) {
  return {
    request: function(config) {
      return config;
    },
    requestError: function(config) {
      return config;
    },
    response: function(response) {
      $rootScope.online = "on";
      return response;
    },
    responseError: function(rejection) {
      if(rejection.status <= 0) {
          Materialize.toast("Sin conexion", 4000);
          $rootScope.online = "off";
          return rejection;
      }
      return $q.reject(rejection);
    }
  };
});

agroind.constant('config', {
  apiRoot: 'http://localhost:3000',
  apiUrl: 'http://localhost:3000/api/v1',
  // apiUrl: 'http://ec2-54-207-63-95.sa-east-1.compute.amazonaws.com:3000/api/v1',
  // apiUrl: 'https://agroind-api-jsvelasquezv.c9users.io/api/v1',
  // localDBName: "agroind-local"
});

// Configuration of router service
agroind.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

  $httpProvider.interceptors.push('ConnectionStatus');

  $urlRouterProvider.otherwise("/login");

  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'pages/home.html',
      ncyBreadcrumb: {
    label: 'Home'
  }
    })
    .state('login', {
      url: '/login',
      templateUrl: 'pages/login.html'
      // controller: 'authController'
    })
    .state('newUser', {
      url: '/newUser',
      templateUrl: 'pages/users/new.html',
      controller: 'usersController'
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
    .state('localIndicators', {
      url: '/localIndicators',
      templateUrl: 'pages/indicators/local/index.html',
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
    .state('variables', {
      url: '/variables',
      templateUrl: 'pages/variables/index.html',
      controller: 'variablesController'
    })
    .state('localVariables', {
      url: '/localVariables',
      templateUrl: 'pages/variables/local/index.html',
      controller: 'variablesController'
    })
    .state('newVariable', {
      url: '/newVariable',
      templateUrl: 'pages/variables/new.html',
      controller: 'variablesController'
    })
    .state('editVariable', {
      url: '/editVariable/:id',
      templateUrl: 'pages/variables/edit.html',
      controller: 'variablesController'
    })
    .state('lands', {
      url: '/lands',
      templateUrl: 'pages/lands/index.html',
      controller: 'landsController'
    })
    .state('localLands', {
      url: '/localLands',
      templateUrl: 'pages/lands/local/index.html',
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
    .state('evaluations', {
      url: '/evaluations',
      templateUrl: 'pages/evaluations/index.html',
      controller: 'evaluationsController'
    })
    .state('localEvaluations', {
      url: '/localEvaluations',
      templateUrl: 'pages/evaluations/local/index.html',
      controller: 'evaluationsController'
    })
    .state('newEvaluation', {
      url: '/newEvaluation',
      templateUrl: 'pages/evaluations/new.html',
      controller: 'evaluationsController'
    })
    .state('newLocalEvaluation', {
      url: '/newLocalEvaluation',
      templateUrl: 'pages/evaluations/local/new.html',
      controller: 'evaluationsController'
    })
    .state('qualifyIndicators', {
      url: '/qualifyIndicators/:evaluation_id',
      templateUrl: 'pages/qualifications/index.html',
      controller: 'evaluationsController'
    })
    .state('qualifyIndicator', {
      url: '/qualifyIndicator/:indicator_id',
      templateUrl: 'pages/qualifications/indicator.html',
      controller: 'evaluationsController'
    })
    .state('localQualifyIndicators', {
      url: '/localQualifyIndicators/:evaluation_id',
      templateUrl: 'pages/qualifications/local/index.html',
      controller: 'evaluationsController'
    })
    .state('localQualifyIndicator', {
      url: '/localQualifyIndicator/:indicator_id',
      templateUrl: 'pages/qualifications/local/indicator.html',
      controller: 'evaluationsController'
    })
    .state('ranking', {
      url: '/ranking',
      templateUrl: 'pages/statistics/rankings.html',
      controller: 'statisticsController'
    })
    .state('radarGraphicDates', {
      url: '/radarGraphicDates',
      templateUrl: 'pages/statistics/average_radar_graphic.html',
      controller: 'statisticsController'
    })
    .state('evaluationReport', {
      url: '/evaluationReport/:evaluation_id',
      templateUrl: 'pages/statistics/evaluation_report.html',
      controller: 'statisticsController'
    })
    .state('recommendations', {
      url: '/recommendations/:evaluation_id',
      templateUrl: 'pages/evaluations/recommendations.html',
      controller: 'evaluationsController'
    })
});

//Configuration of authentication service
agroind.config(function($authProvider) {
  $authProvider.configure({
    apiUrl: 'http://localhost:3000/api/v1',
    // apiUrl: 'http://ec2-54-207-63-95.sa-east-1.compute.amazonaws.com:3000/api/v1',
     //apiUrl: 'https://agroind-api-jsvelasquezv.c9users.io/api/v1',
    storage: 'localStorage'
  });
});


// agroind.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
//   cfpLoadingBarProvider.parentSelector = '#spinner-container';
// }]);

//Controladores

agroind.controller('mainController', function($scope, $rootScope, $state, $http, pouchDB, Users, Profiles, config) {
    

    // ********** pouchdb test 

  // var db = pouchDB($state.current.name);
  // var db2 = pouchDB("holi");
  // var db = pouchDB("landsDB");
  
  // $rootScope.loggedIn = false;
  // $rootScope.online = false;

  $scope.reconnect = function () {
    $http.get(config.apiRoot + '/ping').then(function (response) {
      if (response.data == 'ok') {
        Materialize.toast('Conectado', 4000);
        $rootScope.online = true;
      }
    })
  }
  // $rootScope.$on("offline", function () {
  //   Materialize.toast("Disconnected");
  //   $rootScope.online = true;
  // });

  $scope.checkLogin = function () {
    // config.apiUrl;
    $rootScope.loggedIn = !$rootScope.loggedIn;
    // $rootScope.online = false;
  };

  // $scope.infoDB = function () {
  //   // Lands.dbInfo().then(function (info) {
  //   //   console.log(info);
  //   // });
  //   console.log($rootScope.online);
  // };
  // $scope.deleteDB = function () {
  //   db.destroy().then(function (response) {
  //     console.log(response);
  //   });
  //   // db2.destroy().then(function (response) {
  //   //   console.log(response);
  //   // })
  // };

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

  $scope.sincronizeAll = function () {
    
  }

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
      $scope.profile_id = response.data.profile_id;
    });
  }

  $scope.newUser = function () {
    console.log($scope.newUserForm);
    Users.newUser($scope.newUserForm).then(function (response) {
      Materialize.toast("Usuario registrado correctamente", 4000);
      $state.go('users');
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
    var updatedAllUsers;
    Users.deleteUser(id).then(function (response) {
      // updatedAllUsers = $scope.allUsers.filter(function (user) {
      //   return user.id !== id;
      // });
      // $scope.allUsers = updatedAllUsers;
      $scope.indexUser();
      Materialize.toast('Se ha eliminado el usuario', 4000);
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
      console.log("Perfil eliminado correctamente");
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
      Materialize.toast("Se ha registrado la propiedad", 4000);
      $state.go('lands');
    });
  }

  $scope.editLand = function () {
    Lands.editLand($scope.land).then(function (response) {
      Materialize.toast("Se han guardado los cambios", 4000);
      $state.go('lands');
    });
  }

  $scope.downloadLands = function () {
    Lands.saveToLocal($scope.allLands).then(function (response) {
      Materialize.toast("Se ha descargado correctamente la informacion");
    }).catch(function (error) {
      Materialize.toast("Error al descargar la informacion");
    });
  }

  $scope.downloadedLands = function () {
    Lands.loadFromLocal().then(function (response) {
      $scope.localAllLands = response.rows.map(function(row) {return row.doc;});
    }).catch(function (error) {
      console.log(error);
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
      Materialize.toast("Se ha creado el indicador", 4000);
      $state.go('indicators');
    });
  }

  $scope.editIndicator = function () {
    Indicators.editIndicator($scope.indicator).then(function (response) {
      Materialize.toast("Se han guardado los cambios", 4000);
      $state.go('indicators');
    });
  }

  $scope.downloadIndicators = function () {
    Indicators.saveToLocal($scope.allIndicators).then(function (response) {
      Materialize.toast("Se ha descargado correctamente la informacion");
    }).catch(function (error) {
      console.log(error);
      Materialize.toast("Error al descargar la informacion");
    });
  }

  $scope.downloadedIndicators = function () {
    Indicators.loadFromLocal().then(function (response) {
      $scope.localAllIndicators = response.rows.map(function(row) {return row.doc;});
    }).catch(function (error) {
      console.log(error);
    });
  }

});

// Controller for variables
agroind.controller('variablesController', function ($scope, $stateParams, $state, Variables, Indicators, config) {

  $scope.allIndicators = function () {
    Indicators.getIndicators().then(function (response) {
      $scope.allIndicators = response.data;
    })
  }

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

  $scope.loadVariable = function () {
    Variables.getVariable($stateParams.id).then(function (response) {
      $scope.variable = response.data;
    });
  }

  $scope.newVariable = function () {
    Variables.newVariable($scope.newVariableForm).then(function (response) {
      Materialize.toast("Se ha creado la variable", 4000);
      $state.go('variables');
    });
  }

  $scope.editVariable = function () {
    Variables.editVariable($scope.variable).then(function (response) {
      Materialize.toast("Se han guardado los cambios", 4000);
      $state.go('variables');
    });
  }

  $scope.downloadVariables = function () {
    Variables.saveToLocal($scope.allVariables).then(function (response) {
      Materialize.toast("Se ha descargado correctamente la informacion");
    }).catch(function (error) {
      console.log(error);
      Materialize.toast("Error al descargar la informacion");
    });
  }

  $scope.downloadedVariables = function () {
    Variables.loadFromLocal().then(function (response) {
      $scope.localAllVariables = response.rows.map(function(row) {return row.doc;});
    }).catch(function (error) {
      console.log(error);
    });
  }

});

agroind.controller('evaluationsController', function ($scope, $rootScope, $stateParams, $state, Indicators, Lands, Evaluations, Variables, Scores, config) {
  
  $scope.scores = {};
  $scope.localScores = {};

  $scope.loadQualificationsForm = function () {
    var indicator_id = $stateParams.indicator_id;
    Indicators.getIndicator(indicator_id).then(function (response) {
      $scope.indicator = response.data;
    });

    Evaluations.getQualifications($rootScope.currentEvaluationId, indicator_id).then(function (response) {
      var scores = {};
      response.data.forEach(function (score, key) {
        scores[parseFloat(score.variable_id)] = parseFloat(score.score);
      });
      $scope.scores = scores;
    });
  }

  $scope.localLoadQualificationsForm = function () {
    Variables.localVariablesFromIndicator($stateParams.indicator_id).then(function (response) {
      $scope.variables = response.rows.map(function(row) {return row.doc;});
    }).catch(function (error) {
      console.log(error);
    });
    Scores.loadScores($rootScope.localCurrentEvaluationId,$stateParams.indicator_id).then(function (response) {
      var scores = {};
      data = response.rows.map(function(row) {return row.doc;});
      data[0].qualifications.forEach(function (score, key) {
        scores[parseFloat(score.variable_id)] = parseFloat(score.score);
      });
      $scope.qualificationsRevision = data[0]._rev;
      $scope.localScores = scores;
    }).catch(function (error) {
      console.log(error);
    })
  }

  $scope.allIndicators = function () {
    $rootScope.currentEvaluationId = $stateParams.evaluation_id;
    Indicators.getIndicators().then(function (response) {
      $scope.allIndicators = response.data;
    });
  }

  $scope.allLands = function () {
    Lands.getLands().then(function (response) {
      $scope.allLands = response.data;
    });
  }

  $scope.allEvaluations = function () {
    Evaluations.getEvaluations().then(function (response) {
      $scope.allEvaluations = response.data;
    });
  }

  $scope.getIndicatorsAverages = function () {
    Evaluations.getIndicatorsAverages($stateParams.evaluation_id).then(function (response) {
      $scope.allIndicatorsAverages = response.data;
    });
  }

  $scope.newEvaluation = function () {
    var evaluation = {
      land_id: $scope.land_id,
      user_id: $rootScope.loggedUser.id,
      assignment_date: $scope.assignment_date
    }
    // console.log(evaluation);
    Evaluations.newEvaluation(evaluation).then(function (response) {
      Materialize.toast("Evaluacion creada", 4000);
      $state.go('evaluations');
    });
  }

  $scope.saveRecommendation = function () {
    Evaluations.saveRecommendation($stateParams.evaluation_id, $scope.recommendation).then(function (response) {
      Materialize.toast("Se ha guardado la recomendación", 4000);
    });
  }

  $scope.saveObservations = function () {
    Evaluations.saveObservations($stateParams.evaluation_id, $scope.observations).then(function (response) {
      Materialize.toast("Se han guardado las observaciones", 4000);
    });
  }

  $scope.newLocalEvaluation = function () {
    Lands.getLocalLand($scope.evaluation.land_id).then(function (land) {
      var evaluation = {
        land_id: $scope.evaluation.land_id,
        user_id: $rootScope.loggedUser.id,
        land: land,
        user: $rootScope.loggedUser
      };
      Evaluations.newLocalEvaluation(evaluation).then(function (response) {
        Materialize.toast("Evaluacion creada", 4000);
        $state.go('localEvaluations');
      }).catch(function (error) {
        console.log(error);
      });
    }).catch(function (error) {
        console.log(error);
    })
  }

  $scope.downloadedIndicators = function () {
    $rootScope.localCurrentEvaluationId = $stateParams.evaluation_id;
    Indicators.loadFromLocal().then(function (response) {
      $scope.localAllIndicators = response.rows.map(function(row) {return row.doc;});
    }).catch(function (error) {
      console.log(error);
    });
  }

  $scope.downloadedVariables = function () {
    Variables.loadFromLocal().then(function (response) {
      $scope.localAllVariables = response.rows.map(function(row) {return row.doc;});
    }).catch(function (error) {
      console.log(error);
    });
  }

  $scope.downloadedLands = function () {
    Lands.loadFromLocal().then(function (response) {
      $scope.localAllLands = response.rows.map(function(row) {return row.doc;});
    }).catch(function (error) {
      console.log(error);
    });
  }

  $scope.downloadEvaluations = function () {
    Evaluations.saveToLocal($scope.allEvaluations).then(function (response) {
      Materialize.toast("Se ha descargado correctamente la informacion");
    }).catch(function (error) {
      console.log(error);
      Materialize.toast("Error al descargar la informacion");
    });
  }

  $scope.downloadedEvaluations = function () {
    Evaluations.loadFromLocal().then(function (response) {
      $scope.localAllEvaluations = response.rows.map(function(row) {return row.doc;});
    }).catch(function (error) {
      console.log(error);
    });
  }

  $scope.uploadEvaluations = function () {
    var evaluationsToCreate = [];
    var evaluationsToUpdate = [];
    $scope.localAllEvaluations.forEach(function (evaluation, index) {
      var temp_evaluation = {};
      if (evaluation.id) {
        temp_evaluation.id = evaluation.id;
        temp_evaluation.land_id = evaluation.land_id;
        temp_evaluation.user_id = evaluation.user_id;
        evaluationsToUpdate.push(temp_evaluation);
      } else {
        temp_evaluation.land_id = evaluation.land_id;
        temp_evaluation.user_id = evaluation.user_id;
        evaluationsToCreate.push(temp_evaluation);
      }
    });

    if (evaluationsToCreate.length > 0) {
      var data = {evaluations: evaluationsToCreate};

      Evaluations.batchCreate(data).then(function (response) {
        Materialize.toast("Datos creados correctamente", 4000);
      }).catch(function (error) {
        console.log(error);
      });
    }

    if (evaluationsToUpdate.length > 0) {
      var data = {evaluations: evaluationsToUpdate};

      Evaluations.batchUpdate(data).then(function (response) {
        Materialize.toast("Datos actualizados correctamente", 4000);
      }).catch(function (error) {
        console.log(error);
      });
    }
  }

  $scope.qualify = function () {
    var qualifications = [];
    var qualification = {};
    var data = {};
    Object.keys($scope.scores).forEach(function (key) {
      qualification = {
        variable_id: key,
        score: $scope.scores[key]
      };
      qualifications.push(qualification);
    });
    data = {
      evaluation_id: $rootScope.currentEvaluationId,
      indicator_id: $stateParams.indicator_id,
      qualifications: qualifications
    };
    Evaluations.qualifyEvaluation(data).then(function (response) {
      Materialize.toast("Se han registrado las calificaciones", 4000);
      $state.go('qualifyIndicator', {indicator_id: $stateParams.indicator_id});
    });
  }

  $scope.localQualify = function () {
    var qualifications = [];
    var qualification = {};
    var data = {};
    Object.keys($scope.localScores).forEach(function (key) {
      qualification = {
        variable_id: key,
        score: $scope.localScores[key]
      };
      qualifications.push(qualification);
    });
    data = {
      evaluation_id: $rootScope.localCurrentEvaluationId,
      indicator_id: $stateParams.indicator_id,
      qualifications: qualifications
    };
    if ($scope.qualificationsRevision) {
      data._rev = $scope.qualificationsRevision;
    }
    // if (qualifications.length > 0) {
      Scores.saveToLocal(data).then(function (response) {
        Materialize.toast("Calificacion registrada correctamente", 4000);
      }).catch(function (error) {
        console.log(error);
      });
    // }
  }

  $scope.loadScores = function () {
    Scores.pushToRemote().then(function (response) {
      console.log(response);
    }).catch(function (error) {
      console.log(error);
    })
  }

});

agroind.controller('statisticsController', function ($scope, $stateParams, $state, Statistics, config) {
  
  $scope.loadEvaluationReport = function () {
    Statistics.getEvaluationReport().then(function (response) {
      $scope.evaluationReport = response.data;
    })
  }

  $scope.loadBestRanking = function () {
    Statistics.getBestRanking().then(function (response) {
      $scope.bestRanking = response.data;
    })
  }

  $scope.loadWorstRanking = function () {
    Statistics.getWorstRanking().then(function (response) {
      $scope.worstRanking = response.data;
    })
  }

  $scope.loadAverageRadarDates = function () {
    Statistics.getRadarData($scope.start_date, $scope.end_date).then(function (response) {
      var ctx = document.getElementById("average-radar-dates-graphic");
      var data = {
        labels: response.data.labels,
        datasets: response.data.datasets
      };
      var averageRadarChartDates = new Chart(ctx, {
        type: 'radar',
        data: data
      });
    })
  }

  $scope.loadEvaluationReport = function () {
    Statistics.getEvaluationReport($stateParams.evaluation_id).then(function (response) {
      $scope.evaluation_report = response.data;
      console.log(response.data);
      chartData = response.data.chartData;
      console.log(chartData);
      var ctx = document.getElementById("average-radar-indicator-chart");
      var averageRadarChartIndicator = new Chart(ctx, {
        type: 'radar',
        data: chartData
      });
    })
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
