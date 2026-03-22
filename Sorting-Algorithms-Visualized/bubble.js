/*
var frames = [
	{ "data_state": [1,2,5,4,3,10], "left": 0, "right": 1, "swap": false },
	{ "data_state": [1,2,5,4,3,10], "left": 1, "right": 2, "swap": false },	
	{ "data_state": [1,2,4,5,3,10], "left": 2, "right": 3, "swap": true },	
]
 */





function bubble(list) {
	let frames = []
  
	n = list.length
	looped = true
	while (looped == true) {
		
		
		looped = false
	  for (let i = 0; i < n - 1 ; i++) {
			let cframe = {"data_state": [...list], "left":i, "right":i+1, "swap": false }
			frames.push(cframe)		
			if (list[i] > list[i+1] ) {
				[ list[i+1], list[i] ]= [list[i], list[i+1]]
				looped = true
				let cframe = {"data_state": [...list], "left":i, "right":i+1, "swap": true }
				frames.push(cframe)
			}
			
		}
	}
	
	return frames
} 

// let test = [ ]
// for ( let i =0; i < 1000 ; i ++){
// 	test.push(Math.floor( Math.random()*1000) )
// }

// console.log(test)
// let start_time = new Date()
// let ans = bubble(test) 
// let end_time = new Date() // log current system time

// // dunder method in python 
// let time = end_time - start_time 
// console.log(time) // time in ms seconds





// var i = 0

// while ( i < 3){
// 	console.log("log")
// 	i ++
// }