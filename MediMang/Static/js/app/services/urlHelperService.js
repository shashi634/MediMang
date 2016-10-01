angular.module('urlHelperService', [])
    .service('urlHelperService', function () {
            return {
                updateQueryString: function(key, value, url) {
                    if (!url) url = window.location.href;
                    var re = new RegExp("([?&])" + key + "=.*?(&|#|$)(.*)", "gi"),
                        hash;

                    if (re.test(url)) {
                        if (typeof value !== 'undefined' && value !== null)
                            return url.replace(re, '$1' + key + "=" + value + '$2$3');
                        else {
                            hash = url.split('#');
                            url = hash[0].replace(re, '$1$3').replace(/(&|\?)$/, '');
                            if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                                url += '#' + hash[1];
                            return url;
                        }
                    } else {
                        if (typeof value !== 'undefined' && value !== null) {
                            var separator = url.indexOf('?') !== -1 ? '&' : '?';
                            hash = url.split('#');
                            url = hash[0] + separator + key + '=' + value;
                            if (typeof hash[1] !== 'undefined' && hash[1] !== null)
                                url += '#' + hash[1];
                            return url;
                        } else {
                            return url;
                        }
                    }
                },

                getUrlParameter: function (param, dummyPath) {

                    var sPageURL = dummyPath || window.location.search.substring(1),
                        sURLVariables = sPageURL.split(/[&||?]/),
                        res;

                    for (var i = 0; i < sURLVariables.length; i += 1) {
                        var paramName = sURLVariables[i],
                            sParameterName = (paramName || '').split('=');

                        if (sParameterName[0] === param) {
                            res = sParameterName[1];
                        }
                    }

                    return res;
                },

                getQueryStringValue: function(key) {
                    return unescape(window.location.search.replace(new RegExp("^(?:.*[&\\?]" + escape(key).replace(/[\.\+\*]/g, "\\$&") + "(?:\\=([^&]*))?)?.*$", "i"), "$1"));
                }
            }
        }
        );