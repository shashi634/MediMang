angular.module('app').controller('BodyController', [
         '$scope',
         '$window',
         'application',
function ($scope, $window, application) {
    $scope.BodyClass = localStorage.BodyClass || 'left_nav_collapse';
    $scope.application = application;

    $scope.name = "Frontstream CRM";
    var w = angular.element($window);
    w.bind('resize', function () {
        $(window).width() > 750 ? 'show_nav' : $scope.BodyClass = 'left_nav_collapse';
    });
    $scope.$on('ToggleMenuCollapse', function (event) {
        // log($scope.BodyClass);
        if ($scope.BodyClass === 'left_nav_collapse') {
            $scope.BodyClass = 'show_nav';
            localStorage.BodyClass = 'show_nav';
        }
        else {
            $scope.BodyClass = "left_nav_collapse";
            localStorage.BodyClass = "left_nav_collapse";
        }
    });
}
]);