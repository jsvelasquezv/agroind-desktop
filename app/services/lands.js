var landsService = angular.module("landsService", []);

landsService.service('Lands', function ($http, config, pouchDB) {
var landsUrl = config.apiUrl + '/lands';
var landsDB = pouchDB("landsDB");
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

  this.dbInfo = function () {
    return landsDB.info();
  }

  this.saveToLocal = function (lands) {
    return landsDB.bulkDocs(lands);
  }

  this.loadFromLocal = function () {
    return landsDB.allDocs({
      include_docs: true,
      attachments: true
    });
    // return landsDB.get('42775C38-F2F6-1707-BAA3-8ED60C51FA0E');
  }

});