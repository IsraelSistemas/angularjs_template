(function() {

	"use strict";

	angular
		.module("app")
		.factory("testFactory", testFactory);

	testFactory.$inject = ["$http", "$q", "config"];

	function testFactory($http, $q, config) {

		function getToken() {
			var deferred = $q.defer();
			var endPoint = "TestController/GetName/test";

			$http.get(config.apiUrl + endPoint).then(function(response) {
				deferred.resolve(response.data);
			}, function(error) {
				deferred.reject(error);
			});

			return deferred.promise;
		}

		return {
			getToken: getToken
		};

	}
})();