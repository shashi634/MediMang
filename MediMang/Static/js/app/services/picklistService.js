angular.module('picklistService', [])
    .service('picklistService', ['$uibModal',
    function ($uibModal) {

        this.addToPicklist = function(displayName, splitIndex) {
            var modalInstance = $uibModal.open({
                templateUrl: TEMPLATES.AddPicklistItem,
                controller: 'PicklistModalController',
                resolve: {
                    displayName: function () {
                        return displayName;
                    },
                    // used for fund allocation only
                    splitIndex: function() {
                        return splitIndex;
                    }
                },
                backdrop: 'static',
                size: 'sm'
            });
            // return the picklist model to the parent controller
            return modalInstance.result;
        }

    }
]);