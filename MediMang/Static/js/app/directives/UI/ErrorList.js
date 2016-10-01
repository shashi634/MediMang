angular.module('app').directive('errorList', function () {
    return {
        restrict: 'E',
        compile: function (element, attrs) {

            // Format Errors
            var htmlText = ' <div class="row " ng-show="((errorstatus != 403) && (errors.length > 0))">' +
                ' <div class="col-md-12 ">' +
                '<div class="alert alert-danger" ng-repeat="error in errors">{{error.Description}}</div>' +
                '</div>' +
                '</div>';

            // Format Forbidden Errors
            htmlText = htmlText + ' <div class="row " ng-show="authorizeService.is403(errorstatus)">' +
                ' <div class="col-md-12 ">' +
                '<div class="alert alert-info">This feature is not available. You do not have the required account privileges. Please check with your CRM administrator for more details.</div>' +
                '</div>' +
                '</div>';

            element.replaceWith(htmlText);

        }
    }
})