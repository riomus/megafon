'use strict';
angular.module('megafon').factory('io',['$window','$interval', function($window,$interval) {
  var socket= new $window.io();
  $interval(function(){
  	socket.emit('bump');
  },30000);
  return  socket;
}]);
