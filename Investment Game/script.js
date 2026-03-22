var game = true
var x = 0
var y = 250
var price = 250
let sharesList = [250,250]
var shares = 2
var money = 300
var totalCost = 500
const baseValue = (shares*price)+money
var buyAllowed = true

//import display elements
var priceDisplay = document.getElementById("price")
var moneyDisplay = document.getElementById("money")
var sharesDisplay = document.getElementById("shares")
var averageCostDisplay = document.getElementById("avgCost")
var localHsDisplay = document.getElementById("localhs")
var alertDisplay = document.getElementById("alert")
var netDisplay = document.getElementById("netgain")
var buyBtn = document.getElementById("buy")
var sellBtn = document.getElementById("sell")
function sum(arr) {
    var res = 0;
    for (var x of arr) {
        res += x;
    }
    return res;
}
function buyShare(){
  if (money >= price && game == true && buyAllowed == true) {
    flashAlert('Bought!','green')
    money = money-price
    shares = shares+1
    // totalCost = totalCost+price
    sharesList.push(price) //add share to list
    console.log("Stock bought at: $"+price)
  }
  // else {
  //   continue
  // }
}
function sellShare(){
  if (shares>0 && game == true ) {
    flashAlert('Sold!','red')
    money = money + price
    shares = shares-1
    // totalCost = totalCost-price
    sharesList.shift() //remove the first element (oldest stock)
    console.log("Stock sold at: $"+price)
  }
}

function setLocalHighscore(record) {
  document.cookie = "localhighscore="+record+"; expires=Tue, 19 Jan 2038 12:00:00 UTC; path=/";
}

function getLocalHighscore() {
  let x = document.cookie;
  x = x.replace(/[^\d.-]/g, '');
  if (x=="") {
    x = null
  }
  return x
}

function checkForRecord(money) {
  if (getLocalHighscore("localhighscore") != null) {
    if (getLocalHighscore("localhighscore") < money) {
      setLocalHighscore(money)
      flashAlert("Personal Highscore: $"+money+"!","gold") // !! replace with popup
    }else{
      flashAlert("Game Over!","gray")
    }
  }else{
    setLocalHighscore(money)
    flashAlert("Personal Highscore: $"+money+"!","gold") // !! replace with popup
  }
  
}

function getGlobalHighscore() {
  // fs.readFile('global.txt', (err, highscore) => {
  //     if (err) throw err
  //     return highscore.toString()
  // })
}
function checkAndSetGlobal(score) {
  if (score > getGlobalHighscore()) {
    
    //set global highscore
  	
  	// Write data in 'global.txt'
  	// fs.writeFile('global.txt', score, (err) => {
  	// 	// In case of a error throw err.
  	// 	if (err) throw err;
  	// })
    return true
    
  }else {
    return false
  }
      
  
}


function flashAlert(content, color){
  var alert=alertDisplay
  // if (alert.classList.contains('end')) {
  //   alert.classList.remove("end")
  //   void alert.offsetWidth
  // }  
  // alert.classList.add("play")
  alert.style.display = "none;"
  alertDisplay.style.display = "block";
  alertDisplay.style.color = color
  alertDisplay.textContent = content
  // alert.classList.remove("play")
  
  // alert.classList.add("end")
  alert.addEventListener('animationend',()=>{
    alertDisplay.style.display = "none";
  })

  
}

function doubleFunction(function1, function2) {
  function1
  function2
}


function randomNumber(min, max) {
    return Math.random() * (max - min) + min;
}
function reverseNumber(num, min, max) {
    return (max + min) - num;
}


