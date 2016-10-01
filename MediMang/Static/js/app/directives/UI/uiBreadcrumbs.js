// based on https://github.com/michaelbromley/angularUtils/tree/master/src/directives/uiBreadcrumbs
angular.module('app').directive('uiBreadcrumbs', [
    '$interpolate', '$state', '$rootScope', 'application', function ($interpolate, $state, $rootScope, app) {
        return {
            restrict: 'E',
            templateUrl: '/Static/Templates/_uiBreadcrumbs.html',
            scope: {
                displaynameProperty: '@' // could pass the display name from the view instead of the router
            },
            link: function (scope) {
                var updateBreadcrumb = function () {
                    scope.breadcrumbs = [];
                    var docTitles = [];
                    docTitles.push(app === 'CRM' ? "GiftWorks" : app === 'VolunteerAdmin' ? "Volunteer Solutions" : "GiftWorks");

                    var currentState = $state.$current;
                    addToBreadcrumb(currentState);

                    function addToBreadcrumb(state) {
                        // get data from ui-router
                        if (state.data) {
                            scope.breadcrumbs.push({
                                displayName: state.data.displayName, // display name
                                route: state.name // route for ui-sref

                            });
                            docTitles.push(state.data.displayName);
                            if (state.data.parentRoute && state.data.parentRoute != 'home') { // check for a parent state
                                // if there's a parent state, add it to the breadcrumbs
                                var parentState = angular.copy($state.get(state.data.parentRoute));
                                addToBreadcrumb(parentState);
                            }
                        }
                    }

                    scope.breadcrumbs = scope.breadcrumbs.reverse();
                    2 < docTitles.length ? document.title = "{0} | {1} | {2}".formatWith(docTitles[0], docTitles[2], docTitles[1]) : 2 === docTitles.length ? document.title = "{0} | {1}".formatWith(docTitles[0], docTitles[1]) : docTitles.length && (document.title = docTitles[0]);


                }
                $rootScope.$on('$stateChangeSuccess', function () {
                    updateBreadcrumb();

                });
            }
        };
    }
]);
