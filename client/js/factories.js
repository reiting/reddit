angular.module('RachelsFactory.factories', [])
    //specifically the blogpost factory
    .factory('RedditFactory', ['$resource', function($resource) {
        return $resource('https://www.reddit.com/r/aww.json', { id: '@id' }, {
            'update': {method: 'PUT'},
    });
}]);