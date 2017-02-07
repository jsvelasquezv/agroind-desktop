var interceptorService = angular.module("interceptorService", []);

interceptorService.service('Interceptor', function ($rootScope) {
var interceptor = ['$rootScope', '$q', function ($rootScope, $q) {

        function success(response) {
            return response;
        }

        function error(response) {
            var status = response.status; // error code

            if ((status >= 400) && (status < 500)) {
                $rootScope.broadcast("AuthError", status);
                return;
            }

            if ( (status >= 500) && (status < 600) ) {
                $rootScope.broadcast("ServerError", status);
                return;
            }

            // otherwise
            return $q.reject(response);

        }

        return function (promise) {
            return promise.then(success, error);
        }

    }];
});