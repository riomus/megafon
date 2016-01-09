'use strict';

angular.module('megafon')
  .controller('RoomCtrl', ['$scope','io','$stateParams','$state','$timeout',function ($scope,io,$stateParams,$state,$timeout) {
  	io.emit('join_room',{'roomName':$stateParams.roomName})

  io.on('room_dont_exsists',function(){
  	console.log('no room')
  	$state.go('main')
  })
  	io.on('in_room',function(data){
  		console.log(data)
		$scope.canWrite=data.canWrite
		$scope.$digest()
	});
  	$scope.text=""
  	$scope.update=function(text,fontSize){
  		io.emit('write',{text:text,fontSize:fontSize})
  	}
  	$scope.canWrite=false
  	io.on('text_update',function(data){
  		console.log('text update')
		$scope.text=data.text;
		$scope.fontSize=isNaN(parseFloat(data.fontSize))?72:data.fontSize
		$scope.$digest();
		console.log(data)
  	});
  }]);
