angular.module('app').constant('GridDefinitions', {
    timeslotGridColDefs: [
        {
            name: 'Time slot',
            field: 'RowCount',
            enableHiding: false,
            enableFiltering: false
        },
        {
            name: 'Start Date',
            field: 'StartDate',
            enableHiding: false,
            enableFiltering: false,
            cellTemplate: "<div>{{row.entity.StartDate === null || row.entity.StartDate === '' ?'open-ended' : row.entity.StartDate }}</div>"
        },
        {
            name: 'End Date',
            field: 'EndDate',
            enableHiding: false,
            enableFiltering: false,
            cellTemplate: "<div>{{row.entity.EndDate === null || row.entity.EndDate === '' ? 'open-ended' : row.entity.EndDate }}</div>"
        },
        {
            name: 'Description',
            field: 'Description',
            enableHiding: false,
            enableFiltering: false,
            cellTemplate: "<div>{{row.entity.Hours}} <span ng-show='row.entity.Hours > 0'>hours per</span>  {{row.entity.UnitOfTimeName}} {{row.entity.Days}} </div>"
        },
        {
            name: 'Volunteers Needed',
            field: 'NumberVolunteersNeeded',
            enableHiding: true,
            enableFiltering: false,
            cellTemplate: "<div><span ng-show='!row.entity.UnlimitedVolunteers'>{{row.entity.NumberVolunteersNeeded}}</span><span ng-show='row.entity.UnlimitedVolunteers'>unlimited</span></div>"
        },
        {
            name: ' ',
            field: 'Remove',
            enableFiltering: false,
            enableHiding: false,
            cellTemplate: '/Static/Templates/GridActions/EngagementTimeslot.html'


        }
    ],
    AssignmentHistory: [
        {
            name: 'Date',
            field: 'TimeStamp',
            enableHiding: false,
            enableFiltering: false,
            cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.TimeStamp | MvcDateFormat:"mmm d, yyyy"}}</div>'
        },
        {
            name: 'Action',
            field: 'JobAssignAction',
            enableHiding: false,
            enableFiltering: false
        },
        {
            name: 'Time Slot',
            field: 'TimeSlotStartDate',
            enableHiding: false,
            enableFiltering: false,
            cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.TimeSlotStartDate | MvcDateFormat:"mmm d, yyyy"}} - {{row.entity.TimeSlotEndDate ?  (row.entity.TimeSlotEndDate | MvcDateFormat:"mmm d, yyyy") : "Open Ended"}}</div>'
        },
        {
            name: 'User',
            field: 'ModifiedBy',
            enableHiding: false,
            enableFiltering: false
        },
        {
            name: 'Source',
            field: 'Source',
            enableHiding: false,
            enableFiltering: false
        },
        {
            name: 'Volunteer  Start Date',
            field: 'VolunteeringStartDate',
            enableHiding: false,
            enableFiltering: false,
            cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.VolunteeringStartDate | MvcDateFormat:"mmm d, yyyy"}}</div>'
        },
        {
            name: 'Notes',
            field: 'AssignmentNote',
            enableHiding: false,
            enableFiltering: false,
            cellTemplate: '/Static/Templates/GridActions/Notes.html'
        }
    ],

    EngagementAssignmentHistory: [
        {
            // timestamp
            name: 'Date',
            field: 'Date',
            enableHiding: false,
            enableFiltering: false,
            cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.TimeSlotStartDate | MvcDateFormat:"mmm d, yyyy"}}</div>'
        }, {
            name: 'Volunteer Name',
            field: 'VolunteerName',
            enableHiding: false,
            enableFiltering: true,
            filter: {
                term: "",
                placeholder: ""
            }
        }, {
            name: 'Action',
            field: 'Action',
            enableHiding: false,
            enableFiltering: true

        }, {
            name: 'Time Slot ',
            field: 'TimeSlot',
            enableHiding: false,
            enableFiltering: false

        },
        {
            name: 'User',
            field: 'User',
            enableHiding: false,
            enableFiltering: false
        }, {
            name: 'Notes',
            field: 'Notes',
            enableHiding: false,
            enableFiltering: false,
            cellTemplate: '/Static/Templates/GridActions/Notes.html'
        }
    ],
    LoggedHours: [
        {
            name: 'Engagement',
            field: 'EngagementName',


            enableHiding: false,
            enableFiltering: false
        }, {
            name: 'Date',
            field: 'StrWorkedDate',

            enableHiding: false,
            enableFiltering: false
        }, {
            name: 'Hours',
            field: 'HoursWorked',

            enableHiding: false,
            enableFiltering: false
        }, {
            name: 'Status',
            field: 'Status',
            enableHiding: false,
            enableFiltering: false
        }, {
            name: 'Notes',
            field: 'Notes',
            enableHiding: false,
            enableFiltering: false,
            cellTemplate: '/Static/Templates/GridActions/Notes.html'
        }, {
            name: ' ',
            field: 'Action',
            enableFiltering: false,
            enableHiding: false,


            cellTemplate: '/Static/Templates/GridActions/EngagementHours.html'
        }
    ],
    Events:
    [
        {
            name: 'Event Name',
            field: 'EventName',
            enableHiding: false,
            suppressRemoveSort: false,
            enableFiltering: true,
            filter: {
                term: "",
                placeholder: ""
            },
            cellClass: "truncate-text"
        },
        {
            name: 'Status',
            field: 'EventStatus',
            enableHiding: false,
            suppressRemoveSort: false,
            filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-dropdown></div></div>',
            filter: {
                term: 0,
                options: [{ id: 0, value: 'Select One' }, { id: 1, value: 'Active' }, { id: 2, value: 'Inactive' }]
            },
            enableFiltering: true,
            cellClass: "truncate-text"
        },
        {
            name: 'Start Date',
            field: 'StartDateTime',
            cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.StartDateTime | MvcDateFormat:"mmm dd, yyyy"}}</div>',
            enableHiding: false,
            suppressRemoveSort: false,
            enableFiltering: false,
            cellClass: "truncate-text"
        },
        {
            name: 'Category',
            field: 'Category',
            enableHiding: false,
            suppressRemoveSort: false,
            enableFiltering: true,
            filter: {
                term: "",
                placeholder: ""
            },
            cellClass: "truncate-text"
        },
        {
            name: 'Description',
            field: 'Description',
            enableHiding: false,
            suppressRemoveSort: false,
            enableSorting: true,
            enableFiltering: true,
            cellFilter: 'words: 15',
            filter: {
                term: "",
                placeholder: ""
            },
            cellClass: "truncate-text"
        },
        {
            name: 'Location',
            field: 'Location',
            enableHiding: false,
            suppressRemoveSort: false,
            enableFiltering: true,
            filter: {
                term: "",
                placeholder: ""
            },
            cellClass: "truncate-text"

        },
        {
            name: ' ',
            field: "EventGuid",
            enableFiltering: false,
            enableHiding: false,
            enableSorting: false,
            cellTemplate: '<div class="ui-grid-cell-contents text-right"><a class="btn btn-default" ui-sref="editEvent({id:row.entity.EventGuid})">View</a></div>',
            minWidth: 44
        }
    ],
    VolunteerJobList:
    [
        {
            name: 'Name',
            field: 'JobName',
            cellTemplate: "/Static/templates/celltemplates/engagementModalLink.html",
        }, {
            name: 'Event',
            field: 'EventName',
            enableHiding: false,
            suppressRemoveSort: false,
            enableFiltering: true
        }, {
            name: 'Created',
            field: 'DateCreated',
            cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.DateCreated | MvcDateFormat:"mmm dd, yyyy"}}</div>',
            enableHiding: false,
            suppressRemoveSort: false,
            enableFiltering: true
        }, {
            name: 'Status',
            field: 'StatusName',
            enableHiding: false,
            suppressRemoveSort: false,
            enableFiltering: true
        },
        {
            name: 'Posted By',
            field: 'PostedByName',
            enableHiding: false,
            suppressRemoveSort: false,
            enableFiltering: true
        },
        {
            name: 'Screening Status',
            field: 'ScreenStatusExternalJobs',
            enableHiding: false,
            suppressRemoveSort: false,
            enableFiltering: true,
            cellTemplate: "/Static/templates/celltemplates/ScreeningStatus.html"
        },
        {
            name: 'Verified By',
            field: 'verifiedBy()',
            enableHiding: false,
            suppressRemoveSort: false,
            enableFiltering: true
        },
        {
            name: ' ',
            field: "EngagementId",
            enableFiltering: false,
            enableHiding: false,
            enableSorting: false,
            cellTemplate: '/Static/Templates/GridActions/JobList.html'
        }
    ],
    AgencyEngagement: [
        {
            name: 'Name',
            field: 'JobName'
        },
        {
            name: 'Event',
            field: 'EventName'
        },
        {
            name: 'Status',
            field: 'StatusName',
            filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-dropdown></div></div>',
            filter: {
                term: 0,
                options: [{ id: 0, value: 'Select One' }, { id: 1, value: 'Active' }, { id: 2, value: 'Inactive' }]
            }
        },
        {
            name: 'Start Date',
            field: 'StartDate',
            cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.StartDate | MvcDateFormat:"mmm dd, yyyy"}}</div>'
        },
        {
            name: 'End Date',
            field: 'EndDate',
            cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.EndDate | MvcDateFormat:"mmm dd, yyyy"}}</div>'
        },
        {
            name: 'Screening Status',
            field: 'ScreeningStatus',
            cellTemplate: "/Static/templates/celltemplates/ScreeningStatus.html"
        },
        {
            name: 'Verified By',
            field: 'verifiedBy()'
        },
        {
            name: ' ',
            field: "EngagementId",
            cellTemplate: '/Static/Templates/GridActions/AgencyEngagements.html'
        }
    ],
    EngagementList: [
        {
            name: 'Name',
            field: 'JobName',
            enableHiding: false,
            suppressRemoveSort: false,
            enableFiltering: true,
            cellTemplate: "/Static/templates/celltemplates/engagementModalLink.html",
            filter: {
                term: "",
                placeholder: ""
            },
            cellClass: 'truncate-text'
        },
        {
            name: 'Event',
            field: 'EventName',
            enableHiding: false,
            suppressRemoveSort: false,
            enableFiltering: true,
            filter: {
                term: "",
                placeholder: ""
            },
            cellClass: 'truncate-text'
        },
        {
            name: 'Status',
            field: 'StatusName',
            enableHiding: false,
            suppressRemoveSort: false,
            filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-dropdown></div></div>',
            filter: {
                term: 0,
                options: [{ id: 0, value: 'Select One' }, { id: 1, value: 'Active' }, { id: 2, value: 'Inactive' }] // custom attribute that goes with custom directive above 
            },
            enableFiltering: true,
            cellClass: 'truncate-text'
        },
        {
            name: 'Start Date',
            field: 'StartDate',
            cellTemplate: "<div class='ui-grid-cell-contents'>{{ (row.entity.StartDate === null || row.entity.StartDate === '') ? 'open-ended' : (row.entity.StartDate | MvcDateFormat:'mmm dd, yyyy')}}</div>",
            enableHiding: false,
            suppressRemoveSort: false,
            enableFiltering: true,
            filterHeaderTemplate: '/Static/templates/celltemplates/datefilter.html',
            type: 2,
            cellClass: 'truncate-text'
        },
        {
            name: 'End Date',
            field: 'EndDate',
            cellTemplate: "<div class='ui-grid-cell-contents'>{{ (row.entity.EndDate === null || row.entity.EndDate === '') ? 'open-ended' : (row.entity.EndDate | MvcDateFormat:'mmm dd, yyyy')}}</div>",
            enableHiding: false,
            suppressRemoveSort: false,
            enableFiltering: true,
            filterHeaderTemplate: '/Static/templates/celltemplates/datefilter.html',
            type: 2,
            cellClass: 'truncate-text'
        },
        {
            name: 'Posted By', //todo only show this if we have agencies/ are a volunteer center
            field: 'PostedByName',
            enableHiding: false,
            suppressRemoveSort: false,
            enableFiltering: true,
            filter: {
                term: "",
                placeholder: ""
            },
            cellClass: 'truncate-text'
        },
        {
            name: 'Screening',
            field: 'ScreenStatusExternalJobs',
            enableHiding: false,
            suppressRemoveSort: false,
            enableFiltering: false,
            cellTemplate: "/Static/templates/celltemplates/ScreeningStatus.html",
            cellClass: 'truncate-text'
        },
        {
            //todo only show this if we have agencies/ are a volunteer center
            name: 'Verified By',
            field: 'VerifiedByUser',
            enableHiding: false,
            suppressRemoveSort: false,
            enableFiltering: false,
            cellClass: 'truncate-text'
        },
        {
            name: ' ',
            field: "Id",
            enableFiltering: false,
            enableHiding: false,
            minWidth: 44,
            enableSorting: false,
            cellTemplate: '/Static/Templates/GridActions/JobList.html'
        }
    ],

    Pledges:
    [
        {
            name: 'First Name',
            field: 'ConstituentFirstName',
            enableHiding: false,
            suppressRemoveSort: false,
            enableFiltering: true,
            filter: {
                term: "",
                placeholder: ""
            },
            cellClass: 'truncate-text'
        },
        {
            name: 'Last Name',
            field: 'ConstituentLastName',
            enableHiding: false,
            suppressRemoveSort: false,
            enableFiltering: true,
            filter: {
                term: "",
                placeholder: ""
            },
            cellClass: 'truncate-text'
        },
        {
            name: 'Date',
            field: 'PledgeDate',
            cellTemplate: '<div class="ui-grid-cell-contents"><span ng-if="row.entity.IsOverDue"><i class="fa fa-exclamation-triangle fs-text-warning"></i> </span>{{row.entity.PledgeDate | MvcDateFormat:"mmm dd, yyyy"}}</div>',
            headerCellTemplate: '/Static/templates/celltemplates/headerTextRight.html',
            enableHiding: false,
            suppressRemoveSort: false,
            enableFiltering: false,
            cellClass: 'text-right'
        },
        {
            name: 'Pledged Amount',
            field: 'TotalAmount',
            enableHiding: false,
            suppressRemoveSort: false,
            cellClass: 'text-right',
            width: 200,
            enableFiltering: true,
            filterHeaderTemplate: '/Static/templates/celltemplates/amountfilter.html',
            headerCellTemplate: '/Static/templates/celltemplates/headerTextRight.html',
            type: 'object',
            cellFilter: "currency"
        },
        {
            name: 'Received Amount',
            field: 'AmountReceived',
            enableHiding: false,
            suppressRemoveSort: false,
            cellClass: 'text-right',
            enableFiltering: true,
            filterHeaderTemplate: '/Static/templates/celltemplates/amountfilter.html',
            headerCellTemplate: '/Static/templates/celltemplates/headerTextRight.html',
            type: 'object',
            cellFilter: "currency"
        },
        {
            name: 'Outstanding Amount',
            field: 'AmountOutstanding',
            enableHiding: false,
            suppressRemoveSort: false,
            cellClass: 'text-right',
            enableFiltering: true,
            filterHeaderTemplate: '/Static/templates/celltemplates/amountfilter.html',
            headerCellTemplate: '/Static/templates/celltemplates/headerTextRight.html',
            type: 'object',
            cellFilter: "currency"
        },
        {
            name: null,
            field: "PledgeGuid",
            enableFiltering: false,
            enableHiding: false,
            enableSorting: false,
            cellClass: 'text-right',
            headerCellTemplate: '/Static/templates/celltemplates/headerTextRight.html',
            cellTemplate: '<div class="ui-grid-cell-contents ng-scope"><a class="btn btn-default" ' +
                ' ui-sref="editPledge({id:row.entity.PledgeGuid})">View</a></div>'
        }
    ],
    UnFulfilledPledges:
    [
        {
            name: '',
            field: 'IsOverDue',
            enableFiltering: false,
            enableHiding: false,
            enableSorting: false,
            cellTemplate: "/Static/templates/celltemplates/PledgeOverdue.html",
            width: 40,
            minWidth: 40,
            maxWidth: 40
        },
        {
            name: 'Date',
            field: 'PledgeDate',
            cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.PledgeDate | MvcDateFormat:"mmm dd, yyyy"}}</div>',
            enableHiding: false,
            suppressRemoveSort: false,
            enableFiltering: false,
            width: 110
        },
        {
            name: 'Pledged Amount',
            field: 'TotalAmount',
            enableHiding: false,
            suppressRemoveSort: false,
            enableFiltering: false,
            filterHeaderTemplate: '/Static/templates/celltemplates/amountfilter.html',
            type: 'object',
            cellFilter: "currency"
        },
        {
            name: 'Outstanding Amount',
            field: 'AmountOutstanding',
            enableHiding: false,
            suppressRemoveSort: false,
            enableFiltering: false,
            filterHeaderTemplate: '/Static/templates/celltemplates/amountfilter.html',
            type: 'object',
            cellFilter: "currency"
        }
    ],
    Donations: function (fundList) {
        return [
            {
                name: 'First Name',
                field: 'ConstituentFirstName',
                enableHiding: false,
                suppressRemoveSort: false,
                enableFiltering: true,
                filter: {
                    term: "",
                    placeholder: ""
                },
                cellClass: 'truncate-text'
            },
            {
                name: 'Last Name',
                field: 'ConstituentLastName',
                enableHiding: false,
                suppressRemoveSort: false,
                enableFiltering: true,
                filter: {
                    term: "",
                    placeholder: ""
                },
                cellClass: 'truncate-text'
            },
            {
                name: 'Date',
                field: 'DonationDate',
                cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.DonationDate | MvcDateFormat:"mmm dd, yyyy"}}</div>',
                enableHiding: false,
                suppressRemoveSort: false,
                enableFiltering: true,
                filterHeaderTemplate: '/Static/templates/celltemplates/datefilter.html',
                type: 2,
                cellClass: 'truncate-text'
            },
            {
                name: 'Fund',
                field: 'FundName',
                enableHiding: false,
                suppressRemoveSort: false,
                enableFiltering: true,
                filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div donation-custom-dropdown></div></div>',
                filter: {
                    options: fundList
                },
                cellClass: 'truncate-text'
            },
            {
                name: 'Donation Type',
                field: 'ContributionTypeName',
                enableHiding: false,
                suppressRemoveSort: false,
                enableFiltering: true,
                width: 200,
                filterHeaderTemplate: '<div class="ui-grid-filter-container" ng-repeat="colFilter in col.filters"><div my-custom-dropdown></div></div>',
                filter: {
                    term: 0,
                    options: [{ id: 0, value: 'Select Donation Type' }, { id: 1, value: 'Gift' }, { id: 2, value: 'Pledge Payment' }]
                }
            },
            {
                name: 'Amount',
                field: 'TotalAmount',
                enableHiding: false,
                suppressRemoveSort: false,
                enableFiltering: true,
                cellClass: 'text-right',
                headerCellTemplate: '/Static/templates/celltemplates/headerTextRight.html',
                filterHeaderTemplate: '/Static/templates/celltemplates/amountfilter.html',
                type: 2,
                cellFilter: "currency"
            },
            {
                name: ' ',
                field: 'ContributionGuid',
                enableFiltering: false,
                enableHiding: false,
                enableSorting: false,
                cellClass: 'text-right',
                minWidth: 44,
                cellTemplate: '<div class="ui-grid-cell-contents ng-scope"><a class="btn btn-default" ' +
                    ' ui-sref="editDonation({id:row.entity.ContributionGuid})">View</a></div>'
            }
        ];
    },
    ContributionsPledgeGrid:
    [
        {
            name: 'Date',
            field: 'PledgeDate',
            cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.PledgeDate | MvcDateFormat:"mmm dd, yyyy"}}</div>',
            enableHiding: false,
            width: 180,
            suppressRemoveSort: false,
            enableFiltering: false
        },
        {
            name: 'Pledged Amount',
            field: 'TotalAmount',
            enableHiding: false,
            suppressRemoveSort: false,
            cellClass: 'text-right',
            width: 200,
            enableFiltering: true,
            filterHeaderTemplate: '/Static/templates/celltemplates/amountfilter.html',
            headerCellTemplate: '/Static/templates/celltemplates/headerTextRight.html',
            type: 2,
            cellFilter: "currency"
        },
        {
            name: null,
            width: 70,
            field: "PledgeGuid",
            enableFiltering: false,
            enableColumnMenu: false,
            enableHiding: false,
            enableSorting: false,
            cellClass: 'text-right',
            cellTemplate: '<div class="ui-grid-cell-contents ng-scope text-right"><a class="btn btn-default" ui-sref="editPledge({id:row.entity.PledgeGuid})">View</a></div>'
        }
    ],

    ContributionDonationsGrid:
         [
            {
                name: 'Date',
                field: 'DonationDate',
                cellTemplate: '<div class="ui-grid-cell-contents">{{row.entity.DonationDate | MvcDateFormat:"mmm dd, yyyy"}}</div>',
                enableHiding: false,
                suppressRemoveSort: false,
                enableFiltering: false,
                width: 180,
                enableColumnMenu: false
            },
            {
                name: 'Fund',
                field: 'FundName',
                enableHiding: false,
                suppressRemoveSort: false,
                enableFiltering: true,
                filter: {
                    term: "",
                    placeholder: ""
                }
            },
            {
                name: 'Donation Type',
                field: 'ContributionTypeName',
                enableHiding: false,
                suppressRemoveSort: false,
                enableFiltering: true,
                width: 190
            },
            {
                name: 'Amount',
                field: 'TotalAmount',
                headerCellTemplate: '/Static/templates/celltemplates/headerTextRight.html',
                cellClass: 'text-right',
                enableHiding: false,
                suppressRemoveSort: false,
                enableFiltering: true,
                filter: {
                    term: "",
                    placeholder: ""
                },
                cellFilter: "currency"
            },
            {
                name: '',
                width: 70,
                field: 'ContributionGuid',
                enableFiltering: false,
                enableHiding: false,
                enableSorting: false,
                enableColumnMenu: false,
                cellTemplate: '<div class="ui-grid-cell-contents ng-scope text-right"><a class="btn btn-default" ' +
                    ' ui-sref="editDonation({id:row.entity.ContributionGuid})">View</a></div>'
            }
         ],

    ContributionSoftCreditGrid:
     [
        {
            name: 'CreditAmount',
            field: 'CreditAmount',
            cellClass: 'text-left',
            enableHiding: false,
            suppressRemoveSort: false,
            enableFiltering: true,
            width: 130,
            filter: {
                term: "",
                placeholder: ""
            },
            cellFilter: "currency"
        },
        {
            name: 'Exclude From Donation',
            field: 'ExcludeFromDonationDonorOverallGiving',
            enableHiding: false,
            suppressRemoveSort: false,
            enableFiltering: true,
            width: 220,
            cellTemplate: "<div><span ng-show='row.entity.ExcludeFromDonationDonorOverallGiving'>Yes</span><span ng-show='!row.entity.ExcludeFromDonationDonorOverallGiving'>No</span></div>"
        },
        {
            name: ' ',
            width: 200,
            field: 'ContributionGuid',
            enableFiltering: false,
            enableHiding: false,
            enableSorting: false,
            enableColumnMenu: false,
            cellTemplate: '<div class="ui-grid-cell-contents ng-scope text-right"><a class="btn btn-default" ' +
                ' ui-sref="editDonation({id:row.entity.ContributionGuid})">View Donation Details</a></div>'
        },
        {
            name: '',
            width: 160,
            field: 'SoftCreditGuid',
            enableFiltering: false,
            enableHiding: false,
            enableSorting: false,
            enableColumnMenu: false,
            cellTemplate: '<div class="ui-grid-cell-contents ng-scope text-right"><a class="btn btn-default" ' +
                ' ui-sref="softcreditmodal({softCreditGuid:row.entity.SoftCreditGuid})" ui-sref-opts="{reload: true}">View Details </a></div>'
        }
     ],

    softCreditGrid:
     [
         {
             name: 'First Name',
             field: 'ConstituentFirstName',
             enableHiding: false,
             suppressRemoveSort: false,
             enableFiltering: true,
             filter: {
                 term: "",
                 placeholder: ""
             },
             cellTemplate: '<div class="ui-grid-cell-contents"><a ui-sref="constituent({constituentId: row.entity.ConstituentId})">{{COL_FIELD}}</a></div>'
         },
        {
            name: 'Last Name',
            field: 'ConstituentLastName',
            enableHiding: false,
            suppressRemoveSort: false,
            enableFiltering: true,
            filter: {
                term: "",
                placeholder: ""
            },
            cellTemplate: '<div class="ui-grid-cell-contents"><a ui-sref="constituent({constituentId: row.entity.ConstituentId})">{{COL_FIELD}}</a></div>'
        },
        {
            name: 'Display Name',
            field: 'ConstituentDisplayName',
            enableHiding: false,
            suppressRemoveSort: false,
            enableFiltering: true,
            filter: {
                term: "",
                placeholder: ""
            }, cellTemplate: '<div class="ui-grid-cell-contents"><a ui-sref="constituent({constituentId: row.entity.ConstituentId})">{{COL_FIELD}}</a></div>'
        },
        {
            name: 'CreditAmount',
            field: 'CreditAmount',
            cellClass: 'text-left',
            enableHiding: false,
            suppressRemoveSort: false,
            enableFiltering: true,
            width: 130,
            filter: {
                term: "",
                placeholder: ""
            },
            cellFilter: "currency"
        },
        {
            name: 'Exclude From Donation',
            field: 'ExcludeFromDonationDonorOverallGiving',
            enableHiding: false,
            suppressRemoveSort: false,
            enableFiltering: true,
            width: 220,
            cellTemplate: "<div><span ng-show='row.entity.ExcludeFromDonationDonorOverallGiving'>Yes</span><span ng-show='!row.entity.ExcludeFromDonationDonorOverallGiving'>No</span></div>"
        },

        {
            name: '',
            field: 'SoftCreditGuid',
            enableFiltering: false,
            enableHiding: false,
            enableSorting: false,
            cellTemplate: '<div class="ui-grid-cell-contents text-right"><a ui-sref="softcreditmodal({softCreditGuid:row.entity.SoftCreditGuid,constituentGuid:row.entity.ConstituentGuid})" ui-sref-opts="{reload: true}">View Details </a></div>'
        }
     ],
    smartListListing: [
        {
            name: 'Id',
            field: 'SmartListGuid',
            cellClass: 'truncate-text',
            width: '260',
            visible: false
        },
        {
            name: 'Name',
            field: 'Name',
            cellClass: 'truncate-text',
            width: '260'
        },
        {
            name: "Description",
            field: "Description",
            minWidth: 300,
            cellClass: 'truncate-text'
        },
        {
            name: "Created by",
            field: "CreatedBy",
            cellClass: 'truncate-text',
            width: '260'
        },
        {
            name: 'Count',
            field: 'Count',
            enableFiltering: false,
            enableColumnMenu: false,
            enableSorting: false,
            cellTemplate: '<div class="ui-grid-cell-contents">\
                                <i class="fa fa-cog fa-spin"></i>\
                                <i class="fa fa-cog"></i>\
                                <i class="fa fa-exclamation-triangle" uib-tooltip="Error in loading Smartlist count"></i>\
                                <span>{{COL_FIELD}}</span>\
                            </div>',
            cellClass: function (grid, row, col, rowRenderIndex, colRenderIndex) {
                if (grid.getCellValue(row, col) === "Initial") {
                    return 'initial';
                } else if (grid.getCellValue(row, col) === "Loading") {
                    return 'loading';
                } else if (grid.getCellValue(row, col) === "Warning") {
                    return 'warning';
                } else {
                    return 'loaded';
                }
            },
            width: '100'
        },
        {
            name: 'Creation date',
            field: 'CreateDate',
            enableFiltering: false,
            width: '160',
            cellTemplate: '<div class="ui-grid-cell-contents"><span ng-if="row.entity.CreatedBy">{{COL_FIELD | MvcDateFormat:\'mmmm d, yyyy\'}}</span></div>'
        }
    ],
    timeSlotCols: [
        {
            name: 'Start Date',
            field: 'StartDate',
            enableHiding: false,
            enableFiltering: false
        },
        {
            name: 'End Date',
            field: 'EndDate',
            enableHiding: false,
            enableFiltering: false
        },
        {
            name: 'Description',
            field: 'id',
            enableHiding: false,
            enableFiltering: false,
            cellTemplate: "/static/templates/celltemplates/volunteerTimeSlotDesc.html"
        },
        {
            name: ' ',
            field: "id",
            width: 180,
            enableFiltering: false,
            enableColumnMenu: false,
            enableHiding: false,
            cellTemplate: "/static/templates/celltemplates/volunteerTimeSlotAction.html"
        }
    ],
    existingConstituentGridColDefs: [
        {
            name: "Name",
            field: "DisplayName",
            cellTemplate: "/static/templates/celltemplates/existingConstituentLink.html",
            enableHiding: false,
            enableFiltering: false,
            enableSorting: true,
            sort: {
                direction: 0,
                priority: 1
            }
        },
        {
            name: " ",
            field: "Id",
            enableFiltering: false,
            enableHiding: false,
            enableColumnMenu: false,
            width: 90,
            enableSorting: false,
            cellTemplate: "/static/templates/celltemplates/existingConstituentAction.html"
        }
    ],
    constituents: [
        {
            name: 'First Name',
            field: 'FirstName',
            enableHiding: false,
            cellTemplate: '/static/templates/celltemplates/constituent.html'
        },
        {
            name: null,
            field: "ConstituentId",
            enableFiltering: false,
            enableHiding: false,
            enableSorting: false,
            cellTemplate: '<div class="ui-grid-cell-contents"><a class="btn btn-default" ng-click="$event.stopPropagation(); grid.appScope.selectConstituent(row.entity.ConstituentId, row.entity.ConstituentGuid);">Select</a>' + '</div>',
            hidden: true,
            maxWidth: 100,
            headerCellTemplate: '/Static/templates/celltemplates/headerTextRight.html',
            cellClass: 'text-right'
        }
    ],
    constituentSearch: [
        {
            name: 'First Name',
            field: 'FirstName',
            enableHiding: false,
            cellTemplate: '/static/templates/celltemplates/constituent.html'
        },
        {
            name: null,
            field: "ConstituentId",
            enableFiltering: false,
            enableHiding: false,
            enableSorting: false,
            cellTemplate: '<div class="ui-grid-cell-contents"><a class="btn btn-default" ng-click="$event.stopPropagation(); grid.appScope.selectConstituent(row);">Select</a>' + '</div>',
            hidden: true,
            maxWidth: 100,
            headerCellTemplate: '/Static/templates/celltemplates/headerTextRight.html',
            cellClass: 'text-right'
        }
    ],
    addPledgeConstituentGridColdDefs: [
        {
            name: 'First Name',
            field: 'FirstName',
            enableHiding: false,
            cellTemplate: '/static/templates/celltemplates/constituent.html'
        },
        {
            name: null,
            field: "ConstituentGuid",
            enableFiltering: false,
            enableHiding: false,
            enableSorting: false,
            cellTemplate: '<div class="ui-grid-cell-contents"><a class="btn btn-default" ng-click="$event.stopPropagation(); grid.appScope.selectConstituent(row.entity.ConstituentId);">Select</a>' + '</div>',
            hidden: true,
            maxWidth: 100,
            cellClass: 'text-right'
        }
    ],
    constituentList: [
            {
                name: 'First Name',
                field: 'FirstName',
                enableHiding: false,
                enableFiltering: true,
                cellClass: 'truncate-text'
            },
            {
                name: 'Last Name',
                field: 'LastName',
                enableHiding: false,
                enableFiltering: true,
                cellClass: 'truncate-text'
            },
            {
                name: 'Profile Type',
                field: 'ProfileType',
                enableHiding: false,
                enableFiltering: true,
                cellClass: 'truncate-text'
            },
            {
                name: 'Email',
                field: 'PrimaryEmail.EmailAddress',
                enableHiding: false,
                enableFiltering: true,
                cellClass: 'truncate-text'
            },
            {
                name: 'Phone',
                field: 'PrimaryPhone.PhoneNumber',
                enableHiding: false,
                enableFiltering: true,
                cellFilter: 'tel',
                cellClass: 'truncate-text'
            },
            {
                name: 'Address Line 1',
                field: 'PrimaryAddress.AddressLine1',
                enableHiding: false,
                enableFiltering: true,
                minWidth: 300,
                cellClass: 'truncate-text'
            },
            {
                name: 'City',
                field: 'PrimaryAddress.AddressCity',
                enableHiding: false,
                enableFiltering: true,
                cellClass: 'truncate-text'
            },
            {
                name: 'State',
                field: 'StateName',
                enableHiding: false,
                enableFiltering: true,
                cellClass: 'truncate-text'
            },
            {
                name: 'Zip',
                field: 'PrimaryAddress.AddressPostalCode',
                enableHiding: false,
                enableFiltering: true,
                cellClass: 'truncate-text'
            },
            {
                name: 'Country',
                field: 'PrimaryAddress.Country.Name',
                enableHiding: false,
                enableFiltering: true,
                cellClass: 'truncate-text'
            },
            {
                name: null,
                field: "Id",
                enableFiltering: false,
                enableHiding: false,
                enableSorting: false,
                cellTemplate: '<div class="ui-grid-cell-contents"><a class="btn btn-default" ng-click="$event.stopPropagation(); grid.appScope.GetConstituentDetails(row.entity);">View</a>' + '</div>',
                hidden: true,
                minWidth: 62,
                cellClass: 'text-right truncate-text'
            }
    ],
    pledgeGrid: [
        {
            field: 'ExpectedDate',
            displayName: 'Date Expected',
            cellFilter: 'date'
        },
        {
            field: 'ExpectedAmount',
            displayName: 'Amount Expected',
            cellFilter: 'currency'
        }
    ],
    unpaidPledgeGrid: [
        {
            field: 'ExpectedDate',
            displayName: 'Date Expected',
            cellFilter: 'date'
        },
        {
            field: 'ExpectedAmount',
            displayName: 'Amount Expected',
            cellFilter: 'currency'
        },
        {
            field: 'action',
            displayName: 'Select Payment',
            cellTemplate: '<div class="ui-grid-cell-contents radio" style="margin: 0;">\
                                <input type="radio" name="secondaryPayment" ng-click="grid.appScope.selectSecondaryScheduledPledgePayment(row.entity);" value="row.entity.ScheduledPledgePaymentId" /><label></label>' +
                           '</div>'
        }
    ],
    pledgePaymentsGrid: [
        {
            displayName: '',
            field: 'IsOverDue',
            enableFiltering: false,
            enableHiding: false,
            enableSorting: false,
            cellTemplate: "/Static/templates/celltemplates/PledgeOverdue.html",
            width: 40,
            minWidth: 40,
            maxWidth: 40
        },
        {
            field: 'ExpectedDate',
            width: 110,
            sort: {
                direction: 'asc'
            },
            displayName: 'Date',
            cellFilter: 'MvcDateFormat:"mmm d, yyyy"'
        },
        {
            field: 'ExpectedAmount',
            displayName: 'Pledged Amount',
            cellFilter: 'currency'
        }
    ]
});