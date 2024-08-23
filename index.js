const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require("socket.io")(server, {
  
  cors: {
    origin: ['http://127.0.0.1:5500'],
    credentials: true
  }
});

const path = require("path")


app.set("view engine" , "ejs")
app.use(express.static(path.join(__dirname , "public")));

const users = {};

io.on('connection', socket => {

  socket.on('new-user-joined', name => {
    console.log("new-user", name);

    users[socket.id] = name;
    socket.broadcast.emit('user-joined', name)
  });

  socket.on('send', message => {
    
    socket.broadcast.emit('receive', { message: message, name: users[socket.id] })
  });

  socket.on('disconnect', message => {
    
    socket.broadcast.emit('leave', users[socket.id] );
    delete users[socket.id];
  });
  
});

app.get("/", function(req,res){
  res.render("index")
})







server.listen(5500, () => {
  console.log('Server is running on port 5500');
});