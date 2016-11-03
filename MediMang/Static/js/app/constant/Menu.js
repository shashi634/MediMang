(function () {

    window.angular.module("app").service("menu", [
        "$rootScope",
        
        function () {
            var menu = {};
                menu = {
                home:
                {
                    displayName: "Home",
                    icon: "fa-home",
                    show: true,
                    uiSref: "home"
                },
                subjects:
                {
                    displayName: "Subjects",
                    icon: "fa-language",
                    show: true,
                    uiSref: "subjects"
                },
                Questions:
                {
                    displayName: "Questions",
                    icon: "fa-question",
                    show: true,
                    uiSref: "questions"
                },
                Students:
                {
                    displayName: "Students",
                    icon: "fa-user",
                    show: true,
                    uiSref: "students"
                },
                Setting:
                {
                    displayName: "Setting",
                    icon: "fa-cog",
                    show: true,
                    uiSref: "setting"
                },
                QuestionSet:
                {
                    displayName: "QuestionSet",
                    icon: "fa-cog",
                    show: true,
                    uiSref: "questionSet"
                }
            }
            return menu;
        }
    ]);
})();