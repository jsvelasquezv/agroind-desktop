var connectionStatusService = angular.module("connectionStatusService", []);

connectionStatusService.factory('ConnectionStatus', function() {
  return {
    request: function(config) {
      return config;
    },
    requestError: function(config) {
      return config;
    },
    response: function(response) {
      return response;
    },
    responseError: function(rejection) {
      if(rejection.status <= 0) {
          Materialize.toast("Sin conexion", 4000);
          return rejection;
      }
      return $q.reject(rejection);
    }
  };
});