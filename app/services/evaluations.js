var evaluationsService = angular.module("evaluationsService", []);

evaluationsService.service('Evaluations', function ($http, config, pouchDB) {
var evaluationsUrl = config.apiUrl + '/evaluations';
var evaluationsDB = pouchDB("evaluationsDB");
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

  this.newLocalEvaluation = function (evaluation) {
    return evaluationsDB.post(evaluation);
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

  this.saveToLocal = function (evaluations) {
    return evaluationsDB.destroy()
      .then(function (response) {
        evaluationsDB = pouchDB("evaluationsDB");
        evaluationsToPouch = setIdsToEvaluations(evaluations)
        return evaluationsDB.bulkDocs(evaluationsToPouch);
      })
      .catch(function (error) {
        console.log(error);
        // return indicatorsDB.bulkDocs(indicatorsToPouch);
      });
  }

  this.loadFromLocal = function () {
    return evaluationsDB.allDocs({
      include_docs: true,
      attachments: true
    });
  }

  this.pushToRemote = function (evaluations) {
    evaluationsToRemote = [];
    evaluationToRemote = {};
    evaluations.forEach(function (evaluation, index) {
      evaluationToRemote.user_id = evaluation.user_id;
      evaluationToRemote.land_id = evaluation.land_id;
      evaluationsToRemote.push(evaluationToRemote);
    });
    return $http.post(evaluationsUrl + '/bulk/evaluations', evaluationsToRemote);
  }

  // Sets the _id property required by pouch
  function setIdsToEvaluations(evaluations) {
    var evaluationsToPouch = [];
    var evaluationToPouch = {};
    evaluations.forEach(function (evaluation, index) {
      evaluationToPouch = evaluation;
      evaluationToPouch._id = evaluation.id.toString();
      evaluationsToPouch.push(evaluationToPouch);
    });
    return evaluationsToPouch;
  }

});