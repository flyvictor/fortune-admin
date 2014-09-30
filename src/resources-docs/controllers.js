(function(angular){
    angular.module('fortuneAdmin.Docs.Controllers', [])
        .controller('DocsCtrl', ['$scope', '$location', '$anchorScroll', 'resources', DocsController]);

    function DocsController($scope, $location, $anchorScroll, resources){
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

