const express = require("express");
const { createServer } = require("http");
const app = express();
const server = createServer(app);
const pwsecret = process.env['mongopw']
const mongo = require("mongoose")

const url = "mongodb+srv://adrian:"+pwsecret+"@rockpaperscissors.q1iotus.mongodb.net/?retryWrites=true&w=majority"

const options = {
  dbName: "rps",
}

mongo.connect(url, options)

const gameSchema = new mongo.Schema({

  outcome: String,
  playerScore: Number,
  computerScore: Number,
  playerMoves: String,
  Date: {type:Date, default: Date.now}
})
const gameModel = new mongo.model("games", gameSchema, "games")


async function querywinlose(){
	var loses  = await gameModel.find({}).where("outcome").equals("player")
	var wins = await gameModel.find({}).where("outcome").equals("computer")
	var percent = Math.round( wins.length/ ( wins.length + loses.length) * 100)
	return ([wins.length, loses.length, percent ])
}

async function querymoves(){
	var moves  = await gameModel.find({})
  //number of moves
  var rc = 0
  var pc = 0
  var sc = 0
  for (let i = 0; i < moves.length; i++) {
    var c = moves[i].playerMoves
    for (let j = 0; j < c.length; j++) {
      if (c[i] == "R") {
        rc ++
      }
      if (c[i] == "P") {
        pc ++
      }else {
        sc ++
      }
    }
  }

  moves = [rc,pc,sc]
  return moves
	
}

//setup to use ejs
app.set("view engine", "ejs")

// middle wares 
app.use(express.static("public"))

app.use(express.json())

app.get("/home",homepage)
app.post("/uploadgame", savegame)
app.get("/data",async(req,res)=>{
	
 	var result = await querywinlose()
	var winscount = result[0]
	var losescount = result[1]
	var percent = result[2]
  var moves = await querymoves()
  var rock_moves = moves[0]
  var paper_moves = moves[1]
  var scissors_moves = moves[2]

	res.render("data",{piechartdata:[winscount, losescount], percent:percent,barchartdata:[rock_moves,paper_moves,scissors_moves]})
})



function homepage(req,res) {
  res.sendFile(__dirname +"/public/index.html")
}

function savegame(req,res) {
  console.log(req.body)

	var game = new gameModel( req.body )
	
	game.save() // save the document into mongoDB
	
	res.end()
}

server.listen(3000)
