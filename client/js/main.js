var app = angular.module('myRedditApp', ['ngRoute']);

app.controller('listController', ['$scope', '$rootScope', 'redditService', function($scope, $rootScope, redditService) {
		$scope.getList = function(){
			redditService.makeRequest()
			.then(function(success) {
				$scope.gifs = success;
			});
		};
	}
]);

app.controller('singleController', ['$scope', '$rootScope', '$routeParams', 'redditService', 'redditFactory', function($scope, $rootScope, $routeParams, redditService, redditFactory) {
		var id = $routeParams.id;

		$scope.getSinglePost = function() {
			redditService.makeRequest()
			.then(function(success) {
				$scope.post = redditFactory.getSinglePost(id, success);
			});
		}
	}
]);

app.service('redditFactory', function() {
	this.getSinglePost = function(id, success) {
		for (var i = 0; i < success.length; i++) {
			if (success[i].id === id) {
                return success[i];
            }
		}
	};

	this.transformData = function(response) {
		var children = response.data.data.children;
		var results = [];

		for (var i = 0; i < children.length; i++) {
			var gif = children[i].data;

			results.push({
				id: gif.id,
				title: gif.title,
				thumbnail: gif.thumbnail,
				url: gif.url.replace('.gifv', '.gif')
			});
		}

		return results;
	};
});

app.service('redditService', ['$http', 'redditFactory', function($http, redditFactory) {
		this.endpoint = 'https://www.reddit.com/r/gif.json';

		this.makeRequest = function(endpoint) {
			return $http({
				method: 'GET',
				url: this.endpoint
			})
			.then(function(response) {
				return redditFactory.transformData(response);
			})
			.catch(function(error) {
				console.log('whoops');
				console.log(error);
			});
		};
	}
]);

app.config(['$routeProvider', function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'views/list.html',
			controller: 'listController'
		})
		.when('/:id', {
			templateUrl: 'views/single.html',
			controller: 'singleController'
		})
		.otherwise({
			redirectTo: '/'
		});
}]);
