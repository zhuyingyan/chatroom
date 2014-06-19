var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var userArray = [],obnj = {},objs;

app.get('/',function(req,res){
  res.sendfile('./views/index.html');  
});

http.listen(3000,function(){
  console.log('listening on *:3000');
});


io.on('connection',function(socket){
  var client = {name:""};
  socket.on('haduse',function(name){
    obnj.arr = userArray;
    objs = JSON.stringify(obnj);
    io.emit('logwho',objs);
  });
  socket.on('login',function(name){
    userArray.push(name);
    client.name = name;
    io.emit('loginSe',name);
  });
  socket.on('chatmessage',function(msg){
    io.emit('chatmessageserver',msg);
  });
  socket.on('disconnect',function(msg){
    io.emit('wholeave',client.name);
    var i,len = userArray.length;
    for(i = 0;i < len;i++){
      if(client.name==userArray[i]){
        break;
      }
    }
    if(i<len){
      userArray.splice(i,1);
    }
  });  
});
