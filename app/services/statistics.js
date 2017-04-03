var statisticsService = angular.module("statisticsService", []);

statisticsService.service('Statistics', function ($http, config) {

  this.getBestRanking = function () {
    return $http.get(config.apiUrl + '/statistics/ranking/best');
  }

  this.getWorstRanking = function () {
    return $http.get(config.apiUrl + '/statistics/ranking/worst');
  }

  this.getRadarData = function (start_date, end_date) {
    return $http.get(config.apiUrl + '/statistics/graphics/radar/start_date/' + start_date + '/end_date/' + end_date);
  }

  this.getEvaluationReport = function (evaluation_id) {
    return $http.get(config.apiUrl + '/statistics/evaluation/' + evaluation_id)
  }

});