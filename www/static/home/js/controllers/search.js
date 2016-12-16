app.controller('searchResultCtl' , function ($scope, $stateParams, $http) {
    console.log($stateParams.key);

    var url = '/api/link?keyword=' + $stateParams.key;

    $http.get(url).then(function (response) {
        var data = response.data;

        $scope.links = data;
    });

});
