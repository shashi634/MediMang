﻿/// <reference path="/scripts/_references.js" />
angular.module('confirm', ['ui.bootstrap'])
  .controller('ConfirmModalController', ['$scope', '$uibModalInstance', 'data', function ($scope, $uibModalInstance, data) {
      $scope.data = angular.copy(data);

      $scope.ok = function () {
          $uibModalInstance.close();
      };

      $scope.cancel = function () {
          $uibModalInstance.dismiss('cancel');
      };

  }])
  .value('$confirmModalDefaults', {
      template: '<div class="modal-header"><h3 class="modal-title">{{data.title}}</h3></div>' +
      '<div class="modal-body">{{data.text}}</div>' +
      '<div class="modal-footer">' +
      '<button class="btn btn-default" ng-click="cancel()">{{data.cancel}}</button>' +
      '<button class="btn btn-primary" ng-click="ok()">{{data.ok}}</button>' +
      '</div>',
      controller: 'ConfirmModalController',
      defaultLabels: {
          title: 'Confirm',
          ok: 'Yes',
          cancel: 'No'
      }
  })
  .factory('$confirm', ['$uibModal', '$confirmModalDefaults', function ($uibModal, $confirmModalDefaults) {
      return function (data, settings) {
          settings = angular.extend($confirmModalDefaults, (settings || {}));

          data = angular.extend({}, settings.defaultLabels, data || {});

          if ('templateUrl' in settings && 'template' in settings) {
              delete settings.template;
          }

          settings.resolve = {
              data: function () {
                  return data;
              }
          };

          return $uibModal.open(settings).result;
      };
  }])
  .directive('confirm', ['$confirm', function ($confirm) {
      return {
          priority: 1,
          restrict: 'A',
          scope: {
              confirmIf: "=",
              ngClick: '&',
              confirm: '@',
              confirmSettings: "=",
              confirmTitle: '@',
              confirmOk: '@',
              confirmCancel: '@'
          },
          link: function (scope, element, attrs) {


              element.unbind("click").bind("click", function ($event) {

                  $event.preventDefault();

                  if (angular.isUndefined(scope.confirmIf) || scope.confirmIf) {

                      var data = { text: scope.confirm };
                      if (scope.confirmTitle) {
                          data.title = scope.confirmTitle;
                      }
                      if (scope.confirmOk) {
                          data.ok = scope.confirmOk;
                      }
                      if (scope.confirmCancel) {
                          data.cancel = scope.confirmCancel;
                      }
                      $confirm(data, scope.confirmSettings || {}).then(scope.ngClick);
                  } else {

                      scope.$apply(scope.ngClick);
                  }
              });

          }
      }
  }]);
