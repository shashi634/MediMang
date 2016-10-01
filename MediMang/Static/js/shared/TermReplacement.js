app.directive('termReplacement', ['orgGuid', 'widgetOrganizationService', 'termReplacementsCache', function (orgGuid, widgetOrganizationService, termReplacementsCache) {
    return {
        restrict: 'E',
        scope: {
            term: '@',
            article: '='
        },
        transclude: true,
        template: '<i class="fa fa-spinner fa-spin"></i>',
        link: function (scope, element) {
            var replaceTerm = function (terms) {
                var targetTerm = scope.term; // word being replaced
                var replacementTerm = targetTerm; // word to replace it with
                if(terms != null) { // list of defined custom terms
                    terms.forEach(function(termReplacement) {
                        var firstLetter = targetTerm.charAt(0);
                        var isCapitalized = firstLetter == firstLetter.toUpperCase(); // is the word being replaced capitalized?
                        if (termReplacement.Term.toLowerCase() === scope.term.toLowerCase()) { // case insensitive term match
                            replacementTerm = termReplacement.Replacement; // set replacement term
                            // replace the first letter with upper or lower case
                            var replacementFirstLetter = isCapitalized ? replacementTerm.charAt(0).toUpperCase() : replacementTerm.charAt(0).toLowerCase();
                            replacementTerm = replacementFirstLetter + replacementTerm.substring(1); // update replacement term
                        }
                    });
                }
                if(scope.article && replacementTerm) {
                    var firstChar = replacementTerm.charAt(0).toLowerCase();
                    switch(firstChar) {
                    case 'a':
                    case 'e':
                    case 'i':
                    case 'o':
                    case 'u':
                        replacementTerm = 'an ' + replacementTerm;
                        break;
                    default:
                        replacementTerm = 'a ' + replacementTerm;
                    }
                }
                element.html(replacementTerm);
            }
            var termReplacements = termReplacementsCache.get('termReplacements');
            if (termReplacements) {
                replaceTerm(termReplacements);
            } else {
                // retrieve first time
                widgetOrganizationService.getReplacementTerms(orgGuid).then(function(results) {
                        termReplacementsCache.put('termReplacements', results);
                        termReplacements = termReplacementsCache.get('termReplacements');
                        replaceTerm(termReplacements);
                    },
                    function() {
                    }
                );
            }
        }
    };
}]);

// Set up the termReplacementsCache
app.factory('termReplacementsCache', ['$cacheFactory', function ($cacheFactory) {
    return $cacheFactory('termReplacements');
}]);