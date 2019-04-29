(function() {
	"use strict";

	angular
		.module("app")
		.factory("httpRequestInterceptor", interceptor);

	interceptor.$inject = ["$q"];

	function interceptor($q) {
		function token() {
			return window.localStorage.getItem("token");
		}

		function request(config) {
			config.headers["Authorization"] = token();
			config.headers["Accept"] = "application/json";

			return config;
		}

		function responseError(reject) {
			var defer = $q.defer();

			if (reject.status == 401) {
				console.dir(reject);
			}

			defer.reject(reject);

			return defer.promise;
		}

		return {
			request: request,
			responseError: responseError
		};
	}
})();