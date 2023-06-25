function translateNum(num) {
  const str = num.toString();
  const n = str.length;
  const dp = new Array(n + 1).fill(0);
  dp[0] = 1;
  dp[1] = 1;
  for (let i = 2; i <= n; i++) {
    const last = Number(str[i - 1]);
    const prev = Number(str[i - 2]);
    const num = prev * 10 + last;
    if (num >= 10 && num <= 25) {
      dp[i] = dp[i - 1] + dp[i - 2];
    } else {
      dp[i] = dp[i - 1];
    }
  }
  return dp[n];
}