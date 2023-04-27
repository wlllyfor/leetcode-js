func numWays(n int) int {
	dp := []int{1, 1}
	const MOD = 1000000007
	for i := 2; i <= n; i++ {
		dp = append(dp, (dp[i-1]+dp[i-2])%MOD)
	}
	return dp[n]
}

func numWays(n int) int {
	p, q, r := 1, 1, 1
	const MOD = 1000000007
	for i := 2; i <= n; i++ {
		r = (p + q) % MOD
		p = q
		q = r
	}
	return r
}