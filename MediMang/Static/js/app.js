/// <reference path="/scripts/_references.js" />
var app = angular.module('app', [
        'ngMessages',
        'ngSanitize',

        //AJAX helper
        'XSS',
        'ngRoute',
        'ui.router',
        'angular.filter',
        'ct.ui.router.extras',
        'ct.ui.router.extras.sticky',
        'ct.ui.router.extras.dsr',
        'ct.ui.router.extras.previous',
        'blockUI'
])
.config([
    'blockUIConfig', function (blockUiConfig) {
        blockUiConfig.template = '<div class=\"block-ui-overlay\"></div><div class=\"block-ui-message-container\" aria-live=\"assertive\" aria-atomic=\"true\"><div class=\"block-ui-message\" ng-class=\"$_blockUiMessageClass\"><i class="fa fa-cog fa-spin fa-5x"></i></div></div>';
        blockUiConfig.autoBlock = false;
        blockUiConfig.autoInjectBodyBlock = false;
    }])

.config([
    'growlProvider', function (growlProvider) {
        growlProvider.globalPosition('top-center');
        growlProvider.globalTranslateMessages(false);
        growlProvider.globalDisableIcons(true);
        growlProvider.globalDisableCountDown(true);
    }
])
.config([
    '$provide', function ($provide) {
        $provide.decorator('GridOptions', [
            '$delegate', 'uiGridConstants', function ($delegate, uiGridConstants) {
                var gridOptions = angular.copy($delegate);
                gridOptions.initialize = function (options) {
                    var initOptions;
                    initOptions = $delegate.initialize(options);
                    initOptions.enableColumnResizing = true;
                    initOptions.enableColumnMenus = false;
                    initOptions.paginationPageSizes = [25, 50, 75];
                    initOptions.enableHorizontalScrollbar = uiGridConstants.scrollbars.NEVER;
                    initOptions.useExternalPagination = options.useExternalPagination === false || options.useExternalPagination === undefined ? false : true;
                    initOptions.useExternalSorting = options.useExternalSorting === false || options.useExternalSorting === undefined ? false : true;
                    return initOptions;
                };
                return gridOptions;
            }
        ]);
    }
])
.run([
'$templateCache', function ($templateCache) {

    $templateCache.put('ui-grid/ui-grid-menu-button',
"<div class=\"ui-grid-menu-button btn btn-small\"><div role=\"button\" ui-grid-one-bind-id-grid=\"'grid-menu'\" class=\"ui-grid-icon-container \" ng-click=\"toggleMenu()\" aria-haspopup=\"true\"><i class=\"ui-grid-icon-menu\" ui-grid-one-bind-aria-label=\"i18n.aria.buttonLabel\">&nbsp;</i></div><div ui-grid-menu menu-items=\"menuItems\"></div></div>"
);
    $templateCache.put('ui-grid/uiGridMenuItem',
        "<button type=\"button\" class=\"ui-grid-menu-item btn btn-block text-left \" ng-click=\"itemAction($event, title)\" ng-show=\"itemShown()\" ng-class=\"{ 'ui-grid-menu-item-active': active(), 'ui-grid-sr-only': (!focus && screenReaderOnly) }\" aria-pressed=\"{{active()}}\" tabindex=\"0\" ng-focus=\"focus=true\" ng-blur=\"focus=false\"><i ng-class=\"icon\" aria-hidden=\"true\">&nbsp;</i> {{ name }}</button>"
    );

    $templateCache.put('ui-grid/ui-grid-filter',
"<div class=\"ui-grid-filter-container\" ng-repeat=\"colFilter in col.filters\" ng-class=\"{'ui-grid-filter-cancel-button-hidden' : colFilter.disableCancelFilterButton === true }\"><div ng-if=\"colFilter.type !== 'select'\"><input type=\"text\" class=\"!!! form-control input-sm ui-grid-filter-input-{{$index}}\" ng-model=\"colFilter.term\" ng-attr-placeholder=\"{{colFilter.placeholder || ''}}\" aria-label=\"{{colFilter.ariaLabel || aria.defaultFilterLabel}}\"><div role=\"button\" class=\"ui-grid-filter-button\" ng-click=\"removeFilter(colFilter, $index)\" ng-if=\"!colFilter.disableCancelFilterButton\" ng-disabled=\"colFilter.term === undefined || colFilter.term === null || colFilter.term === ''\" ng-show=\"colFilter.term !== undefined && colFilter.term !== null && colFilter.term !== ''\"><i class=\"ui-grid-icon-cancel\" ui-grid-one-bind-aria-label=\"aria.removeFilter\">&nbsp;</i></div></div><div ng-if=\"colFilter.type === 'select'\"><select class=\"ui-grid-filter-select ui-grid-filter-input-{{$index}}\" ng-model=\"colFilter.term\" ng-attr-placeholder=\"{{colFilter.placeholder || aria.defaultFilterLabel}}\" aria-label=\"{{colFilter.ariaLabel || ''}}\" ng-options=\"option.value as option.label for option in colFilter.selectOptions\"><option value=\"\"></option></select><div role=\"button\" class=\"ui-grid-filter-button-select\" ng-click=\"removeFilter(colFilter, $index)\" ng-if=\"!colFilter.disableCancelFilterButton\" ng-disabled=\"colFilter.term === undefined || colFilter.term === null || colFilter.term === ''\" ng-show=\"colFilter.term !== undefined && colFilter.term != null\"><i class=\"ui-grid-icon-cancel\" ui-grid-one-bind-aria-label=\"aria.removeFilter\">&nbsp;</i></div></div></div>"
);

    $templateCache.put('ui-grid/uiGridMenu',
"<div class=\"ui-grid-menu\" ng-if=\"shown\"><style ui-grid-style>{{dynamicStyles}}</style><div class=\"ui-grid-menu-mid\" ng-show=\"shownMid\"><div class=\"ui-grid-menu-inner\"><ul role=\"menu\" class=\"ui-grid-menu-items\"><li ng-repeat=\"item in menuItems\" role=\"menuitem\" ui-grid-menu-item ui-grid-one-bind-id=\"'menuitem-'+$index\" action=\"item.action\" name=\"item.title\" active=\"item.active\" icon=\"item.icon\" shown=\"item.shown\" context=\"item.context\" template-url=\"item.templateUrl\" leave-open=\"item.leaveOpen\" screen-reader-only=\"item.screenReaderOnly\"></li></ul></div></div></div>"
);


    $templateCache.put('ui-grid/uiGridMenuItem',
"<button type=\"button\" class=\"ui-grid-menu-item btn btn-block text-left \" ng-click=\"itemAction($event, title)\" ng-show=\"itemShown()\" ng-class=\"{ 'ui-grid-menu-item-active': active(), 'ui-grid-sr-only': (!focus && screenReaderOnly) }\" aria-pressed=\"{{active()}}\" tabindex=\"0\" ng-focus=\"focus=true\" ng-blur=\"focus=false\"><i ng-class=\"icon\" aria-hidden=\"true\">&nbsp;</i> {{ name }}</button>"
);

    $templateCache.put('ui-grid/pagination',
        // '<div class="ui-grid-pager-panel" ui-grid-pager ng-show="grid.options.enablePaginationControls && grid.options.paginationPageSize < grid.options.totalItems">' +
        '<div class="ui-grid-pager-panel" ui-grid-pager ng-show="grid.options.enablePaginationControls && grid.options.totalItems && grid.options.totalItems>25 ">' +
        '<div class="ui-grid-pager-container">' +
        '<div class="ui-grid-pager-control">' +
        '<uib-pagination class="pagination-sm" total-items="grid.options.totalItems" items-per-page="grid.options.paginationPageSize" ng-model="grid.options.paginationCurrentPage" boundary-links="false" max-size="5"></uib-pagination>' +
        '</div>' +
        '<div class="ui-grid-pager-row-count-picker">' +
        '<select ng-model="grid.options.paginationPageSize" ng-options="o as o for o in grid.options.paginationPageSizes"></select>' +
        '<span class="ui-grid-pager-row-count-label">&nbsp;{{sizesLabel}}</span>' +
        '</div>' +
        '</div>' +
        '<div class="ui-grid-pager-count-container">' +
        '<div class="ui-grid-pager-count">' +
        '<span ng-show="grid.options.totalItems > 0">' +
        '{{showingLow}} - {{showingHigh}} of {{grid.options.totalItems}} {{totalItemsLabel}}' +
        '</span>' +
        '</div>' +
        '</div>' +
        '</div>'
    );
    $.material.init();

}

]);

