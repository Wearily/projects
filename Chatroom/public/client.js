const socket = io()

var chatbox = document.getElementById("chat-box")
var users = document.getElementById("users")
var sendbtn = document.getElementById("send")
var input = document.getElementById("input")
var form = document.getElementById("form")
var formN = document.getElementById("formN")
var roomInput = document.getElementById("room")
var usermodali = document.getElementById("modalInput")
var usermodalb = document.getElementById("submitModal")
var modal = document.getElementById("myModal");


var roomname = Qs.parse(location.search, {ignoreQueryPrefix:true}).roomname
document.getElementById("roomnamedisplay").innerHTML = roomname
console.log("Roomname:",roomname)
document.getElementsByClassName("title")[0].innerHTML = roomname + " | Chat"

form.addEventListener("submit", (e)=>{
	e.preventDefault()
  var data = input.value
  if (data == null || data ==""){
    return
  }else{
    socket.emit("send", data)
    input.value = ""
		console.log("SENT!")
  }
})
formN.addEventListener("submit", (a)=>{
		a.preventDefault()
    //getname
    name = usermodali.value
    console.log("roomname is registering:",roomname)
    //close modal
    modal.style.display = "none";
    //send name
    document.getElementById("input").focus();
    if (name == null || name == "" || name == "null") {
    	socket.emit("register","<i>Anonymous</i>",roomname)

    }else{
  		socket.emit("register",name,roomname)
      
    }
});
socket.on("connect",()=>{
  
  //show modal
  modal.style.display = "block";
  //focus text
  usermodali.focus();
  //list for submit 
  
  
  
  //broadcast
  socket.on("broadcast", (data,id,username)=>{
		console.log("I GOT MSG FROM SERVER!")
    var text = document.createElement("p")
    if (id==socket.id){
      text.className =  "msg out"
    }else{
      text.className = "msg in"
    }
    text.innerHTML = "<b>"+username+"</b>" + ": " + data
    chatbox.prepend(text)
  })

  socket.on("getUser", (allusers)=>{
    console.log("getting users:",allusers)
    users.innerHTML = '<h2>Users: </h2>'
    for (user of allusers){
      let name = document.createElement("p")
      name.innerHTML = user
      name.style = "margin-left: 10px;"
      users.appendChild(name)
    }
  })
})

