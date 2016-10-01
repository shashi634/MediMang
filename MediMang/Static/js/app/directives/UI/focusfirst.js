/// <reference path="/scripts/_references.js" />
(function (window, angular, undefined) {

    "use strict";
    angular.module("accessibleform", []);
    angular.module("accessibleform").directive("accessibleform", accessibleform);

    function accessibleform($parse) {

        return {
            restrict: 'A',
            link: function (scope, elem) {

                // set up event handler on the form element
                elem.on('submit', function () {

                    // find the first invalid element
                    var firstInvalid = elem[0].querySelector('input.ng-invalid, select.ng-invalid');

                    // if we find one, set focus
                    if (firstInvalid) {
                        firstInvalid.focus();
                        log('focus', firstInvalid);
                    }
                });
            }
        };
    }
    accessibleform.$inject = ["$parse"];
})(window, window.angular);