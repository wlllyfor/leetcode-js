func exist(board [][]byte, word string) bool {
	// 处理边缘情况
	if len(board) == 0 {
		return false
	}
	if len(word) == 0 {
		return true
	}

	// 定义行和列
	row, col := len(board), len(board[0])

	// 查找的逻辑，用一个 find 函数封装
	var find func(i, j, cur int) bool
	find = func(i, j, cur int) bool {
		// 越界逻辑
		if i < 0 || i >= row || j < 0 || j >= col {
			return false
		}
		// 用一个变量 letter 记录找过的字符
		letter := board[i][j]
		// 没找到的情况返回 false
		if letter != word[cur] {
			return false
		}
		// 全部都找到了返回 true
		if len(word)-1 == cur {
			return true
		}
		// 查找过程中，当前查找项置为 null
		board[i][j] = ' '
		// 上下左右查找
		res := find(i+1, j, cur+1) ||
			find(i-1, j, cur+1) ||
			find(i, j+1, cur+1) ||
			find(i, j-1, cur+1)
		// 回退
		board[i][j] = letter
		return res
	}

	// 两层循环查找
	for i := 0; i < row; i++ {
		for j := 0; j < col; j++ {
			if find(i, j, 0) {
				return true
			}
		}
	}
	return false
}