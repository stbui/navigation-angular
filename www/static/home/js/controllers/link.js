app.controller('linkCtl', function ($scope, $http, $anchorScroll, $stateParams, $localStorage, $modal,toaster) {

    $http.get('/api/topic').then(function (response) {
        $scope.topics = response.data.data;
    });

    $scope.fetchLabelData = function (topicId) {
        $http.get('/api/category?topicId=' + topicId).then(function (response) {
            $scope.labels = response.data.data;
        });
    }

    $scope.getTopicList = function (index) {
        $scope.topicId = index.id;
        var topicId = $scope.topicId;

        $scope.fetchLabelData(topicId);
        $scope.getLinkList(1);
    }

    $scope.getLabelList = function (index) {
        $scope.labelId = index.id;

        $scope.getLinkList(1);
    }

    $scope.getLinkList = function (page) {
        var topicId = $scope.topicId;
        var labelId = $scope.labelId;

        var url = '/api/link?topicId=' + topicId + '&page=' + page;
        // url = 'topicId=';
        // url = 'labelId='
        // url = 'page='

        $http.get(url).then(function (response) {
            var data = response.data;

            if (!topicId) {
                $scope.count = response.data.count;
            }

            $scope.links = data.data;
            $scope.currentPage = data.currentPage;
            $scope.totalPages = data.totalPages;

            setPage(data);
        });
    }

    function setPage(data) {
        var page = {
            count: data.count,
            totalPages: data.totalPages,
            numsPerPage: data.numsPerPage,
            currentPage: data.currentPage
        };

        var pages = [];
        for (var i = 1; i <= page.totalPages; i++) {
            pages.push(i);
        }

        var start = 0, end = 0;
        if (page.currentPage - 5 <= 0) {
            start = 0;
            end = start + 10;
        } else if (page.currentPage + 5 >= page.totalPages) {
            end = page.totalPages;
            start = end - 10;
        } else {
            start = page.currentPage - 6;
            end = page.currentPage + 5;
        }


        $scope.pages = pages.slice(start, end);

        $anchorScroll();
    }

    function init() {
        // 专辑
        $scope.getTopicList($stateParams);
        // 标签
        $scope.fetchLabelData(0);
    }

    init();


    // add link

    $scope.addLink = function () {
        var modalInstance = $modal.open({
            templateUrl: 'link_edit.html',
            controller: 'modalLinkEditCtl',
            resolve: {
                $item: function () {
                    return {
                        title: '',
                        link: '',
                        link_github: '',
                        description: '',
                        image_link: '',
                        sort_order: '',
                        status_is: '',
                        tag: '',
                        topic_id: '',
                        user_id: '',
                    }
                },
                $type: function () {
                    return {
                        type: 'add',
                        title: '添加'
                    }
                }
            }
        });

        modalInstance.result.then(function (item) {
            // 提交数据
            // $http.get('/api/link/add').then(function () {
            //
            // });

            $scope.toaster = {
                type: 'success',
                title: '操作成功',
                text: '链接添加成功'
            };

            toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
        }, function () {
        });
    }



    // user

    $scope.handleEdit = function (id) {
        var userInfo = $localStorage.userInfo;

        if (!angular.isDefined(userInfo)) {
            return;
        }

        for (var i = 0; i < $scope.links.length; i++) {
            if ($scope.links[i].id == id) {
                $scope.items = $scope.links[i];
            }
        }

        var modalInstance = $modal.open({
            templateUrl: 'link_edit.html',
            controller: 'modalLinkEditCtl',
            resolve: {
                $item: function () {
                    return $scope.items;
                },
                $type: function () {
                    return {
                        type: 'edit',
                        title: '修改'
                    }
                }
            }
        });

        modalInstance.result.then(function (item) {
            $scope.toaster = {
                type: 'success',
                title: '操作成功',
                text: '链接添加成功'
            };

            toaster.pop($scope.toaster.type, $scope.toaster.title, $scope.toaster.text);
        }, function () {

        });
    }

});


app.controller('modalLinkEditCtl', ['$scope', '$modalInstance', '$item', '$type', function ($scope, $modalInstance, $item, $type) {

    if ($type.type == 'add') {
        $scope.modalTitle = $type.title;
        $scope.web = $item;
    } else {
        $scope.modalTitle = '修改';
        $scope.web = $item;
    }


    $scope.edit = function () {
        $modalInstance.close($scope.web);
        // $modalInstance.dismiss('cancel');
    }
}]);