'use strict';

angular.module('megafon')
  .config(function ($stateProvider) {
    $stateProvider
      .state('room', {
        url: '/r/:roomName',
        templateUrl: 'app/room/room.html',
        controller: 'RoomCtrl'
      });
  });