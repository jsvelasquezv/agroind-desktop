var usersService = angular.module("usersService",[]);

usersService.service('Users', function ($http) {
    // Returns all the moves for the logged user
    this.getUsers = function () {
        return $http.get('http://localhost:3000/api/v1/users');
    }

    //Create a new move for the user logged
    /*this.createMove = function (name, description, amount, movement_date, user_id) {
        return $http.post('http://localhost:3000/api/moves',{
            name          : name,
            description   : description,
            amount        : amount,
            user_id       : user_id,
            movement_date : movement_date
        });
    }*/
});