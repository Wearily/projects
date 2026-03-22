

/**
 *
 * function createZeroList(length) {
  return Array(length).fill(0);
}

// Example usage:
	const zeroList = createZeroList(5); // Creates an array [0, 0, 0, 0, 0]
	console.log(zeroList);
 */

function bucketSort(list){
	console.log("running bucketSort")
	let frames = []  // {   }

	let occur = Array(Math.max(...list)+1).fill(0) /* Math.max*/
  
	for (let i = 0; i < list1.length; i++) {
		let cframe = {"data_state": [...list], "select":i }
		frames.push(cframe)
		occur[list[i]] ++
	}

	let index = 0 //track where i should put the next element 
	for (let i = 0; i < occur.length; i++) {
		for (let j =0 ; j < occur[i]; j ++){

			list[index] = i
			index ++
			let cframe = {"data_state": [...list], "select":index }
			frames.push(cframe)
		}
	}

	return frames
}

// console.log( bucketSort())