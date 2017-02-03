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

  this.newVariable = function (variable) {
    console.log("service");
    console.log(variable);
    // var data = {
    //   name :name,
    //   optimun_rating :optimun_rating,
    //   indicators_id :indicators_id,
    // };
    // return $http.post(variablesUrl, data);
    return $http.post(variablesUrl, variable);
  }

  this.editVariable = function (name, optimun_rating, indicators_id) {
    var data = {
      name :name,
      optimun_rating :optimun_rating,
      indicators_id :indicators_id,
    };
    return $http.patch(variablesUrl + '/' + id, data);
  }

  this.deleteVariable = function (id) {
    return $http.delete(variablesUrl + '/' + id);
  }
});