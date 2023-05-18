func exchange(nums []int) []int {
	arr := make([]int, 0, len(nums))
	for _, num := range nums {
		if num%2 == 1 {
			arr = append([]int{num}, arr...)
		} else {
			arr = append(arr, num)
		}
	}
	return arr
}

func exchange(nums []int) []int {
	left := 0
	right := len(nums) - 1

	for left < right {
		// 判断左边是否为奇数，如果是，就跳过
		if nums[left]&1 != 0 {
			left++
			continue
		}
		// 判断右边是否为偶数，如果是，就跳过
		if nums[right]&1 != 1 {
			right--
			continue
		}
		// 交换
		nums[left], nums[right] = nums[right], nums[left]
		left++
		right--
	}

	return nums
}

func exchange(nums []int) []int {
	low := 0
	fast := 0

	for fast < len(nums) {
		// 快指针为奇数，就和慢指针交换位置
		if nums[fast]&1 == 1 {
			nums[low], nums[fast] = nums[fast], nums[low]
			low++
		}
		fast++
	}

	return nums
}