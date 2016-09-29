/// <reference path="/scripts/_references.js" />
app.config([
    '$stateProvider',
    '$urlRouterProvider',
    'application',
    '$stickyStateProvider',
    function ($stateProvider, $urlRouterProvider, application, $stickyStateProvider) {


        //$stickyStateProvider.enableDebug(true);
        var app = application || '';

        $urlRouterProvider.otherwise(function ($injector, $location) {
            // noop. ignore unmatched routes and hope for the best.
            log('unmatch route: ', $location);


        });

        (function () {

            $stateProvider
                .state('home', {
                    parent: 'abstract',
                    url: '/home',
                    dsr: true,
                    sticky: true,
                    templateUrl: '/static/templates/home.html',
                    data: {
                        displayName: 'Home',
                        parentRoute: null
                    }
                })
                 .state('styleguide', {
                     url: '/styleguide',
                     parent: 'abstract',
                     sticky: true,
                     templateUrl: '/static/templates/styleguide/index.html',
                     controller: 'StyleGuideController',
                     data: {
                         displayName: 'Style Guide',
                         parentRoute: null
                     }
                 })
                .state('reports', {
                    url: '/reports',
                    parent: 'abstract',
                    sticky: true,
                    templateUrl: '/static/templates/reports/index.html',
                    controller: 'ReportsController',
                    data: {
                        displayName: 'Reports',
                        parentRoute: 'home'
                    }
                })
                .state('report', {
                    url: '/report?report',
                    parent: 'abstract',
                    sticky: true,
                    templateUrl: '/static/templates/reports/index.html',
                    controller: 'ReportsController',
                    data: {
                        // todo: resolve report name
                        displayName: 'View Report',
                        parentRoute: 'reports'
                    }
                }) // this was done because you were not able to go from a specific canned report back to the reports page
                .state('smartlist', {
                    url: '/reports/smartlist?smartListGuid=&reportTypeName=',
                    parent: 'abstract',
                    sticky: true,
                    templateUrl: '/static/templates/reports/smartlist.html',
                    controller: 'SmartListController',
                    params: {
                        reportTypes: []
                    },
                    data: {
                        // todo: resolve report name
                        displayName: 'View Smartlist',
                        parentRoute: 'reports'
                    }
                });


            $stateProvider
                .state('volunteering', {
                    url: '/volunteering',
                    parent: 'abstract',
                    sticky: true,
                    templateUrl: '/static/templates/volunteer/index.html',
                    controller: 'VolunteerDashboardController',
                    data: {
                        displayName: 'Volunteering',
                        parentRoute: 'home'
                    }

                })
                .state('agencies', {
                    url: '/agencies',
                    parent: 'abstract',
                    sticky: true,
                    templateUrl: '/static/templates/volunteer/AgencyList.html',
                    controller: 'AgencyListController',
                    data: {
                        displayName: 'Agencies',
                        parentRoute: 'volunteering'
                    }

                })
                .state('agencydetails', {
                    url: '/agencydetails?agencyGuid',
                    parent: 'abstract',
                    sticky: true,
                    templateUrl: '/static/templates/volunteer/AgencyDetails.html',
                    controller: 'AgencyDetailsController',
                    data: {
                        displayName: 'Agency Details',
                        parentRoute: 'agencies'
                    }

                })
                .state('volunteers', {
                    url: '/volunteers',
                    parent: 'abstract',
                    sticky: true,
                    templateUrl: '/static/templates/volunteer/volunteers.html',
                    controller: 'VolunteerListController',
                    data: {
                        displayName: 'Volunteers',
                        parentRoute: 'volunteering'
                    }

                })
                .state('jobs', {
                    url: '/jobs',
                    parent: 'abstract',
                    sticky: true,
                    templateUrl: '/static/templates/volunteer/EngagementList.html',
                    controller: 'VolunteerDashboardController',
                    data: {
                        displayName: 'Engagements',
                        parentRoute: 'volunteering'
                    }

                })
                .state('engagementdetails', {
                    url: '/details?engagementId',
                    parent: 'abstract',
                    sticky: true,
                    templateUrl: '/static/templates/volunteer/Details.html',
                    controller: 'JobDetailsController',
                    data: {
                        displayName: 'Engagement Details',
                        parentRoute: 'jobs'
                    }

                })
                .state('designportal', {
                    url: '/designportal',
                    parent: 'abstract',
                    sticky: true,
                    templateUrl: '/static/templates/volunteer/DesignPortal.html',
                    controller: 'VolunteerPortalDesignerController',
                    data: {
                        displayName: 'Volunteer Portal Designer',
                        parentRoute: 'volunteering'
                    }

                })
                .state('settings', {
                    url: '/settings',
                    parent: 'abstract',
                    sticky: true,
                    templateUrl: '/static/templates/Administration/Settings.html',
                    controller: 'AdminDashboardController',
                    data: {
                        displayName: 'Administration',
                        parentRoute: 'home'
                    }

                })
                .state('audithistory', {
                    url: '/audithistory',
                    parent: 'abstract',
                    sticky: true,
                    templateUrl: '/static/templates/Administration/AuditHistory.html',
                    controller: 'OrganizationAuditHistoryListController',
                    data: {
                        displayName: 'Audit History',
                        parentRoute: 'settings'
                    }
                })
                .state('managecustomfields', {
                    url: '/managecustomfields',
                    parent: 'abstract',
                    sticky: true,
                    templateUrl: '/static/templates/Administration/ManageCustomField.html',
                    controller: 'CustomizeFieldsController',
                    data: {
                        displayName: 'Custom Fields',
                        parentRoute: 'settings'
                    }

                })
                .state('managemessages', {
                    url: '/managemessages',
                    parent: 'abstract',
                    sticky: true,
                    templateUrl: '/static/templates/Administration/ManageMessages.html',
                    controller: 'ManageMessageController',
                    data: {
                        displayName: 'Messages',
                        parentRoute: 'settings'
                    }

                })
                .state('organization', {
                    url: '/organization?orgId=&action=',
                    parent: 'abstract',
                    sticky: true,
                    templateUrl: '/static/templates/Administration/Organization.html',
                    controller: 'OrganizationDetailsController',
                    data: {
                        displayName: 'Organization Details',
                        parentRoute: 'settings'
                    }

                })
                .state('roles', {
                    url: '/roles',
                    parent: 'abstract',
                    sticky: true,
                    templateUrl: '/static/templates/Administration/Roles.html',
                    controller: 'RoleListContoller',
                    data: {
                        displayName: 'Roles',
                        parentRoute: 'settings'
                    }

                })
                .state('users', {
                    url: '/users',
                    parent: 'abstract',
                    sticky: true,
                    templateUrl: '/static/templates/Users/Users.html',
                    controller: 'OrganizationUserListContoller',
                    data: {
                        displayName: 'Users',
                        parentRoute: 'settings'
                    }
                })
                .state('emailtemplates', {
                    url: '/emailtemplates',
                    parent: 'abstract',
                    sticky: true,
                    templateUrl: '/static/templates/ManageEmails/EmailTemplates.html',
                    controller: 'EmailTemplateListController',
                    data: {
                        displayName: 'Email Templates',
                        parentRoute: 'settings'
                    }

                })
                .state('edituserprofile', {
                    url: '/edituserprofile?userGuid=&orgId=',
                    parent: 'abstract',
                    sticky: true,
                    templateUrl: '/static/templates/Users/EditUserProfile.html',
                    controller: 'NPOUserDetailController',
                    data: {
                        displayName: 'Edit User',
                        parentRoute: 'users'
                    }
                })
                .state('editrole', {
                    url: '/editrole?roleId=&orgId=',
                    parent: 'abstract',
                    sticky: true,
                    templateUrl: '/static/templates/Administration/EditRole.html',
                    controller: 'NpoAddRoleController',
                    data: {
                        // todo: pass add or edit role
                        displayName: 'Edit Role',
                        parentRoute: 'roles'
                    }
                })
                .state('editemailtemplate', {
                    url: '/editemailtemplate?templateId=&type=&headerId=&footerId=&applicationName',
                    parent: 'abstract',
                    sticky: true,
                    templateUrl: '/static/templates/manageemails/editemailtemplate.html',
                    controller: 'EditEmailTemplateController',
                    data: {
                        displayName: 'Edit Template',
                        parentRoute: 'emailtemplates'
                    }
                });

            $stateProvider
                .state('events', {
                    url: '/events',
                    parent: 'abstract',
                    sticky: true,
                    templateUrl: '/static/templates/events/events.html',
                    controller: 'EventController',
                    data: {
                        displayName: 'Events',
                        parentRoute: 'home'
                    }
                });
            $stateProvider
                .state('contributions', {
                    url: '/contributions',
                    parent: 'abstract',
                    sticky: true,
                    templateUrl: '/static/templates/contributions/index.html',
                    controller: 'ContributionListController',
                    data: {
                        displayName: 'Contributions',
                        parentRoute: 'home'
                    }
                });

            $stateProvider
                .state('donations', {
                    url: '/donations',
                    parent: 'abstract',

                    templateUrl: '/static/templates/contributions/donations.html',
                    controller: 'DonationsController',
                    data: {
                        displayName: 'Donations',
                        parentRoute: 'contributions'
                    }

                });
            $stateProvider
                .state('pledges', {
                    url: '/pledges',
                    parent: 'abstract',
                    templateUrl: '/static/templates/contributions/pledges.html',
                    controller: 'PledgesController',
                    data: {
                        displayName: 'Pledges',
                        parentRoute: 'contributions'
                    }
                });

            $stateProvider
                .state('editPledge', {
                    url: '/pledge/details/{id}',
                    parent: 'abstract',
                    templateUrl: '/static/templates/modals/pledge/editPledge.html',
                    controller: 'EditPledgeController',
                    data: {
                        displayName: 'Edit Pledge',
                        parentRoute: 'pledges'
                    }

                });
            $stateProvider
                .state('editDonation', {
                    url: '/donation/details/{id}',
                    parent: 'abstract',
                    templateUrl: '/static/templates/contributions/editDonation.html',
                    controller: 'EditDonationController',
                    data: {
                        displayName: 'Edit Donation',
                        parentRoute: 'donations'
                    }

                });
            $stateProvider
                .state('editEvent', {
                    url: '/events/details/{id}',
                    parent: 'abstract',
                    templateUrl: '/static/templates/events/editEvent.html',
                    controller: 'EditEventController',
                    data: {
                        displayName: 'Edit Event',
                        parentRoute: 'events'
                    }
                });

            $stateProvider.state('engagementpreviewmodal', {
                params: { id: null },
                size: 'md',
                backdrop: 'static',
                modal: true,
                template: '<div ui-view></div>',
                onEnter: [
                    '$stateParams',
                    '$uibModal',
                    function ($stateParams, $uibModal) {
                        $uibModal.open({
                            templateUrl: '/Static/Templates/Modals/_EngagementDetail.html',
                            controller: 'EngagementDetailController',
                            resolve: {
                                id: $stateParams.id

                            }
                        });
                    }
                ]
            });

        })();


    }]);


app.run([
    '$rootScope',
    '$log',
    'analytics',
    '$state',
    '$location',
    function ($rootScope, $log, analytics, $state, $location) {

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
        });

        // ReSharper disable UnusedParameter
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (!fromState.name && !window.routeable && !toState.modal) {

                log('refresh and hope it work? ' + $location.path());
                window.location = $location.path();
            }
            analytics.trackPageView();

            $log.debug('changed state from ' + fromState.name + ' to ' + toState.name);
        });

        $rootScope.$on('$stateNotFound', function (event, unfoundState) {
            $log.debug('ERROR - The requested state was not found: ', unfoundState);
        });

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, rejection) {
            $log.debug('ERROR changing state from ' + fromState.name + ' to ' + toState.name, rejection);
        });
    }
]);

app.config([
    '$locationProvider',
    function ($locationProvider) {
        $locationProvider.html5Mode({
            enabled: true,
            requireBase: true,
            rewriteLinks: false
        });
    }
])
    .config(['$urlRouterProvider',
        function ($urlRouterProvider) {

            $urlRouterProvider.rule(function ($injector, $location) {
                var path = $location.path(), normalized = path.toLowerCase();
                if (path !== normalized) {
                    $location.replace().path(normalized);
                }
            });
        }]);
