var landsService = angular.module("landsService", []);

landsService.service('Lands', function ($http, config, pouchDB) {
var landsUrl = config.apiUrl + '/lands';
var landsDB = pouchDB("landsDB");
// console.log(landsUrl);
  // Returns one profile
  this.getLand = function (id) {
    return $http.get(landsUrl + '/' + id);
  }

  this.getLocalLand = function (id) {
    return landsDB.get(id.toString());
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
    return landsDB.destroy()
      .then(function (response) {
        landsDB = pouchDB("landsDB");
        landsToPouch = setIdsToLands(lands)
        return landsDB.bulkDocs(landsToPouch);
      })
      .catch(function (error) {
        console.log(error);
        return landsDB.bulkDocs(landsToPouch);
      });
  }

  this.loadFromLocal = function () {
    return landsDB.allDocs({
      include_docs: true,
      attachments: true
    });
  }

  // Sets the _id property required by pouch
  function setIdsToLands(lands) {
    var landsToPouch = [];
    var landToPouch = {};
    lands.forEach(function (land, index) {
      landToPouch = land;
      landToPouch._id = land.id.toString();
      landsToPouch.push(landToPouch);
    });
    return landsToPouch;
  }

});