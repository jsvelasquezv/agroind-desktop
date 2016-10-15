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

  this.newProfile = function (name, 
                              users_permission,
                              list_users,
                              create_users,
                              edit_users,
                              deactivate_users,
                              indicators_permission,
                              reports_permission,
                              statistics_permission,
                              profiles_permission,
                              list_profiles,
                              create_profiles,
                              edit_profiles,
                              clone_profiles) {
    var data = {
      name: name,
      users_permission: users_permission,
      list_users: list_users,
      create_users: create_users,
      edit_users: edit_users,
      deactivate_users: deactivate_users,
      indicators_permission: indicators_permission,
      reports_permission: reports_permission,
      statistics_permission: statistics_permission,
      profiles_permission: profiles_permission,
      list_profiles: list_profiles,
      create_profiles: create_profiles,
      edit_profiles: edit_profiles,
      clone_profiles: clone_profiles
    };
    return $http.post(profilesUrl, data);
  }

  this.editProfile = function (id, 
                              name, 
                              users_permission,
                              list_users,
                              create_users,
                              edit_users,
                              deactivate_users,
                              indicators_permission,
                              reports_permission,
                              statistics_permission,
                              profiles_permission,
                              list_profiles,
                              create_profiles,
                              edit_profiles,
                              clone_profiles) {
    var data = {
      id: id,
      name: name,
      users_permission: users_permission,
      list_users: list_users,
      create_users: create_users,
      edit_users: edit_users,
      deactivate_users: deactivate_users,
      indicators_permission: indicators_permission,
      reports_permission: reports_permission,
      statistics_permission: statistics_permission,
      profiles_permission: profiles_permission,
      list_profiles: list_profiles,
      create_profiles: create_profiles,
      edit_profiles: edit_profiles,
      clone_profiles: clone_profiles
    };
    return $http.patch(profilesUrl + '/' + id, data);
  }

  this.deleteProfile = function (id) {
    return $http.delete(profilesUrl + '/' + id);
  }
});