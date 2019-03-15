(function() {

	"use strict";

	angular
		.module("app", ["ngRoute"])
		.config(config)
		.run(run);

	config.$inject = ["$routeProvider", "$httpProvider"];

	function config($routeProvider, $httpProvider) {
		$httpProvider.interceptors.push("httpRequestInterceptor");

		$routeProvider
			.when("/", {
				templateUrl: "templates/test.html",
				controller: "testController",
				controllerAs: "vm"
			})
			.otherwise({
				template: "<p>test</p>"
			});
	}

	run.$inject = [];

	function run() {

	}

})();