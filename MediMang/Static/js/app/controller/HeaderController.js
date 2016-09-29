angular.module("app").controller("HeaderController", [
    "$rootScope", "$scope", "blockUI", 
    function ($rootScope, $scope,  blockUI) {
        $scope.fName = '', $scope.lName = '';
        $scope.messages = [];
        var OrgId = 1;  
        var currentUser = null;
        $scope.isImpersonating = false;
        if (currentUser) {
            if (currentUser.IsLoggedIn) {
                $scope.isLoggedIn = true;
                $scope.fName = (currentUser.FirstName != null) ? (currentUser.FirstName) : " ";
                $scope.lName = (currentUser.LastName != null) ? (currentUser.LastName) : " ";
                $scope.userName = $scope.fName + " " + $scope.lName;
                if (currentUser.ImpersonateGuid != "") {
                    $scope.isImpersonating = true;
                }
            }
        } else {
            $scope.userName = "";
            $scope.isLoggedIn = false;
        }

       

        $scope.showSearch = function () {
            $rootScope.$broadcast('ShowHeaderSearch');
        }

        NPOMessageRepository.getAllActiveMessages(OrgId,
            function (data) {
                $scope.messages = data;
                return;
            },
           function (data, status, headers, config) {

           },
         function () {
         });
        $scope.truncate = function (s, l) {
            if (s.length <= l) {
                return s;
            } else {
                var ts = "";
                var subs = s.split('&');
                if (subs[0].length > l) {
                    return subs[0].substring(0, l) + "&hellip;";
                } else {
                    ts = ts + subs[0];
                }
                for (var i = 1; i < subs.length; i++) {
                    var end = subs[i].indexOf(';');
                    l += end + 1;
                    ts = ts + '&' + subs[i];
                    if (ts.length >= l) {
                        return ts.substring(0, l) + "&hellip;";
                    }
                }
                return ts;
            }
        };
        $scope.OpenMessage = function (m) {
            $scope.Message = m;
            var mdl = $uibModal.open({
                animation: true,
                templateUrl: 'message.html',
                size: 'lg',
                backdrop: 'static',
                controller: 'messageModal',
                resolve: {
                    Message: function () {
                        return $scope.Message;
                    }
                }
            });

        }
    }
]);