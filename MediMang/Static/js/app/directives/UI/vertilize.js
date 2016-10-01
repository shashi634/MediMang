(function () {
    var f = angular.module("angular.vertilize", []);
    f.directive("vertilizeContainer", [function () {
        return {
            restrict: "EA", controller: ["$scope", "$window", function (e, d) {
                var a = this;
                a.childrenHeights = [];
                a.allocateMe = function () {
                    a.childrenHeights.push(0);
                    return a.childrenHeights.length - 1;
                };
                a.updateMyHeight = function (b, c) {
                    a.childrenHeights[b] = c;
                };
                a.getTallestHeight = function () {
                    for (var b = 0, c = 0; c < a.childrenHeights.length; c += 1) {
                        b = Math.max(b, a.childrenHeights[c]);
                    }
                    return b;
                };
                angular.element(d).bind("resize", function () {
                    return e.$apply();
                });
            }]
        };
    }]);
    f.directive("vertilize", [function () {
        return {
            restrict: "EA", require: "^vertilizeContainer", link: function (e, d, a, b) {
                var c = b.allocateMe();
                e.$watch(function () {
                    var a = d.clone().removeAttr("vertilize").css({ height: "", width: d.outerWidth(), position: "fixed", top: 0, left: 0, visibility: "hidden" });
                    d.after(a);
                    var b = a.height();
                    a.remove();
                    return b;
                }, function (a) {
                    a && b.updateMyHeight(c, a);
                });
                e.$watch(b.getTallestHeight, function (a) {
                    a && d.css("height", a);
                });
            }
        };
    }]);
})();