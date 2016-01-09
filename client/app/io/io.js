'use strict';
angular.module('megafon').factory('io',['$window', function($window) {
  this.socket= new $window.io();
  return  this.socket;
}]);
