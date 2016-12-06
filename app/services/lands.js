var landsService = angular.module("landsService", []);

landsService.service('Lands', function ($http, config) {
var landsUrl = config.apiUrl + '/lands';
// console.log(landsUrl);

  // Returns one profile
  this.getLand = function (id) {
    return $http.get(landsUrl + '/' + id);
  }

  // returns all profiles
  this.getLands = function () {
    return $http.get(landsUrl);
  }

  this.newLand = function (land) {
    return $http.post(landsUrl, land);
  }

  this.editLand = function (land) {
    return $http.patch(landsUrl + '/' + land.id, land);
  }

  this.deleteLand = function (id) {
    return $http.delete(landsUrl + '/' + id);
  }
});