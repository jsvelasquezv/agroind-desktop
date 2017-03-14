var profilesService = angular.module("scoresService", []);

profilesService.service('Scores', function ($http, config, pouchDB) {
var evaluationsUrl = config.apiUrl + '/evaluations';
var scoresDB = pouchDB("scoresDB");
  
  this.loadScores = function (evaluation_id, indicator_id) {
    // return scoresDB.destroy();
    var startkey = evaluation_id.toString() + '_' + indicator_id.toString();
    var endkey = startkey + '\uffff';

    return scoresDB.allDocs({
      include_docs: true,
      attachments: true,
      startkey: startkey,
      endkey: endkey
    });
  }

  this.saveToLocal = function (scores) {
    var key = scores.evaluation_id + '_' + scores.indicator_id;
    scores._id = key;
    console.log(scores);
    return scoresDB.put(scores);
  }

  this.pushToRemote = function (scores) {
    return scoresDB.allDocs({
      include_docs: true,
      attachments: true
    }).then(function (response) {
      var qualifications = [];
      var qualification = {};
      response.rows.forEach(function (row, index) {
        doc = row.doc;
        qualification.evaluation_id = doc.evaluation_id;
        qualification.indicator_id = doc.indicator_id;
        qualification.qualifications = doc.qualifications;
        qualifications.push(qualification);
      });
      return $http.post(evaluationsUrl + '/batch/qualify',  qualifications);
    });
  }

});