(function(angular){
    angular.module('docs.Controllers', ['docs.Config'])
        .controller('DocsCtrl', ['$scope', '$location', '$anchorScroll', 'resources', 'docsConfigConstant', DocsController]);

    function DocsController($scope, $location, $anchorScroll, resources, config){
        $scope.resources = resources;
        $scope.selected = $scope.resources.length ? $scope.resources[0].name : undefined;

        // select api item
        $scope.select = function (item) {
            $scope.selected = item;
            var oldLocation = $location.hash();
            $location.hash(item);
            $anchorScroll();
            $location.hash(oldLocation);
        };

        // add class to selected api item
        $scope.itemClass = function (item) {
            return $scope.selected === item ? 'active' : undefined;
        };
    }
})(angular);

