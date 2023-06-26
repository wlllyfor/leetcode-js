function maxValue(grid) {
  if (!grid || grid.length === 0 || grid[0].length === 0) {
    return 0;
  }

  const rows = grid.length;
  const cols = grid[0].length;
  const dp = new Array(rows).fill(0).map(() => new Array(cols).fill(0));

  dp[0][0] = grid[0][0];

  // 初始化第一行和第一列
  for (let i = 1; i < rows; i++) {
    dp[i][0] = dp[i-1][0] + grid[i][0];
  }
  for (let j = 1; j < cols; j++) {
    dp[0][j] = dp[0][j-1] + grid[0][j];
  }

  // 逐行逐列计算最大价值
  for (let i = 1; i < rows; i++) {
    for (let j = 1; j < cols; j++) {
      dp[i][j] = Math.max(dp[i-1][j], dp[i][j-1]) + grid[i][j];
    }
  }

  return dp[rows-1][cols-1];
}

function maxValue(grid) {
  if (!grid || grid.length === 0 || grid[0].length === 0) {
    return 0;
  }

  const rows = grid.length;
  const cols = grid[0].length;
  const dp = new Array(cols).fill(0);

  dp[0] = grid[0][0];

  // 初始化第一行
  for (let j = 1; j < cols; j++) {
    dp[j] = dp[j-1] + grid[0][j];
  }

  // 逐行计算最大价值
  for (let i = 1; i < rows; i++) {
    dp[0] += grid[i][0]; // 更新第一列的最大价值
    for (let j = 1; j < cols; j++) {
      dp[j] = Math.max(dp[j], dp[j-1]) + grid[i][j];
    }
  }

  return dp[cols-1];
}