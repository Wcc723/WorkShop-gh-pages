
app = angular.module('app', ['ngSanitize', 'monospaced.elastic']);

app.filter('newlines', function () {
    return function(text) {
        return text.replace(/\n/g, '<br/>');
    }
})
app.filter('noHTML', function () {
    return function(text) {
        return text
                .replace(/&/g, '&amp;')
                .replace(/>/g, '&gt;')
                .replace(/</g, '&lt;');
    }
});

app.controller('ngFormCtrl', ['$scope',function($scope){
	$scope.data = [
		{
			text: '<script src="//ajax.googleapis.com/ajax/libs/angularjs/1.4.3/angular-sanitize.js"></script> 記得載入 \n  斷行：http://plnkr.co/edit/?p=preview \n  自動延展：https://github.com/monospaced/angular-elastic'
		}
	];
	$scope.temp = {};
	$scope.ok = function(modal) {
		$scope.data.push(angular.copy($scope.temp));
		$scope.temp = {};
	};
}]);


