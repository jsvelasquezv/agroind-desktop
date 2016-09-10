var profilesService = angular.module("profileService",[]);
var apiUrl = 'http://localhost:3000/api/v1/';

profileService.service('Profiles', function ($http) {

  // Returns one profile
  this.getProfile = function (id) {
    return $http.get(apiUrl + 'profiles/' + id);
  }

  this.getProfiles = function () {
    return $http.get(apiUrl + '/profiles');
  }

});