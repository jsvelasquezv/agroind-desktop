var profilesService = angular.module("profilesService", []);

profilesService.service('Profiles', function ($http, config) {
var profilesUrl = config.apiUrl + '/profiles';
// console.log(profilesUrl);

  // Returns one profile
  this.getProfile = function (id) {
    return $http.get(profilesUrl + '/' + id);
  }

  // returns all profiles
  this.getProfiles = function () {
    return $http.get(profilesUrl);
  }

  this.newProfile = function (name, users_permission, indicators_permission, reports_permission, statistics_permission, profiles_permission) {
    var data = {
      name: name,
      users_permission: users_permission,
      indicators_permission: indicators_permission,
      reports_permission: reports_permission,
      statistics_permission: statistics_permission,
      profiles_permission: profiles_permission
    };
    return $http.post(profilesUrl, data);
  }

  this.editProfile = function (id, name, users_permission, indicators_permission, reports_permission, statistics_permission, profiles_permission) {
    var data = {
      id: id,
      name: name,
      users_permission: users_permission,
      indicators_permission: indicators_permission,
      reports_permission: reports_permission,
      statistics_permission: statistics_permission,
      profiles_permission: profiles_permission
    };
    return $http.patch(profilesUrl + '/' + id, data);
  }

  this.deleteProfile = function (id) {
    return $http.delete(profilesUrl + '/' + id);
  }
});