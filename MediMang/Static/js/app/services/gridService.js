angular.module('gridService', [])
    .service('gridService', ['sortColumn',
    function (sortColumn) {
        return {
            defaultPageSize: function () {
                return 25;
            },
            gridSort: function (grid, sortColumns, $scope, dataLoader) {
                if (sortColumns.length === 0) {
                    //paginationOptions.sort = null;
                } else {

                    // Old way of sorting - restricted by only one column - keeping for backwards compatability with those grids
                    $scope.sortByColumn = sortColumns[0].colDef.field;
                    $scope.sortBool = sortColumns[0].sort.direction === 'desc';

                    // New way - multiple columns
                    var counter = 1;
                    $scope.sortMultipleColumns = [];
                    window.angular.forEach(sortColumns, function (column) {
                        $scope.sortMultipleColumns.push(new sortColumn(column.colDef.field, column.sort.direction === 'desc', counter));
                        counter = counter + 1;
                    });

                    dataLoader($scope.activeReport);
                }
            },
            gridPage: function(newPage, pageSize, $scope, dataLoader) {
                $scope.pageNumber = newPage;
                $scope.pageSize = pageSize;
                dataLoader($scope.activeReport);
            }
        }
    }
]);