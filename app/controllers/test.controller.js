(function() {

	"use strict";

	angular
		.module("app")
		.controller("testController", testController);

	testController.$inject = ["testFactory"];

	function testController(testFactory) {
		var vm = this;
		vm.token = "token";

		// funciones 
		vm.getToken = getToken;

		// variables 
		vm.test = "test";

		activate();

		function activate() {
			// variables o funciones que se inicializan junto al controlador
		}

		function getToken(e) {
			testFactory.getToken().then(function(response) {
				vm.token = response;
			}).catch(function(error) {

			});
		}
	}
})();