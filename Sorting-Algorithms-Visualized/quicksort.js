// def sort(array):
// """Sort the array by using quicksort."""

// less = []
// equal = []
// greater = []

// if len(array) > 1:
// 		pivot = array[0] # pick first item as pivot
// 		for x in array:
// 				if x < pivot:
// 						less.append(x)
// 				elif x == pivot:
// 						equal.append(x)
// 				elif x > pivot:
// 						greater.append(x)
// 		# Don't forget to return something!

// 		return sort(less)+equal+sort(greater)  # Just use the + operator to join lists

// # Note that you want equal ^^^^^ not pivot
// else:  # You need to handle the part at the end of the recursion - when you only have one element in your array, just return the array.
// 		return array 

var textnums  = [6,2,1,3,5,4]

function quickSort(array) {
	var less = []
	var equal = []
	var greater = []

	if (array.length > 1) {
		var pivot = array[array.length-1]
		for (let x of array) {
			if (x < pivot) {
				less.push(x)
			}
			else if (x==pivot) {
				equal.push(x)
			}
			else if (x>pivot) {
				greater.push(x)
			}	
		}
		
		return quickSort(less) + equal + quickSort(greater)
		
	}else{
		return array
	}
}

// we'll animate this next time
console.log("quick sort: "+quickSort(textnums))