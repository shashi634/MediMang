angular.module("app").controller("NavigationController", [
    "$rootScope",
    "$scope",
    "$uibModal",
    "authorizeService",
    "menu",
    '$location', '$anchorScroll',
function ($rootScope, $scope, $uibModal, authorizeService, menu, $location, $anchorScroll) {
    $anchorScroll.yOffset = 80;

    $scope.scrollTo = function (id) {
        $location.hash(id);
        $anchorScroll();
    }

    // initialize for authorization
    $scope.allowModule = authorizeService.allowModule;
    $scope.isAuthorized = authorizeService.isAuthorized;
    $scope.userCrmRoles = UserCrmRoles;
    $scope.userCrmAdminRoles = UserCrmAdminRoles;
    $scope.IsOrgOrInternalAdmin = $rootScope.CurrentUser.IsOrgOrInternalAdmin;
    $scope.IsVolunteerCenter = false;
    // to show/hide the side Portal design options
    $scope.isAuthorizedMyVolunteeringSetup = $scope.isAuthorized($scope.userCrmRoles.MyVolunteeringSetup, $scope.userCrmAdminRoles.None);
    $scope.ActiveNavItem = "";
    var currentUser = $rootScope.CurrentUser;

    if (currentUser) {
        if (currentUser.ApplicationType === "CRMAdmin") {
            $scope.isInternalUser = true;
        } else {
            $scope.isInternalUser = false;
        }

        if (currentUser.ApplicationType === "CRM" || currentUser.ApplicationType == "VolunteerAdmin") {
            $scope.isOrganizationUser = true;
            $scope.OrganizationId = currentUser.OrganizationGuid;
            $scope.IsVolunteerCenter = $scope.allowModule(OrgModules.VolunteerCenter);

        } else {
            $scope.isOrganizationUser = false;
            $scope.OrganizationId = "missing";
        }

    } else {
        $scope.isInternalUser = false;
        $scope.isOrganizationUser = false;
    }

    $scope.$on(EVENTS.SetActiveNavItem, function (event, tab) {
        $scope.ActiveNavItem = tab;
    });

    $rootScope.menu = menu;
    log("menu?", $rootScope.menu);

}
]);