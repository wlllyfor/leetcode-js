func minArray(numbers []int) int {
	left := 0
	right := len(numbers) - 1
	for numbers[left] >= numbers[right] && left < right {
		left++
	}
	return numbers[left]
}

