var landsService = angular.module("landsService", []);

landsService.service('Lannds', function ($http, config) {
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

  this.newLand = function (propietary_document,
                           name,
                           zone,
                           municipality,
                           asnm,
                           latitude,
                           longitude,
                           area,
                           affiliation) {
    var data = {
      propietary_document :propietary_document,
      name :name,
      zone :zone,
      municipality :municipality,
      asnm :asnm,
      latitude :latitude,
      longitude:longitude,
      area :area,
      affiliation :affiliation
    };
    return $http.post(landsUrl, data);
  }

  this.editLand = function (id,
                            propietary_document,
                            name,
                            zone,
                            municipality,
                            asnm,
                            latitude,
                            longitude,
                            area,
                            affiliation) {
    var data = {
      id :id,
      propietary_document :propietary_document,
      name :name,
      zone :zone,
      municipality :municipality,
      asnm :asnm,
      latitude :latitude,
      longitude:longitude,
      area :area,
      affiliation :affiliation
    };
    return $http.patch(landsUrl + '/' + id, data);
  }

  this.deleteLand = function (id) {
    return $http.delete(landsUrl + '/' + id);
  }
});