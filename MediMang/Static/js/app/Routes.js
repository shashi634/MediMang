/// <reference path="/scripts/_references.js" />
app.config([
    '$stateProvider',
    '$urlRouterProvider',
    
    '$stickyStateProvider',
    function ($stateProvider, $urlRouterProvider,  $stickyStateProvider) {


        //$stickyStateProvider.enableDebug(true);
        var app = '';

        $urlRouterProvider.otherwise(function ($injector, $location) {
            // noop. ignore unmatched routes and hope for the best.
            console.log('unmatch route: ', $location);


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
                 .state('myHome', {
                     parent: 'abstract',
                     url: '/myHome',
                     dsr: true,
                     sticky: true,
                     templateUrl: '/static/templates/home.html',
                     data: {
                         displayName: 'myHome',
                         parentRoute: null
                     }
                 })
                .state('myHome2', {
                    parent: 'abstract',
                    url: '/myHome2',
                    dsr: true,
                    sticky: true,
                    templateUrl: '/static/templates/a.html',
                    data: {
                        displayName: 'myHome',
                        parentRoute: null
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

        (function () {
            $stateProvider.state('volunteerpreviewmodal', {
                params: { id: null },
                modal: true,
                onEnter: [
                    '$stateParams',
                    '$uibModal',
                    function ($stateParams, $uibModal) {

                        $uibModal.open({
                            templateUrl: '/Static/Templates/Modals/_VolunteerDetail.html',
                            controller: 'VolunteerDetailController',
                            backdrop: 'static',
                            resolve: {
                                id: $stateParams.id
                            }
                        });

                    }
                ]
            });

        })();



        var registerStatefulModal = function (stateName, controller, template, params, size, isUseModalInvoker) {
            params = params || {};
            var modalSize = size || 'md';
            var callModalInvokerOnClose = isUseModalInvoker || false;
            var modal;
            $stateProvider.state(stateName, {
                //url: '/'+'stateName',// I only use this for debugging
                modal: true,
                params: params,
                onEnter: [
                    '$stateParams',
                    '$uibModal',
                    '$previousState',
                    function ($stateParams, $uibModal, $previousState) {
                        $previousState.memo("modalInvoker");
                        modal = $uibModal.open({
                            animation: true,
                            templateUrl: template,
                            controller: controller,
                            backdrop: 'static',
                            size: modalSize,
                            resolve: {
                                stateParams: function () {
                                    return $stateParams;
                                }
                            }
                        });

                        if (!callModalInvokerOnClose) {
                            modal.result.finally(function() {
                                $previousState.go("modalInvoker");
                            });
                        } 
                    }
                ],
                onExit: function () {
                    if (modal) {
                        modal.close();
                    }
                }
            });
        }

        registerStatefulModal('confirmnavigation', 'ConfirmNavigationController', '/static/templates/modals/_confirmnavigation.html',
        {
            entityType: '',
            hasSaveButton: true,
            desiredState: '',
            desiredStateOptions: {}
        });

        registerStatefulModal(
            'addconstituent',
            'AddConstituentController',
            '/static/templates/_addconstituent.html'
        );
        registerStatefulModal(
            'editmessage',
            'EditMessageController',
            '/static/templates/modals/_editmessage.html',
            {
                messageId: ""
            }
        );
        registerStatefulModal(
            'adduser',
            'CreateOrganizationUserController',
            '/static/templates/modals/_createuser.html'
        );
        registerStatefulModal(
            'adminadduser',
            'AdminUserController',
            '/static/templates/modals/_adminCreateUser.html'
        );
        registerStatefulModal(
            'adminaddrole',
            'AdminUserController',
            '/static/templates/modals/_adminCreateUser.html'
        );
        registerStatefulModal(
            'addvolunteer',
            'AddVolunteerController',
            '/static/templates/_addVolunteer.html'
        );
        registerStatefulModal(
            'smartListConstituentModal',
            'VolunteerDetailController',
            '/Static/Templates/Modals/_VolunteerDetail.html',
            {
                constituentId: ""
            }
        );
        registerStatefulModal(
            'smartListEngagementModal',
            'EngagementDetailController',
            '/Static/Templates/Modals/_EngagementDetail.html',
            {
                engagementId: ""
            }
        );
        registerStatefulModal(
            'adddonation',
            'AddDonationController',
            '/static/templates/Modals/Donation/AddDonation.html',
            {
                id: null,
                pledgeGuid: "",
                pledge: {},
                scheduledPledgePaymentId: "",
                guid:""
            }
        );
        registerStatefulModal(
            'addorganization',
            'AddOrganizationController',
            '/static/templates/Modals/_AddOrganization.html'
        );
        registerStatefulModal(
            'addsubscription',
            'AddSubscriptionController',
            '/static/templates/_AddSubscription.html',
            {
                isVolunteerSolutions: true
            }
        );
        registerStatefulModal(
            'editEngagementAssignmentDetails',
            'RegistrationDetailsController',
            '/static/templates/_registrationDetails.html',
            {
                EngagementEntity: null
            }
        );
        registerStatefulModal(
            'saveascopymodal',
            'SaveAsCopyController',
            '/Static/Templates/Modals/_saveAsCopy.html',
            {
                currentReportName: ""
            }
        );
        registerStatefulModal(
            'createsmartlistmodal',
            'CreateSmartListController',
            '/static/templates/reports/CreateSmartListModal.html',
            {
                reportType: ""
            }
        );
        registerStatefulModal(
            'softcreditmodal',
            'SoftCreditController',
            '/static/templates/modals/SoftCreditModal.html',
            {
                donationGuid: "",
                softCreditGuid: "",
                constituentGuid: ""
            },
            null,
            true
        );

        (function () {
            $stateProvider.state('adddonation.splitpledge', {
                parent: 'adddonation',
                views: {
                    'modal@': {
                        templateUrl: '/static/templates/Modals/Donation/SplitPledge.html',
                        controller: 'SplitPledgeController'
                    }
                }
            }).state('adddonation.selectpledge', {
                parent: 'adddonation',
                views: {
                    'modal@': {
                        templateUrl: '/static/templates/Modals/Donation/SelectPledge.html',
                        controller: "SelectPledgeController"
                    }
                }
            }).state('adddonation.constituent', {
                parent: 'adddonation',
                views: {
                    'modal@': {
                        templateUrl: '/static/templates/Modals/Donation/Constituent.html'
                    }
                }
            }).state('adddonation.constituentdetails', {
                parent: 'adddonation',
                views: {
                    'modal@': {
                        templateUrl: '/static/templates/Constituents/Add/_AddConstituentDetails.html'
                    }
                }
            }).state('adddonation.similarconstituents', {
                parent: 'adddonation',
                views: {
                    'modal@': {
                        templateUrl: '/static/templates/Constituents/Add/_AddConstituentSimilar.html'
                    }
                }
            }).state('adddonation.constituentcustomfields', {
                parent: 'adddonation',
                views: {
                    'modal@': {
                        templateUrl: '/static/templates/Constituents/Add/_AddConstituentCustom.html'
                    }
                }
            }).state('adddonation.donationdetails', {
                parent: 'adddonation',
                views: {
                    'modal@': {
                        templateUrl: '/static/templates/Modals/Donation/Details.html'
                    }
                }
            }).state('adddonation.payment', {
                parent: 'adddonation',
                views: {
                    'modal@': {
                        templateUrl: '/static/templates/Modals/Donation/Payment.html'
                    }
                }
            }).state('adddonation.acknowledgement', {
                parent: 'adddonation',
                views: {
                    'modal@': {
                        templateUrl: '/static/templates/Modals/Donation/Acknowledgement.html'
                    }
                }
            }).state('adddonation.donationcustomfields', {
                parent: 'adddonation',
                views: {
                    'modal@': {
                        templateUrl: '/static/templates/Modals/Donation/Custom.html'
                    }
                }
            }).state('adddonation.complete', {
                parent: 'adddonation',
                views: {
                    'modal@': {
                        templateUrl: '/static/templates/Modals/Donation/Complete.html'
                    }
                }
            }).state('adddonation.confirmation', {
                parent: 'adddonation',
                views: {
                    'modal@': {
                        templateUrl: '/static/templates/Modals/Donation/DonationConfirmation.html'
                    }
                }
            });

        })();

        (function () {
            $stateProvider.state('addpledge', {
                params: {
                    id: null
                },
                onEnter: [
                    '$stateParams',
                    '$uibModal',
                    function ($stateParams, $uibModal) {
                        $uibModal.open({
                            animation: true,
                            templateUrl: '/static/templates/Modals/Pledge/AddPledge.html',
                            controller: 'AddPledgeController',
                            backdrop: 'static',
                            size: 'md',
                            resolve: {
                                constituentId: function () {
                                    var constituentId = $stateParams.id;
                                    return constituentId;
                                }
                            }
                        });
                    }
                ]
            }).state('addpledge.constituent', {
                parent: 'addpledge',
                views: {
                    'modal@': {
                        templateUrl: '/static/templates/Modals/Pledge/Constituent.html'
                    }
                }
            }).state('addpledge.constituentdetails', {
                parent: 'addpledge',
                views: {
                    'modal@': {
                        templateUrl: '/static/templates/Constituents/Add/_AddConstituentDetails.html'
                    }
                }
            }).state('addpledge.similarconstituents', {
                parent: 'addpledge',
                views: {
                    'modal@': {
                        templateUrl: '/static/templates/Constituents/Add/_AddConstituentSimilar.html'
                    }
                }
            }).state('addpledge.constituentcustomfields', {
                parent: 'addpledge',
                views: {
                    'modal@': {
                        templateUrl: '/static/templates/Constituents/Add/_AddConstituentCustom.html'
                    }
                }
            }).state('addpledge.pledgedetails', {
                parent: 'addpledge',
                views: {
                    'modal@': {
                        templateUrl: '/static/templates/Modals/Pledge/Details.html'
                    }
                }
            }).state('addpledge.complete', {
                parent: 'addpledge',
                views: {
                    'modal@': {
                        templateUrl: '/static/templates/Modals/Pledge/Complete.html'
                    }
                }
            }).state('addpledge.pledgecustomfields', {
                parent: 'addpledge',
                views: {
                    'modal@': {
                        templateUrl: '/static/templates/Modals/Pledge/Custom.html'
                    }
                }
            });
        })();

        (function () {

            $stateProvider.state('addevent', {
                onEnter: [
                    '$stateParams',
                    '$uibModal',

                    function ($stateParams, $uibModal) {
                        $uibModal.open({
                            animation: true,
                            templateUrl: '/static/templates/Modals/AddEvent.html',
                            controller: 'AddEventController',
                            backdrop: 'static',
                            size: 'lg',
                            resolve: {}
                        });
                    }
                ]
            });
        })();
        (function () {
            $stateProvider.state('addeventCategory', {
                params: {
                    select: null
                },
                parent: 'addevent',
                onEnter: [
                    '$stateParams',
                    '$uibModal',
                    function ($stateParams, $uibModal) {
                        $uibModal.open({
                            animation: true,
                            templateUrl: TEMPLATES.AddEventCategory,
                            controller: 'AddCategoryController',
                            backdrop: 'static',
                            size: 'sm'
                        }).result.finally(function () {
                            $state.go('addevent');
                        });
                    }
                ]
            });
        })();



        /*
            routes specifically for the internal admin section of the app
        */

        (function () {
            $stateProvider.state('internaladmin', {
                sticky: true,
                url: '/internaladmin',
                dsr: true,
                views: {
                    master: {
                        template: '<div ui-view></div>',
                            controller: function() {
                        }
                    }
                    },
                    data: {
                        displayName: 'Internal Administration',
                        parentRoute: null
                }

            })
            .state('editsubscription', {
                url: '/editsubscription?subscriptionId=&orgId=',
                parent: 'internaladmin',
                sticky: true,
                templateUrl: '/static/templates/InternalAdmin/EditSubscription.html',
                    controller: 'EditSubscriptionController',
                    data: {
                        displayName: 'Edit Subscription',
                        parentRoute: 'internaladmin'
                    }
            })
            .state('organizations', {
                url: '/organizations',
                parent: 'internaladmin',
                sticky: true,
                templateUrl: '/static/templates/InternalAdmin/Organizations.html',
                    controller: 'OrganizationListContoller',
                    data: {
                        displayName: 'Organizations',
                        parentRoute: 'internaladmin'
                    }
            })
            .state('adminusers', {
                url: '/users',
                parent: 'internaladmin',
                sticky: true,
                templateUrl: '/static/templates/InternalAdmin/Users.html',
                    controller: 'InternalUserListContoller',
                    data: {
                        displayName: 'Users',
                        parentRoute: 'internaladmin'
                    }
            })
            .state('edituser', {
                url: '/edituser?userGuid=',
                parent: 'internaladmin',
                sticky: true,
                templateUrl: '/static/templates/InternalAdmin/edituser.html',
                    controller: 'UserDetailsController',
                    data: {
                        displayName: 'Edit User',
                        parentRoute: 'adminusers'
                    }
            })
            .state('errorlog', {
                url: '/errorlog',
                parent: 'internaladmin',
                sticky: true,
                templateUrl: '/static/templates/InternalAdmin/errorlog.html',
                    controller: 'ErrorLogListController',
                    data: {
                        displayName: 'Error Log',
                        parentRoute: 'internaladmin'
                    }

            })
            .state('adminroles', {
                url: '/roles',
                parent: 'internaladmin',
                sticky: true,
                templateUrl: '/static/templates/InternalAdmin/roles.html',
                    controller: 'AdminRoleListContoller',
                    data: {
                        displayName: 'Roles',
                        parentRoute: 'internaladmin'
                    }

            })
            .state('admineditrole', {
                url: '/editrole?RoleId=',
                parent: 'internaladmin',
                sticky: true,
                templateUrl: '/static/templates/InternalAdmin/editrole.html',
                    controller: 'AdminEditRoleController',
                    data: {
                        displayName: 'Edit Role',
                        parentRoute: 'adminroles'
                    }

                })
                .state('adminmanagemessages', {
                    url: '/managemessages',
                    parent: 'internaladmin',
                    sticky: true,
                    templateUrl: '/static/templates/Administration/ManageMessages.html',
                    controller: 'ManageMessageController',
                    data: {
                        displayName: 'Messages',
                        parentRoute: 'internaladmin'
                    }
                })
                .state('adminemailtemplates', {
                    url: '/emailtemplates',
                    parent: 'internaladmin',
                    sticky: true,
                    templateUrl: '/static/templates/ManageEmails/EmailTemplates.html',
                    controller: 'EmailTemplateListController',
                    data: {
                        displayName: 'Email Templates',
                        parentRoute: 'internaladmin'
                    }
                })                
                .state('admineditemailtemplate', {
                    url: '/editemailtemplate?templateId=&type=&headerId=&footerId=&applicationName',
                    parent: 'internaladmin',
                    sticky: true,
                    templateUrl: '/static/templates/manageemails/editemailtemplate.html',
                    controller: 'EditEmailTemplateController',
                    data: {
                        displayName: 'Edit Template',
                        parentRoute: 'adminemailtemplates'
                    }
                })
                .state('adminorganization', {
                    url: '/organization?orgId=&action=',
                    parent: 'internaladmin',
                    sticky: true,
                    templateUrl: '/static/templates/Administration/Organization.html',
                    controller: 'OrganizationDetailsController',
                    data: {
                        displayName: 'Organization Details',
                        parentRoute: 'organizations'
                    }
            });


        })();

        /*
            end of the routes specifically for the internal admin section of the app
        */


        // app specific routes

        var registerCrmOnlyRoutes = function () {
            $stateProvider.state('abstract', {
                sticky: true,
                url: '/mediMang',
                dsr: true,
                views: {
                    master: {
                        template: '<div ui-view></div>',
                        controller: function () {
                            console.log('master');
                        }
                    }
                }
            });
            $stateProvider.state('constituents', {
                url: '/constituents?showSearch=&showAdvancedSearch=',
                parent: 'abstract',
                dsr: true,
                sticky: true,
                templateUrl: '/static/templates/constituents/constituents.html',
                controller: 'ConstituentListController',
                data: {
                    displayName: 'Constituents',
                    parentRoute: 'home'
                }
            });


            $stateProvider.state('constituent', {
                url: '/constituent?constituentId=&tab=',
                parent: 'abstract',
                templateUrl: '/static/templates/constituents/constituent.html',
                controller: 'ConstituentBaseController',
                data: {
                    displayName: 'Edit Constituent',
                    parentRoute: 'constituents'
                }

            });
        };
        var registerVolunteerOnlyRoutes = function () {
            $stateProvider.state('abstract', {
                sticky: true,
                url: '/volunteersolutions',
                dsr: true,
                views: {
                    master: {
                        template: '<div ui-view></div>',
                        controller: function () {
                            console.log('master');
                        }
                    }
                }
            });
            $stateProvider.state('constituent', {
                url: '/volunteer?constituentId=',
                parent: 'abstract',
                templateUrl: '/static/templates/constituents/volunteer.html',
                controller: 'ConstituentBaseController',
                data: {
                    displayName: 'Edit Volunteer',
                    parentRoute: 'volunteers'
                }

            });
        }
        registerCrmOnlyRoutes();
        

    }]);


app.run([
    '$rootScope',
    '$log',
    'analytics',
    '$state',
    '$location',
    function ($rootScope, $log, analytics, $state, $location) {

        $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {


            // ReSharper restore UnusedParameter
            //$log.debug("changing state from " + fromState.name + " to " + toState.name);
            //$log.debug("event", event);
            //$log.debug("toState", toState);
            //$log.debug("toParams", toParams);
            //$log.debug("fromState", fromState);
            //$log.debug("fromParams", fromParams);
        });

        // ReSharper disable UnusedParameter
        $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
            if (!fromState.name && !window.routeable && !toState.modal) {

                console.log('refresh and hope it work? ' + $location.path());
                window.location = $location.path();
            }

            // ReSharper restore UnusedParameter
            // base google analytics tracking
            analytics.trackPageView();

            $log.debug('changed state from ' + fromState.name + ' to ' + toState.name);
            //$log.debug("event", event);
            //$log.debug("toState", toState);
            //$log.debug("toParams", toParams);
            //$log.debug("fromState", fromState);
            //$log.debug("fromParams", fromParams);
        });

        $rootScope.$on('$stateNotFound', function (event, unfoundState) {
            $log.debug('ERROR - The requested state was not found: ', unfoundState);
        });

        $rootScope.$on('$stateChangeError', function (event, toState, toParams, fromState, fromParams, rejection) {
            $log.debug('ERROR changing state from ' + fromState.name + ' to ' + toState.name, rejection);
            //$log.debug("event", event);
            //$log.debug("toState", toState);
            //$log.debug("toParams", toParams);
            //$log.debug("fromState", fromState);
            //$log.debug("fromParams", fromParams);
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
