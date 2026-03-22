

var mergeframes = []

function mergeSplit(list1, ) {
	if (list1.length <= 1) {
		return list1
	}
	let mid_split = Math.floor(list1.length/2)
	
	let leftSide = list1.slice(0,mid_split)
	let rightSide = list1.slice(mid_split,list1.length)

	let sortedLeft = mergeSplit(leftSide)
	let sortedRight = mergeSplit(rightSide)

	mergeframes.push({})
	return mergeSort(sortedLeft, sortedRight)
}

function mergeSort(left, right) {
	
	let answer = []
	let i = 0
	let j = 0
	
	//loop until one points reaches end of the list
	while ((i < left.length) && (j < right.length)){	
		if (left[i] < right[j]) {
			answer.push(left[i])
			i ++
		}else{
			answer.push(right[j])
			j++
		}
	}

	// add the remaining items from the remaining list into answer
	answer.push(...left.slice(i,left.length))
	answer.push(...right.slice(j,right.length))
	console.log(answer)
	return answer	
}

console.log("answer "+mergeSplit([5,8,2,1,9,3,6,5,4]))
