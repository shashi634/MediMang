angular.module('errorService', [])

        .service('errorService', function () {
            
                this.matchingServerSideError = function (errors, match) {
                    var compareResult = false;

                    if (window.angular.isDefined(errors) && (errors.length > 0)) {
                        window.angular.forEach(errors, function (value, key) {
                            // alert(key + ': ' + value.Name);
                            if (value.Name == match)
                                compareResult = true;
                        });
                    }
                    return compareResult;
                }            
        });