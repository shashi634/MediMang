angular.module('app').controller('LayoutController', [
         '$scope',
         '$window',
         
         "blockUI",
         '$state',
    function ($scope, $window,  blockUI, $state) {
        // get message message
        $scope.goToOtherState = function () {
            console.log("hi this is ");
            $state.go('myHome', {});
        };
    }
]);