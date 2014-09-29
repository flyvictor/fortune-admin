(function(angular){
    angular.module('fortuneAdmin.Docs.Controllers', [])
        .controller('DocsCtrl', ['$scope', '$http', '$location', '$anchorScroll', '$window', DocsController]);

    function DocsController($scope, $http, $location, $anchorScroll){
        $scope.resources = [];
        $scope.render = false;
        /*$scope.languages = ['curl', 'ruby', 'python', 'php', 'java', 'node', 'go'];*/

        // get resources
        $http.get(CONFIG.fortuneAdmin.baseEndpoint + '/resources').success(function(data){
            $scope.resources = data.resources;
            $scope.selected = $scope.resources.length ? $scope.resources[0].name : undefined;
            $scope.render = true;
        });

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

