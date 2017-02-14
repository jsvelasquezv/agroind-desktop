var evaluationsService = angular.module("evaluationsService", []);

evaluationsService.service('Evaluations', function ($http, config) {
var evaluationsUrl = config.apiUrl + '/evaluations';
// console.log(evaluationsUrl);

  // Returns one profile
  this.getEvaluation = function (id) {
    return $http.get(evaluationsUrl + '/' + id);
  }

  // returns all profiles
  this.getEvaluations = function () {
    return $http.get(evaluationsUrl);
  }

  this.newEvaluation = function (evaluation) {
    return $http.post(evaluationsUrl, evaluation);
  }

  this.editEvaluation = function (id, name, land_id, user_id) {
    var data = {
      id :id,
      name :name,
      land_id :land_id,
      user_id :user_id,
    };
    return $http.patch(evaluationsUrl + '/' + id, data);
  }

  this.getQualifications = function (evaluation_id, indicator_id) {
    return $http.get(evaluationsUrl + '/' + evaluation_id + '/qualifications/indicator/' + indicator_id);
  }

  this.qualifyEvaluation = function(qualifications) {
    return $http.post(evaluationsUrl + '/qualify', qualifications);
  }

  this.deleteEvaluation = function (id) {
    return $http.delete(evaluationsUrl + '/' + id);
  }
});