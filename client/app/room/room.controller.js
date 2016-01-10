'use strict';

angular.module('megafon')
.controller('RoomCtrl', ['$scope','io','$stateParams','$state',function ($scope,io,$stateParams,$state) {
  io.on('connect',function(){
     io.emit('join_room',{'roomName':$stateParams.roomName});
  });
 io.emit('join_room',{'roomName':$stateParams.roomName});

 io.on('room_dont_exsists',function(){
   $state.go('main');
 });
 io.on('in_room',function(data){
  if(data.text){
    $scope.text=data.text.text;
    $scope.fontSize=isNaN(parseFloat(data.text.fontSize))?72:data.text.fontSize;
  }
  $scope.canWrite=data.canWrite;
  $scope.$digest();
});
 $scope.text='';
 $scope.update=function(text,fontSize){
  io.emit('write',{text:text,fontSize:fontSize});
};
$scope.canWrite=false;
io.on('text_update',function(data){
  $scope.text=data.text;
  $scope.fontSize=isNaN(parseFloat(data.fontSize))?72:data.fontSize;
  $scope.$digest();
});
}]);
