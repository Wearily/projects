console.log("Server is loaded")


var gameOutcome = null
var playerMoves = ""
var rockBtn = document.getElementById("rock")
var paperBtn = document.getElementById("paper")
var scissorsBtn = document.getElementById("scissors")
var playerdisplay = document.getElementById("player")
var computerdisplay = document.getElementById("computer")
var outcomedisplay = document.getElementById("outcome")
var firstTodisplay = document.getElementById("firstToDisplay")
var firstTo = document.getElementById("firstTo")

var pscore = document.getElementById("pscore")
var cscore = document.getElementById("cscore")

var computerWins = 0
var playerWins = 0

var player_prev = null

var hist = {
  "Rock" : {"Rock":1,"Paper":1,"Scissors":1},
  "Paper" : {"Rock":1,"Paper":1,"Scissors":1},
  "Scissors" : {"Rock":1,"Paper":1,"Scissors":1}
}
console.log(hist)

function sendGameData() {
  let options = {
  method: "POST",
  headers: {
    "Content-Type":"application/json"
  },
  body: JSON.stringify ({
         playerScore:  playerWins, 
         computerScore: computerWins, 
         outcome: gameOutcome, 
         playerMoves: playerMoves})
  }
  fetch("/uploadgame", options)
	console.log("game info sent!")
}

function changeSlider() {
  firstTodisplay.textContent = firstTo.value
}
function resetGame() {
  firstTo.disabled = false
  hist = {
    "Rock" : {"Rock":1,"Paper":1,"Scissors":1},
    "Paper" : {"Rock":1,"Paper":1,"Scissors":1},
    "Scissors" : {"Rock":1,"Paper":1,"Scissors":1}
  }
  computerWins = 0
  playerWins = 0
  pscore.textContent = playerWins
  cscore.textContent = computerWins
  gameOutcome = null
  playerMoves = ""	
}
//e is the event parameter from the button click
function playGame(e){
  firstTo.disabled = true

  console.log("Game is starting!")
  console.log("The winning:", firstTo.value)
  //get player's move
  let pmove = e.target.value
  let cmove = getAImove(player_prev)
  playerMoves += pmove[0]
	console.log("player chose:", pmove)
  
  //display moves
  playerdisplay.style.backgroundImage = `url(/assets/${e.target.id.toLowerCase()}.png)`
  computerdisplay.style.backgroundImage = `url(/assets/${cmove.toLowerCase()}.png)`
  computerdisplay.style.transform = "scaleX(-1)"

	//check for round outcome
	if (cmove == pmove) {
    outcome = "tie" //tie
  }
  else if (cmove == "Rock" && pmove == "Paper") {
    outcome = "player"
  }
  else if (cmove == "Paper" && pmove == "Scissors") {
    outcome = "player"
  }
  else if (cmove == "Scissors" && pmove == "Rock") {
    outcome = "player"
  }else{
		outcome = "computer"
	}
  
  //save game result
  if (outcome=="player") {
    playerWins += 1
  }
  else if (outcome == "computer"){
    computerWins += 1
  }

  //display wins
  pscore.textContent = playerWins
  cscore.textContent = computerWins

  //display outcome of each round
  outcomedisplay.textContent = outcome

  //check for win
  if (computerWins == firstTo.value) {
    pscore.textContent = playerWins
    cscore.textContent = computerWins
    gameOutcome = "computer"
    sendGameData()
    alert("Computer Wins!")
    
    //reset stats
		resetGame()	


  }
  else if (playerWins == firstTo.value) {
    pscore.textContent = playerWins
    cscore.textContent = computerWins
    gameOutcome = "player"
		sendGameData()
		
    alert("Player Wins!")
    //reset stats
		resetGame()
		
  }
  
  //save hist
  if (player_prev != null) {
    hist[player_prev][pmove] += 1
  }
	
  player_prev = pmove //remember player's last move
	console.log(hist)

}

function getAImove(player_prev){
  if (player_prev == null) {
    let fr = Math.floor(Math.random()*3) //0-2
    return ["Rock","Paper","Scissors"][fr]
  }
  let total_chance = hist[player_prev]["Rock"] + hist[player_prev]["Paper"] + hist[player_prev]["Scissors"]
  let rock_chance = Math.round(hist[player_prev]["Rock"] / total_chance *100) // 1 - 100
  let paper_chance = Math.round(hist[player_prev]["Paper"] / total_chance *100) //33
  let scissors_chance = Math.round(hist[player_prev]["Scissors"] / total_chance *100) //33
	console.log("rock:",rock_chance)
	console.log("paper:",paper_chance)
	console.log("scissors:",scissors_chance)
	
  var r = Math.floor(Math.random()*100)+1 // 1- 100
  var chance = 100

	console.log("r is:",r)	
  console.log("Computer's choice is...")
	// 100 <= r > 75
	console.log("number range to select p:", chance, "-", chance-rock_chance)
	
	// 99 - 18
  if ((chance >= r) && (r > (chance - rock_chance))) {
    console.log("Paper")
    return "Paper"
  }
  chance-=rock_chance// 75
	console.log("number range to select s:", chance, "-", chance-paper_chance)
	
 if ((chance >= r) && (r > (chance - paper_chance)) ) {
    console.log("Scissors")
    return "Scissors"
  }
  chance-=paper_chance
	console.log("number range to select r:", chance, "-", chance-scissors_chance)
	
  if ((chance >= r) && (r > (chance - scissors_chance))) {
    console.log("Rock")
    return "Rock"
  }

}



rockBtn.addEventListener("click", playGame)
paperBtn.addEventListener("click", playGame)
scissorsBtn.addEventListener("click", playGame)