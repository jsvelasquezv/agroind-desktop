var indicatorsService = angular.module("indicatorsService", []);

indicatorsService.service('Indicators', function ($http, config, pouchDB) {
var indicatorsUrl = config.apiUrl + '/indicators';
// console.log(indicatorsUrl);

  // Returns one profile
  this.getIndicator = function (id) {
    return $http.get(indicatorsUrl + '/' + id);
  }

  // returns all profiles
  this.getIndicators = function () {
    return $http.get(indicatorsUrl);
  }

  this.newIndicator = function (indicator) {
    return $http.post(indicatorsUrl, indicator);
  }

  this.editIndicator = function (indicator) {
    return $http.patch(indicatorsUrl + '/' + indicator.id, indicator);
  }

  this.deleteIndicator = function (id) {
    return $http.delete(indicatorsUrl + '/' + id);
  }
});