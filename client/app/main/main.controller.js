'use strict';

angular.module('megafon')
.controller('MainCtrl', ['$scope','io','$state','$interval','$http',function ($scope,io,$state,$interval,$http) {
	io.emit('left');
	$interval(function(){
		$http.get('/state?'+Math.random());
	},10000);
	$scope.create=function(name,pass){
		io.emit('create_room',{roomName:name,password:pass});
	};
	$scope.join=function(name,pass){
		io.emit('join_room',{roomName:name,password:pass});
	};
	io.on('in_room',function(data){
		$state.go('room',{roomName:data.roomName});
	});
}]);

