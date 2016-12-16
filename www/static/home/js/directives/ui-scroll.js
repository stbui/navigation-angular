angular.module('app')
    .directive('uiScroll', ['$location', '$anchorScroll', function ($location, $anchorScroll) {
        return {
            restrict: 'AC',
            link: function (scope, el, attr) {
                el.on('click', function (e) {
                    // console.log($location)
                    // console.log(attr)
                    $location.hash(attr.uiScroll);
                    $anchorScroll();
                });
            }
        };
    }]);