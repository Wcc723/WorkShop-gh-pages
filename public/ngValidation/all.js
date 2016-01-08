(function() {

	app = angular.module('app', []);

	var matchTo = function() {
		return {
			require: "ngModel",
			scope: {
				otherModelValue: "=matchTo"
			},
			link: function(scope, element, attributes, ngModel) {

				ngModel.$validators.matchTo = function(modelValue) {
					return modelValue == scope.otherModelValue;
				};

				scope.$watch("otherModelValue", function() {
					ngModel.$validate();
				});
			}
		};
	};
	app.directive("matchTo", matchTo);


	app.controller('ngFormCtrl', ['$scope',function($scope){
		$scope.modal1 = {
			password: ''
		};
		$scope.modal2 = {
			name: '賈斯伯',
			email: 'test@test.com',
			tel_mobile: '0987655433',
			tel_office: '12345678'
		};
		$scope.ok = function(modal) {
			console.log(modal);
		};
	}]);


}());
// var matchTo = function() {
	
// };
 
// app.directive("matchTo", matchTo);