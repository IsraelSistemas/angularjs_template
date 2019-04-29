(function() {

	"use strict";

	angular
		.module("app", ["ngRoute", "ngMaterial", "ngMessages", "ngMdIcons"])
		.config(config)
		.run(run);

	config.$inject = ["$routeProvider", "$httpProvider", "$mdThemingProvider", "$locationProvider"];

	function config($routeProvider, $httpProvider, $mdThemingProvider, $locationProvider) {
		$httpProvider.interceptors.push("httpRequestInterceptor");

		$mdThemingProvider.theme("default")
			.primaryPalette("pink")
			.accentPalette("orange")
			.warnPalette("red");

		$locationProvider.hashPrefix("");

		$routeProvider
			.when("/test", {
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