var indicatorsService = angular.module("indicatorsService", []);

indicatorsService.service('Indicators', function ($http, config, pouchDB) {
var indicatorsUrl = config.apiUrl + '/indicators';
var indicatorsDB = pouchDB("indicatorsDB");
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

  // this.deleteIndicator = function (id) {
  //   return $http.delete(indicatorsUrl + '/' + id);
  // }

  this.saveToLocal = function (indicators) {
    return indicatorsDB.destroy()
      .then(function (response) {
        console.log(response);
        indicatorsDB = pouchDB("indicatorsDB");
        indicatorsToPouch = setIdsToIndicators(indicators)
        return indicatorsDB.bulkDocs(indicatorsToPouch);
      })
      .catch(function (error) {
        console.log(error);
        // return indicatorsDB.bulkDocs(indicatorsToPouch);
      });
  }

  this.loadFromLocal = function () {
    return indicatorsDB.allDocs({
      include_docs: true,
      attachments: true
    });
  }

  // Sets the _id property required by pouch
  function setIdsToIndicators(indicators) {
    var indicatorsToPouch = [];
    var indicatorToPouch = {};
    indicators.forEach(function (indicator, index) {
      indicatorToPouch = indicator;
      indicatorToPouch._id = indicator.id.toString();
      indicatorsToPouch.push(indicatorToPouch);
    });
    return indicatorsToPouch;
  }
  
});