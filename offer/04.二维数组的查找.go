func findNumberIn2DArray(matrix [][]int, target int) bool {
	m := len(matrix)
	if m == 0 {
		return false
	}
	n := len(matrix[0])
	for i := 0; i < m; i++ {
		for j := 0; j < n; j++ {
			if matrix[i][j] == target {
				return true
			}
		}
	}

	return false
}

func findNumberIn2DArray(matrix [][]int, target int) bool {
	m := len(matrix)
	// 与 js 不同，矩阵第一行为空要额外处理一下，不然会出现 index out of range 的运行时错误
	if m == 0 || len(matrix[0]) == 0 {
		return false
	}
	n := len(matrix[0])
	for i := 0; i < m && matrix[i][0] <= target; i++ {
		// 如果当前行最后一个值都比 target 小，直接跳到下一行
		if matrix[i][n-1] < target {
			continue
		}
		// 二分查找
		left, right := 0, n-1
		for left <= right {
			mid := (left + right) / 2
			if matrix[i][mid] == target {
				return true
			} else if matrix[i][mid] < target {
				left = mid + 1
			} else {
				right = mid - 1
			}
		}
	}
	return false
}

func findNumberIn2DArray(matrix [][]int, target int) bool {
	// 避免数据为空报错的判断
	if len(matrix) == 0 || len(matrix[0]) == 0 {
		return false
	}
	m := 0
	n := len(matrix[0]) - 1
	for m < len(matrix) && n >= 0 {
		if matrix[m][n] == target {
			return true
		} else if matrix[m][n] > target {
			n--
		} else if matrix[m][n] < target {
			m++
		}
	}
	return false
}