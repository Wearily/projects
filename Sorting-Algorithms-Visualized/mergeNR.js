function mergeSort(arr) {
	var frames = []
	let n = arr.length;

	// Create a temporary array to store the merged subarrays
	let temp = new Array(n);

	// Iterate over subarray sizes in powers of 2
	for (let size = 1; size < n; size *= 2) {
		for (let left = 0; left < n - size; left += 2 * size) {
			let mid = Math.min(left + size - 1, n - 1);
			let right = Math.min(left + 2 * size - 1, n - 1);
			merge(arr, left, mid, right, temp, frames);
		}
	}

	return frames;
}

function merge(arr, left, mid, right, temp,frames) {
	let i = left;
	let j = mid + 1;
	let k = left;

	// Merge the two subarrays into the temporary array
	while (i <= mid && j <= right) {
		if (arr[i] <= arr[j]) {
			temp[k++] = arr[i++];
			frames.push(	{"left": i, "right": j})

			
		} else {
			temp[k++] = arr[j++];
			frames.push(	{ "left": i, "right": j})

		}
	}

	// Copy any remaining elements from the left subarray
	while (i <= mid) {
		temp[k++] = arr[i++];
		frames.push(	{ "left": i, "right": j})
	}

	// Copy any remaining elements from the right subarray
	while (j <= right) {
		temp[k++] = arr[j++];
		frames.push(	{ "left": i, "right": j})
	}

	// Copy the merged elements back into the original array
	for (let p = left; p <= right; p++) {
		arr[p] = temp[p];
		frames.push(	{ "data_state": [...arr], "left": p})
	}
}


// console.log("answer "+))
