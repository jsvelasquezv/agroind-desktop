var colorCodesService = angular.module("colorCodesService", []);

colorCodesService.service('ColorCodes', function ($http, config) {
var colorCodesUrl = config.apiUrl + '/color_codes';
// console.log(colorCodesUrl);

  // Returns one profile
  this.getColorCode = function (id) {
    return $http.get(colorCodesUrl + '/' + id);
  }

  // returns all profiles
  this.getColorCodes = function () {
    return $http.get(colorCodesUrl);
  }

  this.newColorCode = function (colorCode) {
    return $http.post(colorCodesUrl, colorCode);
  }

  this.editColorCode = function (colorCode) {
    return $http.patch(colorCodesUrl + '/' + colorCode.id, colorCode);
  }

});