var usersService = angular.module("usersService", []);

usersService.service('Users', function ($http, config) {
  var usersUrl = config.apiUrl + '/users';


  this.getUsers = function () {
    return $http.get(usersUrl);
  }

  this.getUser = function (id) {
    return $http.get(usersUrl + '/' + id);
  }

  this.newUser = function (user) {
    return $http.post(usersUrl, user);
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