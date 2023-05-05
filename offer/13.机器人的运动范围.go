func movingCount(m int, n int, k int) int {
	// 定义一个二维数组，用于标记格子是否被访问过
	visited := make([][]bool, m)
	for i := 0; i < m; i++ {
		visited[i] = make([]bool, n)
	}

	// 定义一个函数，用于计算一个数的数位之和
	getSum := func(num int) int {
		sum := 0
		for num > 0 {
			sum += num % 10
			num /= 10
		}
		return sum
	}

	// 定义一个函数，用于搜索格子
	var dfs func(i, j int) int
	dfs = func(i, j int) int {
		// 如果格子越界或者数位之和大于k或者已经访问过，直接返回
		if i < 0 || i >= m || j < 0 || j >= n || getSum(i)+getSum(j) > k || visited[i][j] {
			return 0
		}
		// 标记格子为已访问
		visited[i][j] = true
		// 继续向四个方向进行搜索，并累加已访问的格子数
		return 1 + dfs(i-1, j) + dfs(i+1, j) + dfs(i, j-1) + dfs(i, j+1)
	}

	// 从起点开始搜索
	return dfs(0, 0)
}

func movingCount(m int, n int, k int) int {
	// 定义一个二维数组，用于标记格子是否被访问过
	visited := make([][]bool, m)
	for i := 0; i < m; i++ {
		visited[i] = make([]bool, n)
	}

	// 定义一个函数，用于计算一个数的数位之和
	getSum := func(num int) int {
		sum := 0
		for num > 0 {
			sum += num % 10
			num /= 10
		}
		return sum
	}

	// 定义一个队列，用于存储待访问的格子
	queue := [][]int{{0, 0}}
	// 定义一个变量，用于记录已访问的格子数
	count := 0

	// 开始搜索
	for len(queue) > 0 {
		// 取出队列中的第一个格子
		i, j := queue[0][0], queue[0][1]
		queue = queue[1:]
		// 如果格子越界或者数位之和大于k或者已经访问过，直接跳过
		if i < 0 || i >= m || j < 0 || j >= n || getSum(i)+getSum(j) > k || visited[i][j] {
			continue
		}
		// 标记格子为已访问
		visited[i][j] = true
		// 统计已访问的格子数
		count++
		// 将当前格子的四个相邻格子加入队列中
		queue = append(queue, []int{i - 1, j}, []int{i + 1, j}, []int{i, j - 1}, []int{i, j + 1})
	}

	// 返回已访问的格子数
	return count
}