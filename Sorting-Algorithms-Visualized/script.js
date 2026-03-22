var list1 = [54,2,1,57,3,2,40,90,23,67,24,99,10,11,23]

var canvasWidth = 400
var canvasHeight = 400
var avgWidth = canvasWidth/list1.length
var frames = bucketSort(list=[...list1])
 // {data_state:[1,2,5,4,3,10], leftpointer: 0, rightpointer : 5 }	
var large = 99

var frameIndex = 0
function setup() {
	// this function runs once at the inital loading on the page
	createCanvas(canvasWidth, canvasHeight, document.getElementById("myCanvas"));
	frameRate(1) // draw 1 frame per second
}


function draw() {
	//this function will continously loop until you close the browser
	//this is the draw loop

	//clear
	background(50,50,50);
	
	// console.log("current frame:", frameIndex, frames[frameIndex]["data_state"])

	// render a bunch of rectangle that reflects the value of list
	// var large = Math.max(...frames[frameIndex]["data_state"])

	for ( let i = 0; i < frames[frameIndex]["data_state"].length ; i ++){
		let indvHeight = (frames[frameIndex]["data_state"][i]/ large ) * canvasHeight
		
		strokeWeight(4);
		//rect( x,      y,  width, height)
		let c1 = color("green")
		let c4 = color("red")
		let c1fill = color("lightgreen")
		let c3 = color(255,255,255)
		let c2 = color(0,0,0)
		if (frames[frameIndex]["swap"] == false && frames[frameIndex]["left"] == i || frames[frameIndex]["right"] == i) {
			stroke(c4)
			
		}else if (frames[frameIndex]["swap"] == true && frames[frameIndex]["left"] == i || frames[frameIndex]["right"] == i){
			stroke(c1)
			fill(c1fill)
		}else if(frames[frameIndex]["select"] == i){
			stroke(c1)
		}else {
			stroke(c2)
			fill(c3)
		}
		// fill(c1)
		rect(i*avgWidth, canvasHeight-indvHeight , avgWidth, indvHeight)

		
	}

	frameIndex += 1
	if (frameIndex == frames.length){
		noLoop()
	} 
	
}