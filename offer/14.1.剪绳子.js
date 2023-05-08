// 动态规划
function cuttingRope(n) {
  if (n < 2) {
    return 0;
  }
  if (n === 2) {
    return 1;
  }
  if (n === 3) {
    return 2;
  }
  const dp = new Array(n + 1).fill(0);
  dp[1] = 1;
  dp[2] = 2;
  dp[3] = 3;
  for (let i = 4; i <= n; i++) {
    for (let j = 1; j <= i / 2; j++) {
      dp[i] = Math.max(dp[i], dp[j] * dp[i - j]);
    }
  }
  return dp[n];
}

// 贪心算法
function cuttingRope(n) {
  if (n <= 3) {
    return n - 1;
  }
  // 绳子长度为 3 的段数
  const numOfThrees = Math.floor(n / 3);
  // 剩余的绳子长度
  const remainder = n % 3;
  if (remainder === 0) {
    return Math.pow(3, numOfThrees);
  }
  if (remainder === 1) {
    return Math.pow(3, numOfThrees - 1) * 4;
  }
  return Math.pow(3, numOfThrees) * 2;
}