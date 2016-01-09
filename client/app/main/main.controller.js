'use strict';

angular.module('megafon')
.controller('MainCtrl', ['$scope','io','$state',function ($scope,io,$state) {
	io.emit('left')
	$scope.create=function(name,pass){
		var out={roomName:name,password:pass}
		io.emit('create_room',out);
	};
	$scope.join=function(name,pass){
		io.emit('join_room',{roomName:name,password:pass});
	};
	io.on('in_room',function(data){
		console.log(data)
		$state.go('room',{roomName:data.roomName});
	});
}]);

