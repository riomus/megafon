"use strict";angular.module("megafon",["ngCookies","ngResource","ngSanitize","ngAnimate","ui.router","ui.bootstrap"]).config(["$stateProvider","$urlRouterProvider","$locationProvider",function(a,b,c){b.otherwise("/"),c.html5Mode(!0)}]),angular.module("megafon").factory("io",["$window",function(a){return this.socket=new a.io,this.socket}]),angular.module("megafon").controller("MainCtrl",["$scope","io","$state",function(a,b,c){b.emit("left"),a.create=function(a,c){var d={roomName:a,password:c};b.emit("create_room",d)},a.join=function(a,c){b.emit("join_room",{roomName:a,password:c})},b.on("in_room",function(a){c.go("room",{roomName:a.roomName})})}]),angular.module("megafon").config(["$stateProvider",function(a){a.state("main",{url:"/",templateUrl:"app/main/main.html",controller:"MainCtrl"})}]),angular.module("megafon").controller("RoomCtrl",["$scope","io","$stateParams","$state",function(a,b,c,d){b.emit("join_room",{roomName:c.roomName}),b.on("room_dont_exsists",function(){d.go("main")}),b.on("in_room",function(b){a.canWrite=b.canWrite,a.$digest()}),a.text="",a.update=function(a,c){b.emit("write",{text:a,fontSize:c})},a.canWrite=!1,b.on("text_update",function(b){a.text=b.text,a.fontSize=isNaN(parseFloat(b.fontSize))?72:b.fontSize,a.$digest()})}]),angular.module("megafon").config(["$stateProvider",function(a){a.state("room",{url:"/r/:roomName",templateUrl:"app/room/room.html",controller:"RoomCtrl"})}]),angular.module("pejntApp").run(["$templateCache",function(a){a.put("app/main/main.html",'<div class=container><div class=jumbotron><uib-tabset type=tabs justified=true><uib-tab heading=Create><form class=form-horizontal><div class=form-group><label for=inputEmail3 class="col-sm-2 control-label">Room name</label><div class=col-sm-10><input required class=form-control ng-model=roomName placeholder="Room name"></div></div><div class=form-group><label for=inputPassword3 class="col-sm-2 control-label">Password</label><div class=col-sm-10><input required class=form-control ng-model=password placeholder=Password></div></div><div class=form-group><div class="col-sm-offset-2 col-sm-10"><button type=submit class="btn btn-default" ng-click=create(roomName,password)>Create</button> <button type=submit class="btn btn-default" ng-click=join(roomName,password)>Join as editor</button></div></div></form></uib-tab><uib-tab heading=Join><form class=form-horizontal><div class=form-group><label for=inputEmail3 class="col-sm-2 control-label">Room name</label><div class=col-sm-10><input class=form-control id=inputName ng-model=nameJoin placeholder="Room name"></div></div><div class=form-group><div class="col-sm-offset-2 col-sm-10"><button type=submit class="btn btn-default" ng-click=join(nameJoin)>Join</button></div></div></form></uib-tab></uib-tabset></div></div>'),a.put("app/room/room.html",'<div class=board><h1 style=font-size:{{fontSize}}px>{{text}}</h1><div class=editor ng-if=canWrite><form><div class=col-sm-10><textarea name=text id=text class=form-control id=text ng-model=newText placeholder=Text></textarea></div><div class=col-sm-1><textarea name=text id=text class=form-control id=text ng-model=fontSize placeholder="Font size"></textarea></div><div class=col-sm-1><button type=submit class="btn btn-default" ng-click=update(newText,fontSize)>Update</button></div></form></div></div>')}]);