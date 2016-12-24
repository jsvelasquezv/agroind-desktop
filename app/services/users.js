var usersService = angular.module("usersService", []);

usersService.service('Users', function ($http, config) {
  var usersUrl = config.apiUrl + '/users';


  this.getUsers = function () {
    return $http.get(usersUrl);
  }

  this.getUser = function (id) {
    return $http.get(usersUrl + '/' + id);
  }

  this.newUser = function (email, password, password_confirmation) {
    var data = {
      email: email,
      password: password,
      password_confirmation: password_confirmation
    };
    return $http.post(usersUrl, data);
  }

  this.editUser = function (id, name, last_name, address, email, profile_id) {
    var data = {
      name: name,
      last_name: last_name,
      address: address,
      email: email,
      profile_id: profile_id
    }
    return $http.patch(usersUrl + '/' + id, data);
  }

  this.deleteUser = function (id) {
    return $http.delete(usersUrl + '/' + id);
  } 
});