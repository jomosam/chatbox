let express         =   require('express');
let path            =   require('path')
let session         =   require('express-session');
const {MongoClient} =   require('mongodb');
//let http          =   require('http');

let app             =   express();
var http            =   require('http').Server(app);
var io              =   require('socket.io')(http);



http.listen(process.env.PORT || 80,()=>{
    console.log('Server Started jj....');
})

app.get('/',(req,res)=>{
    res.sendFile(path.join(__dirname + '/chatbox.html'));
})

let counter     =   0;
io.on('connection', function(socket){
    counter =   counter+1;
    console.log(counter);
    io.emit('totalUser',counter)
    socket.on('chat message', function(msg){
        console.log('username: ' + msg.username);
        console.log('Msg: '+ msg.msg);
        io.emit('chat message',msg);
        
    });
    socket.on('typing',function(user){
        console.log(user);
        io.emit('typing',user.username)
    })
    socket.on('disconnect', function(socket){
        counter =   counter>0?counter-1:counter;
        console.log(counter);
        io.emit('totalUser',counter)
      });
  });
  