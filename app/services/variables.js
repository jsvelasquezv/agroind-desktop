var variablesService = angular.module("variablesService", []);

variablesService.service('Variables', function ($http, config) {
var variablesUrl = config.apiUrl + '/variables';
// console.log(variablesUrl);

  // Returns one profile
  this.getVariable = function (id) {
    return $http.get(variablesUrl + '/' + id);
  }

  // returns all profiles
  this.getVariables = function () {
    return $http.get(variablesUrl);
  }

  this.newVariable = function (name, land_id, user_id,) {
    var data = {
      name :name,
      land_id :land_id,
      user_id :user_id,
    };
    return $http.post(variablesUrl, data);
  }

  this.editIndicator = function (id, name, land_id, user_id,) {
    var data = {
      id :id,
      name :name,
      land_id :land_id,
      user_id :user_id,
    };
    return $http.patch(variablesUrl + '/' + id, data);
  }

  this.deleteIndicator = function (id) {
    return $http.delete(variablesUrl + '/' + id);
  }
});