const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, { /* options */ });


app.set("view engine", "ejs") //tell server that we are using the ejs rendering engine

users = {
  // "id": { "username":"Adrian","room":"room1"}
}

function getRoomName(){
  var room  = []
  for(userid in users){
    if (!room.includes(users[userid]["room"])){
      room.unshift(users[userid]["room"])
    }
  }
  return room
}

function getRoom(roomname){
  var allusers = []
  for (id in users){
    if (users[id]["room"] == roomname) {
      allusers.push(users[id]["username"])
    }
  }
  return allusers
}
// this function defines what happens whenever a client is connected to the server
io.on("connection", (socket) => {
  getRoom("a")
	console.log(socket.id)
	
  //send message
  socket.on("send", (data,room)=>{
		console.log("I GOT A MSG FROM USER!")
    io.to(users[socket.id]["room"]).emit("broadcast",data,socket.id,users[socket.id]["username"])
    
    // io.emit() sends a message to all clients on the server
  })
  //register
  socket.on("register", (username, roomname)=>{
    socket.join(roomname)
    console.log("running register...", username,roomname)
		let newuser = { }
    newuser["username"] = username
    newuser["room"] = roomname
    users[socket.id] = newuser
		
    console.log(users)

    io.to(roomname).emit("getUser", getRoom(roomname))
    
  })

  socket.on("disconnect" , () =>{
    console.log(users[socket.id]["username"] + " left the chat")
    let rm = users[socket.id]["room"]
    delete users[socket.id] // removes the socket id from the dictionary ):
    io.to(rm).emit("getUser", getRoom(rm))
  })
});

// server for static files
app.get("/", joinpage)
app.get("/chat", chatpage)
app.get("/join", joinpage)
app.use(express.static('public'))

function chatpage(req,res){
  console.log(req.query.roomname)
  res.sendFile(__dirname+"/public/index.html")
}
function joinpage(req,res){
  res.render("join.ejs",{data:getRoomName()})
}

httpServer.listen(3000);