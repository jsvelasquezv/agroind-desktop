var indicatorsService = angular.module("indicatorsService", []);

indicatorsService.service('Indicators', function ($http, config) {
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

  this.newIndicator = function (name, land_id, user_id) {
    var data = {
      name :name,
      lands_id :land_id,
      users_id :user_id,
    };
    return $http.post(indicatorsUrl, data);
  }

  this.editIndicator = function (id, name, land_id, user_id) {
    var data = {
      id :id,
      name :name,
      land_id :land_id,
      user_id :user_id,
    };
    return $http.patch(indicatorsUrl + '/' + id, data);
  }

  this.deleteIndicator = function (id) {
    return $http.delete(indicatorsUrl + '/' + id);
  }
});