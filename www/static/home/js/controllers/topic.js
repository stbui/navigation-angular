app.controller('topicCtl', ['$scope', '$http', '$state', function ($scope, $http, $state) {
    $http.get('/api/topic').then(function (response) {
        $scope.topics = response.data.data;
    });

    $scope.toFavorite = function (id) {
        $state.go('app.favorite', {id: id});
    }
}]);