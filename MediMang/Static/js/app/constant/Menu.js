(function () {

    window.angular.module("app").service("menu", [
        "$rootScope",
        
        function ($rootScope) {
            var menu = {};
                menu = {
                home:
                {
                    displayName: "Home",
                    icon: "fa-home",

                    show: true,
                    uiSref: "home"
                },
                constituents: {
                    displayName: "Constituents",
                    icon: "fa-users",
                    uiSref: "#",
                    show: true,
                    subMenu: {
                        add: {
                            displayName: "Add a Constituent",
                            uiSref: "addconstituent",
                            show: true
                        },
                        find: {
                            displayName: "Find A Constituent",
                            uiSref: "#",
                            show: true
                        },
                        advanced: {
                            displayName: "Advanced Search",
                            uiSref: "#",
                            show: true
                        }
                    }
                },
                events: {
                    displayName: "Events",
                    icon: "fa-calendar-minus-o",
                    //href: "/app/events",
                    uiSref: "#",
                    show: true,
                    subMenu: {
                        add: {
                            displayName: "Add an Event",
                            uiSref: "addevent",
                            show: true //todo permissions check
                        },
                        Events: {
                            displayName: "Events",
                            uiSref: "/events",
                            show: true
                        }

                    }
                },
                contributions: {
                    displayName: "Contributions",
                    icon: "fa-gift",
                    uiSref: "contributions",
                    show: true,
                    subMenu: {
                        Donations: {
                            displayName: "Donations",
                            uiSref: "#",
                            show: true
                        },
                        Pledges: {
                            displayName: "Pledges",
                            uiSref: "#",
                            show: true
                        }

                    }
                },
                volunteering: {
                    displayName: "Volunteering",
                    icon: "fa-bullhorn",
                    uiSref: "#",
                    show: true,
                    subMenu: {
                        agencies: {
                            displayName: "Agencies",
                            uiSref: "#",
                            show: true
                        },
                        volunteers: {
                            displayName: "Volunteers",
                            uiSref: "volunteers",
                            show: true

                        },
                        engagements: {
                            displayName: "Engagements",
                            uiSref: "jobs",
                            show: true
                        },
                        portal: {
                            displayName: "Volunteer portal",
                            uiSref: "designportal",
                            show: true
                        }
                    }
                },
                reports: {
                    displayName: "Reports",
                    icon: "fa-folder-open-o",
                    uiSref: "reports",
                    show: true // $scope.isAuthorized($scope.userCrmRoles.ViewReports, $scope.userCrmAdminRoles.None)

                },
                administration: {
                    displayName: "Administration",
                    icon: "fa-cogs",
                    uiSref: "settings",
                    show: true,
                    subMenu: {
                        auditHistory: {
                            displayName: "Audit History",
                            uiSref: "audithistory",
                            show: true
                        },
                        customFields: {
                            displayName: "Custom Fields",
                            uiSref: "managecustomfields",
                            show: true
                        },
                        messages: {
                            displayName: "Messages",
                            uiSref: "managemessages",
                            show: true
                        },
                        organizationDetails: {
                            displayName: "Organization Details",
                            uiSref: "organization",
                            show: true
                        },
                        roles: {
                            displayName: "Roles",
                            uiSref: "roles",
                            show: true
                        },
                        users: {
                            displayName: "Users",
                            uiSref: "users",
                            show: true
                        },
                        emailTemplates: {
                            displayName: "Email Templates",
                            uiSref: "emailtemplates",
                            show: true
                        }
                    }

                }
            }
           
            return menu;
        }
    ]);
})();