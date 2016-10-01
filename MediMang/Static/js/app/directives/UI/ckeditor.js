(function(angular, factory) {
        if(typeof define === 'function' && define.amd) {
            define(['angular', 'ckeditor'], function(angular) {
                return factory(angular);
            });
        } else {
            return factory(angular);
        }
    }(window.angular || null, function(angular) {
        var app = angular.module('ngCkeditor', []);
        var $defer, loaded = false;

        app.run([
            '$q', '$timeout', function($q, $timeout) {
                $defer = $q.defer();

                if(angular.isUndefined(CKEDITOR)) {
                    throw new Error('CKEDITOR not found');
                }
                CKEDITOR.disableAutoInline = true;

                function checkLoaded() {
                    if(CKEDITOR.status === 'loaded') {
                        loaded = true;
                        $defer.resolve();
                    } else {
                        checkLoaded();
                    }
                }

                CKEDITOR.on('loaded', checkLoaded);
                $timeout(checkLoaded, 100);
            }
        ]);

        app.directive('ckeditor', [
            '$timeout', '$q', 'MergeVariableRepository', function ($timeout, $q, mergeVariableRepository) {

                return {
                    restrict: 'AE',
                    require: ['ngModel', '^?form'],
                    scope: {
                        wordcount: '@', 
                        extraPlugins: '@'
                    },
                    link: function(scope, element, attrs, ctrls) {

                        //// directive attributes

                        // wordcount: property on characterlimit object in global.js
                        var wordcount = attrs.wordcount;

                        // extra-plugins: any additional plugins we need ckeditor to run for this instance
                        // strinsert is handled below, added only if merge variables are present
                        var extraPlugins = attrs.extraPlugins ? attrs.extraPlugins + ',wordcount' : 'wordcount';

                        // id: which editor we're instantiating 
                        // MessageEditor, emailFooterContent, emailHeaderContent, emailTemplateContent, customTextEditor
                        var id = attrs.id;

                        // mergeVariables: which merge variables to fetch (email template id)
                        var type = attrs.mergeVariables;

                        //
                        // note: image2.js was altered to make the "browser server" button read "upload" (in case the plugin needs to be upgraded)
                        // strinsert plugin.js was also altered for merge variable insert - do not copy over this version
                        //

                        var ngModel = ctrls[0];
                        var form = ctrls[1] || null;
                        var EMPTY_HTML = '<p></p>',
                            isTextarea = element[0].tagName.toLowerCase() === 'textarea',
                            data = [],
                            isReady = false;

                        if(!isTextarea) {
                            element.attr('contenteditable', true);
                        }

                        var onLoad = function() {
                            var options = {
                                uiColor: '#FAFAFA',
                                height: '400px',
                                width: '100%',
                                toolbarGroups: [
                                    { name: 'basicstyles', groups: ['basicstyles', 'cleanup'] },
                                    { name: 'paragraph', groups: ['list', 'indent', 'blocks', 'align', 'bidi', 'paragraph'] },
                                    { name: 'editing', groups: ['find', 'selection', 'spellchecker', 'editing'] },
                                    { name: 'forms', groups: ['forms'] },
                                    { name: 'document', groups: ['mode', 'document', 'doctools'] },
                                    '/',
                                    { name: 'clipboard', groups: ['clipboard', 'undo'] },
                                    { name: 'links', groups: ['links'] },
                                    { name: 'insert', groups: ['insert'] },
                                    '/',
                                    { name: 'styles', groups: ['styles'] },
                                    { name: 'colors', groups: ['colors'] },
                                    { name: 'tools', groups: ['tools'] },
                                    { name: 'others', groups: ['others'] },
                                    { name: 'about', groups: ['about'] }
                                ],
                                removeButtons: 'Print,Templates,SelectAll,CreateDiv',
                                imgScope: function() { scope.openImageEditor(); },
                                filebrowserBrowseUrl: '/Browser',
                                filebrowserWindowWidth: '400',
                                filebrowserWindowHeight: '400',
                                extraPlugins: extraPlugins,
                                mergeVariables: null,
                                contentsCss: "/bundles/css/bootstrap",
                                wordcount: {
                                    showParagraphs: false,
                                    showWordCount: false,
                                    showCharCount: true,
                                    maxWordCount: -1,
                                    maxCharCount: characterlimit[wordcount]
                                }
                            };

                            switch (id) {
                                // volunteer portal widget text editor
                                case 'customTextEditor':
                                    options.mergeVariables = textWidgetMergeVariable; // hard coded in global.js
                                    createEditor();
                                    break;

                                // email template editors
                                case 'emailFooterContent':
                                case 'emailHeaderContent':
                                case 'emailTemplateContent':
                                    mergeVariableRepository.GetMergeVariables(type,
                                        function (data) {
                                            options.mergeVariables = data;
                                        },
                                        function (data, status, headers, config) {
                                        },
                                        function () {
                                            createEditor();
                                        }
                                    );
                                    break;

                                // message editor does not have merge variables
                                default:
                                    createEditor();
                                    break;
                            }

                            function createEditor() {

                                // instead of adding the strinsert plugin based on directive attribute, add it based on the presence of merge variables
                                // (header/footer have no merge variables in the db but we could add them in the future)
                                if (options.mergeVariables) {
                                    options.extraPlugins += ',strinsert';
                                    options.strinsert_button_title = 'MergeVariables';
                                }
                                options = angular.extend(options, scope[attrs.ckeditor]);

                                var instance = (isTextarea) ? CKEDITOR.replace(element[0], options) : CKEDITOR.inline(element[0], options), configLoaderDef = $q.defer();

                                element.bind('$destroy', function () {
                                    if (instance && CKEDITOR.instances[instance.name]) {
                                        CKEDITOR.instances[instance.name].destroy();
                                    }
                                });

                                var setModelData = function (setPristine) {
                                    var data = instance.getData();
                                    if (data === '') {
                                        data = null;
                                    }
                                    $timeout(function () {
                                        if (setPristine !== true || data !== ngModel.$viewValue) {
                                            ngModel.$setViewValue(data);
                                        }

                                        if (setPristine === true && form) {
                                            form.$setPristine();
                                        }
                                    }, 0);
                                },
                                    onUpdateModelData = function (setPristine) {
                                        if (!data.length) {
                                            return;
                                        }

                                        var item = data.pop() || EMPTY_HTML;
                                        isReady = false;
                                        instance.setData(item, function () {
                                            setModelData(setPristine);
                                            isReady = true;
                                        });
                                    };
                                instance.on('change', setModelData);
                                instance.on('blur', setModelData);

                                instance.on('instanceReady', function () {
                                    scope.$broadcast('ckeditor.ready');
                                    scope.$apply(function () {
                                        onUpdateModelData(true);
                                    });

                                    instance.document.on('keyup', setModelData);
                                });
                                instance.on('customConfigLoaded', function () {
                                    configLoaderDef.resolve();
                                });

                                ngModel.$render = function () {
                                    data.push(ngModel.$viewValue);
                                    if (isReady) {
                                        onUpdateModelData();
                                    }
                                };
                            }


                        };

                        if(CKEDITOR.status === 'loaded') {
                            loaded = true;
                        }
                        if(loaded) {
                            onLoad();
                        } else {
                            $defer.promise.then(onLoad);
                        }
                    }
                };
            }
        ]);

        return app;
    })
);