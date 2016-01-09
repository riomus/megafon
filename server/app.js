/**
 * Main application file
 */

 'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var config = require('./config/environment');
// Setup server
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
require('./config/express')(app);
require('./routes')(app);

// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});


var states={};
var rooms={};

io.on('connection',function(socket){
  var room=false;
  var canWrite=false;
  socket.on('create_room',function(data){
    if(!rooms[data.roomName]){
      room=data
      rooms[data.roomName]=data
      states[data.roomName]=1
      canWrite=true
      socket.join(data.roomName)
      socket.emit('in_room',{roomName:data.roomName,canWrite:true})
    }else{
      socket.emit('room_exsists')
    }
  });
  socket.on('join_room',function(data){
    if(!room||room.roomName!==data.roomName){
      if(rooms[data.roomName]){
        room=rooms[data.roomName]
        states[data.roomName]=states[data.roomName]+1
        socket.join(data.roomName)
        if(data.password&&data.password===room.password){
          canWrite=true
          socket.emit('in_room',{roomName:data.roomName,canWrite:true})
        }else{
          canWrite=false
          socket.emit('in_room',{roomName:data.roomName,canWrite:false})
        }
      }else{
        socket.emit('room_dont_exsists','error')
      }
    }
    else{
      socket.emit('in_room',{'roomName':data.roomName,'canWrite':canWrite===true})
    }
  });
  socket.on('write',function(data){
    if(canWrite){
      io.to(room.roomName).emit('text_update',data)
    }
  });
  socket.on('disconnect',function(){
    canWrite=false
    if(room){
      states[room.roomName]=states[room.roomName]-1
      if(!states[room.roomName]){
        rooms[room.roomName]=false
      }
      room=false

    }
  });
  socket.on('left',function(){
    canWrite=false
    if(room){
      states[room.roomName]=states[room.roomName]-1
      if(!states[room.roomName]){
        rooms[room.roomName]=false
      }
      room=false

    }
  });

});

// Expose app
exports = module.exports = app;
