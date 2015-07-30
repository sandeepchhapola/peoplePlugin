'use strict';

(function (angular, window) {
  angular
    .module('peoplePluginWidget')
    .controller('WidgetPeoplesCtrl', ['$scope', '$window', 'Buildfire', 'TAG_NAMES', 'ERROR_CODE', function ($scope, $window, Buildfire, TAG_NAMES, ERROR_CODE) {
      var _self = this;
      var getContentItems = function () {
        Buildfire.datastore.get(TAG_NAMES.PEOPLES, function (err, result) {
          if (err && err.code !== ERROR_CODE.NOT_FOUND) {
            console.error('-----------err in getting list-------------', err);
          }
          else if (result) {
            _self.items = result.data;
            $scope.$digest();
          }
        });
      };
      var getContentPeopleInfo = function () {
        Buildfire.datastore.get(TAG_NAMES.PEOPLE_INFO, function (err, result) {

          if (err && err.code !== ERROR_CODE.NOT_FOUND) {
            console.error('-----------err-------------', err);
          }
          else {
            _self.data = result.data;
            console.log("++++++++", result.data);
            if (!_self.data.content.sortBy) {
              //_self.data.content.sortBy = _self.sortingOptions[0];
            }
            $scope.$digest();
          }
          getContentItems();
        });
      };
      getContentPeopleInfo();

      // Update the Item list layout according to the change in design section

      Buildfire.datastore.onUpdate(function (event) {
        if (event && event.tag) {
          switch (event.tag) {
            case TAG_NAMES.PEOPLES:
              //update the People/Item info template in emulator
              break;
            case TAG_NAMES.PEOPLE_INFO:
              _self.data.design.itemLayout = event.obj.design.itemLayout;
              break;
          }
          $scope.$digest();
        }
      });



    }])
})(window.angular, window);