var c = document.getElementById("game");
var ctx = c.getContext("2d");
ctx.lineWidth = 1.5;
function Invest(){
  if (x == 0 || x>=1000){ //if it is the start of the game
    ctx.moveTo(x, 250); //move to starting position
  }
  // ctx.beginPath() 
  x = x + 2 // move x by 2
  oldY = y
  y = randomNumber(y-15,y+15) //move y up and down (+- 15)
  if (y < 0) { //if y is extremly low, move up
    y = 0
  }
  if (y > 500) { //if y is extremly low, move up
    y = 500
  }
  ctx.lineTo(x, y); //move line to determined pos
  
  ctx.moveTo(x, y);

  price = reverseNumber(y,0,500) // set price
  if (price > (sum(sharesList)/sharesList.length) && shares != 0) {
    ctx.strokeStyle = "green"
  }
  else if (price < (sum(sharesList)/sharesList.length) && shares != 0) {
    ctx.strokeStyle = "red"
  }
  else {
    ctx.strokeStyle= "white"
  }
  ctx.stroke(); // create line

  //check for CHEATERS
  if (shares > sharesList.lenth) {
    alert("dont cheat bro")    
  }

  //set net gain
  var netGain = ((shares*price)+money)-baseValue
  
  //Update Values
  priceDisplay.innerHTML = "<b>📈 Stock Price:</b> $"+price.toFixed(2)
  moneyDisplay.innerHTML = "<b>💲 Money:</b> $"+money.toFixed(2)
  sharesDisplay.innerHTML = "<b>💸 Shares:</b> "+shares
  
  if (getLocalHighscore("localhighscore") != null) {
    localHsDisplay.innerHTML = "<b>🏆 Local HS:</b> $"+getLocalHighscore("localhighscore")
  }else{
    localHsDisplay.innerHTML = "<b>🏆 Local HS:</b> $---"
  }
  if (shares > 0) {
    averageCostDisplay.innerHTML = "<b>🛒Average Cost:</b> $"+(sum(sharesList)/sharesList.length).toFixed(2)
  }else{
    averageCostDisplay.innerHTML = "<b>🛒Average Cost:<b> $---"
  }

  if (netGain > 0) {
    netDisplay.innerHTML = `<b>🚀 Net Gain:</b> <span style='color: green'>⏶ $${netGain.toFixed(2)}</span>`
  }else if (netGain < 0) {
    netDisplay.innerHTML = `<b>🚀 Net Gain:</b> <span style='color: red'>⏷ $${netGain.toFixed(2)}</span>`
  }else{
    netDisplay.innerHTML = `<b>🚀 Net Gain:</b> <span style='color: black'>⏵ $${netGain.toFixed(2)}</span>`
  }

  //Disable Buttons if...
  if (price > money || game == false || buyAllowed == true) {
    buyBtn.classList.add("disabled")
  }else{
    if (buyBtn.classList.contains('disabled')) {
    buyBtn.classList.remove("disabled")
    }
  }
  if (shares == 0 || game == false) {
    sellBtn.classList.add("disabled")
  }else{
    if (sellBtn.classList.contains('disabled')) {
      sellBtn.classList.remove("disabled")
    }
  }
  if (money == 0 && shares == 0) {
    flashAlert("Bankrupt!","red")
    game = false
  }
  if (price == 0){
    flashAlert("Bankrun!","gray")
    buyAllowed = false
  }else{
    var buyAllowed = true
  }
  if (x==1000) { //end game if x =1000
    // ctx.clearRect(0, 0, c.width, c.height);
    // x = 1
    game = false
  }
  
}

function sleep(ms) { //create the sleep function
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function runGame() { //run game with the sleep function
    for (let i = 0; i < 501; i++) {
        Invest()
        await sleep(i * 1);
    }
    console.log('Done');
    game = false
    checkForRecord((money+(shares*price)-baseValue).toFixed(2))

    //TEMP  
    console.log("Local HS: "+getLocalHighscore("localhighscore"))
    console.log("Current Game Score: "+(money+(shares*price)).toFixed(2))

    if (getLocalHighscore("localhighscore") != null) {
      localHsDisplay.innerHTML = "<b>🏆 Local HS:</b> $"+getLocalHighscore("localhighscore")
    }else{
      localHsDisplay.innerHTML = "<b>🏆 Local HS:</b> $---"
    }
}

runGame();

document.addEventListener('keypress', event => { //buy share on space
  if (event.keyCode == 32) {
    buyShare()
  }
})

document.addEventListener('keypress', event => { //sell share on return
  if (event.keyCode == 13) {
    sellShare()
  }
})
