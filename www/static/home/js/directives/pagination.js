angular.module('app').directive('stbuiPagination', [function () {
    return {
        restrict: 'AE',
        template: '<ul class="pagination pagination-md">' +
        '<li><a ng-click="setPage(1)" href="javascript:;">首页</a></li>' +
        '<li ng-class="{active:pageData.currentPage== page}" ng-repeat="page in pages"><a ng-click="setPage(page)" href="javascript:;">{{page}}</a></li>' +
        '<li><a ng-click="setPage(pageData.totalPages-1)" href="javascript:;">尾页</a></li>' +
        '</ul>',
        scope: {
            method: '='
        },
        replace: true,
        link: function ($scope, $element, $attrs) {
            // console.log($scope);
            // console.log($attrs);

            $scope.pageData = {
                count: 0,
                totalPages: 0,
                numsPerPage: 20,
                currentPage: 1
            };


            $scope.setPage = function (page, topic) {
                $scope.method(topic, page, $scope.pageData.numsPerPage, function (data) {
                    $scope.pageData.count = data.count;
                    $scope.pageData.totalPages = data.totalPages;
                    $scope.pageData.numsPerPage = data.numsPerPage;
                    $scope.pageData.currentPage = data.currentPage;


                    var pages = [];
                    for (var i = 1; i < $scope.pageData.totalPages; i++) {
                        pages.push(i);
                    }

                    var start = 0, end = 0;
                    if ($scope.pageData.currentPage - 5 <= 0) {
                        start = 0;
                        end = start + 10;
                    } else if ($scope.pageData.currentPage + 5 >= $scope.pageData.totalPages) {
                        end = $scope.pageData.totalPages;
                        start = end - 10;
                    } else {
                        start = $scope.pageData.currentPage - 6;
                        end = $scope.pageData.currentPage + 5;
                    }

                    $scope.pages = pages.slice(start, end);
                });
            }

            $scope.setPage(1);

        }
    }
}]);
