angular.module('uiGridHelperService', [])
    .service('uiGridHelperService', function () {
            return {
                calculateTableHeight: function (grid) {
                    //todo: improve this to take into account pagination, headers, filters and grouping
                    var height = grid.rowHeight * grid.data.length + grid.headerRowHeight + $('[ui-grid-pager]').outerHeight() + 30;
                    return {
                        height: height + 'px'
                    }
                },
                scrollFix: function ($scope) {
                    $scope.$watch('isDisplayed', function (newValue, oldValue) {
                        var viewport = $('.ui-grid-render-container');
                        if (viewport.length) {

                            ['touchstart', 'touchmove', 'touchend', 'keydown', 'wheel', 'mousewheel', 'DomMouseScroll', 'MozMousePixelScroll'].forEach(function(eventName) {
                                viewport.unbind(eventName);
                            });
                        }
                    });

                }
            }
        }
    );