function dicesProbability(n) {
  const dp = [];
  const total = Math.pow(6, n);
  for (let i = 1; i <= n; i++) {
    dp[i] = [];
    for (let j = i; j <= 6 * i; j++) {
      if (i === 1) {
        dp[i][j] = 1;
      } else {
        dp[i][j] = 0;
        for (let k = 1; k <= 6; k++) {
          if (j - k >= i - 1 && j - k <= 6 * (i - 1)) {
            dp[i][j] += dp[i - 1][j - k];
          }
        }
      }
    }
  }
  const res = [];
  for (let i = n; i <= 6 * n; i++) {
    res.push(dp[n][i] / total);
  }
  return res;
}