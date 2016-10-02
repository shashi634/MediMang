angular.module('app').controller('LayoutController', [
         '$scope',
         '$window',
         'menu',
         "blockUI",
         '$state',
    function ($scope, $window,menu, blockUI, $state) {
        var layoutBlock = blockUI.instances.get('main');
        $scope.menu = menu;
        console.log("menu", menu);
        // get message message
        $scope.goToOtherState = function () {
            console.log("hi this is ");
            $state.go('myHome', {});
        };
    }
]);