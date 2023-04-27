function numWays (n) {
  const dp = [1, 1]
  const MOD = 1000000007
  for (let i = 2; i <= n; i++) { 
    dp[i] = (dp[i - 1] + dp[i - 2]) % MOD
  }
  return dp[n]
};

function numWays(n) { 
  let p = 1, q = 1, r = 1
  const MOD = 1000000007
  for (let i = 2; i <= n; i++) { 
    r = (p + q) % MOD
    p = q
    q = r
  }
  return r
}
