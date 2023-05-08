func cuttingRope(n int) int {
	if n < 2 {
		return 0
	}
	if n == 2 {
		return 1
	}
	if n == 3 {
		return 2
	}
	dp := make([]int, n+1)
	dp[1] = 1
	dp[2] = 2
	dp[3] = 3
	for i := 4; i <= n; i++ {
		for j := 1; j <= i/2; j++ {
			dp[i] = max(dp[i], dp[j]*dp[i-j])
		}
	}
	return dp[n]
}

func max(a, b int) int {
	if a > b {
		return a
	}
	return b
}

func cuttingRope(n int) int {
	if n <= 3 {
		return n - 1
	}
	// 绳子长度为 3 的段数
	numOfThrees := n / 3
	// 剩余的绳子长度
	remainder := n % 3
	if remainder == 0 {
		return int(math.Pow(3, float64(numOfThrees)))
	}
	if remainder == 1 {
		return int(math.Pow(3, float64(numOfThrees-1))) * 4
	}
	return int(math.Pow(3, float64(numOfThrees))) * 2
}