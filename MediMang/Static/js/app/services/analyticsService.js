﻿var _gaq = _gaq || [];

angular.module('analytics', [])
       .run(['$http', function ($http) {

           var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
           ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
           var s = document.getElementsByTagName('script')[0];
           s.parentNode.insertBefore(ga, s);

       }]).service('analytics', ['$rootScope', '$window', '$location', '$routeParams', function ($rootScope, $window, $location, $routeParams) {
           _gaq.push(['_setAccount', '']);
           _gaq.push(['_trackPageview']);

           $rootScope.$on('$viewContentLoaded', track);
           var track = function () {
               var path = convertPathToQueryString($location.path(), $routeParams)
               $window._gaq.push(['_trackPageview', path]);
           };

           var convertPathToQueryString = function (path, $routeParams) {
               for (var key in $routeParams) {
                   var queryParam = '/' + $routeParams[key];
                   path = path.replace(queryParam, '');
               }

               var querystring = decodeURIComponent($.param($routeParams));

               if (querystring === '') return path;

               return path + "?" + querystring;
           };
           var analyticsEventTracking = function (category, action, level) {
               if (category != null) {
                   $window._gaq.push(['_trackEvent', category, action, level, 1, true]);
               }
           };
           var trackPageView = function (path) {
               path = path || window.location.pathname;
               $window._gaq.push(['_trackPageview', path]);
           };

           return {
               analyticsEventTracking: analyticsEventTracking,

               trackPageView: trackPageView
           }
       }]);
