'use strict';

angular.module('megafon')
  .controller('RoomCtrl', ['$scope','io','$stateParams','$state',function ($scope,io,$stateParams,$state) {
  	io.emit('join_room',{'roomName':$stateParams.roomName});

  io.on('room_dont_exsists',function(){
  	$state.go('main');
  });
  	io.on('in_room',function(data){
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
