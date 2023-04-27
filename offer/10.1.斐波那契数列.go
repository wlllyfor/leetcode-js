func fib(n int) int {
	dp := []int{0, 1}
	const MOD = 1000000007
	for i := 2; i <= n; i++ {
		dp = append(dp, (dp[i-1]+dp[i-2])%MOD)
	}
	return dp[n]
}

func fib(n int) int {
	// n 小于等于 1 时，不需要定义变量，直接返回
	if n <= 1 {
		return n
	}
	// 初始值 p 为 0，q 为 1
	p, q, r := 0, 1, 0
	const MOD = 1000000007
	for i := 2; i <= n; i++ {
		// 对应到递推公式：F(n) = F(n - 1) + F(n - 2)
		r = (p + q) % MOD
		p = q
		q = r
	}
	return r
}