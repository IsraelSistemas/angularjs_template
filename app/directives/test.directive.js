(function() {

	"use strict";

	angular
		.module("app")
		.directive("testDirective", testDirective);

	testDirective.$inject = [];

	function testDirective() {
		var directive = {
			template: "<div><button ng-click='vm.mensaje($event);'>dale click aqui</button></div>",
			link: link,
			restrict: "EA",
			controller: controller,
			controllerAs: "vm"
		};

		function link(scope, element, attrs) {

		}

		function controller() {
			var vm = this;

			// funciones 
			vm.mensaje = mensaje;

			// variables 

			function mensaje(e) {
				console.log(e.currentTarget);
			}
		}

		return directive;
	}
})();