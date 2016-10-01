angular.module('XSS', [])
    .factory('XSS', function () {
        return {
            request: function (config) {

                config.headers.__RequestVerificationToken =
                    jQuery('input[name="__RequestVerificationToken"]').val();
                if (config.headers.__RequestVerificationToken != null) {
                   // log('xss token inject');
                }                
                return config;
            },
        };
    })
