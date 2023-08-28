function isMatch(s, p) {
  const m = s.length;
  const n = p.length;

  // 创建一个二维数组dp，用于存储匹配结果
  const dp = new Array(m + 1);
  for (let i = 0; i <= m; i++) {
    dp[i] = new Array(n + 1).fill(false);
  }

  // 空字符串和空正则表达式是匹配的
  dp[0][0] = true;

  // 处理空字符串和非空正则表达式的情况
  for (let j = 1; j <= n; j++) {
    if (p[j - 1] === '*') {
      // 如果当前字符是'*'，则可以将前面的字符和'*'一起消除，即匹配0次
      dp[0][j] = dp[0][j - 2];
    }
  }

  // 填充dp数组
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      if (s[i - 1] === p[j - 1] || p[j - 1] === '.') {
        // 如果当前字符匹配或者是通配符'.'，则取决于前面的字符是否匹配
        dp[i][j] = dp[i - 1][j - 1];
      } else if (p[j - 1] === '*') {
        // 如果当前字符是'*'，则可以将前面的字符和'*'一起消除，即匹配0次，或者匹配1次或多次
        if (s[i - 1] === p[j - 2] || p[j - 2] === '.') {
          dp[i][j] = dp[i][j - 2] || dp[i - 1][j];
        } else {
          dp[i][j] = dp[i][j - 2];
        }
      }
    }
  }

  // 返回最终的匹配结果
  return dp[m][n];
}
