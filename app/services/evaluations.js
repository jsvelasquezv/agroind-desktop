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

  this.getUserEvaluations = function (evaluator_id) {
    return $http.get(evaluationsUrl + '/evaluator/' + evaluator_id);
  }

  this.getIndicatorsAverages = function (evaluation_id) {
    return $http.get(evaluationsUrl + '/indicators/averages/' + evaluation_id);
  }

  this.newEvaluation = function (evaluation) {
    return $http.post(evaluationsUrl, evaluation);
  }

  this.saveRecommendations = function (evaluation_id, recommendations) {
    return $http.post(evaluationsUrl + '/' + evaluation_id + '/recommendation', {id: evaluation_id, recommendations: recommendations});
  }

  this.saveAnalysis = function (evaluation_id, analysis) {
    return $http.post(evaluationsUrl + '/' + evaluation_id + '/analysis', {id: evaluation_id, analysis: analysis});
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

  this.getEvaluationAnalysis = function (evaluation_id) {
    return $http.get(evaluationsUrl + '/' + evaluation_id + '/analysis')
  }

  this.addEvaluationAnalysis = function (evaluation_id, analysis) {
     return $http.post(evaluationsUrl + '/' + evaluation_id + '/analysis', analysis);
  }

  this.getEvaluationRecommendations = function (evaluation_id) {
    return $http.get(evaluationsUrl + '/' + evaluation_id + '/recommendations');
  }

  this.addEvaluationRecommendation = function (evaluation_id, recommendation) {
     return $http.post(evaluationsUrl + '/' + evaluation_id + '/recommendations', recommendation);
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
      });
  }

  this.loadFromLocal = function () {
    return evaluationsDB.allDocs({
      include_docs: true,
      attachments: true
    });
  }

  this.batchCreate = function (evaluations) {
    return $http.post(evaluationsUrl + '/batch/create', evaluations);
  }

  this.batchUpdate = function (evaluations) {
    return $http.patch(evaluationsUrl + '/batch/update', evaluations);
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

  this.clearLocalEvaluations = function () {
    return evaluationsDB.destroy().then(function (response) {
      evaluationsDB = pouchDB("evaluationsDB");
    }).catch(function (error) {
      console.log(error);
    });
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