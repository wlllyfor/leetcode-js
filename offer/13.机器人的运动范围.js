function movingCount(m, n, k) {
  // 定义一个二维数组，用于标记格子是否被访问过
  const visited = new Array(m);
  for (let i = 0; i < m; i++) {
    visited[i] = new Array(n).fill(false);
  }

  // 定义一个函数，用于计算一个数的数位之和
  function getSum(num) {
    let sum = 0;
    while (num > 0) {
      sum += num % 10;
      num = Math.floor(num / 10);
    }
    return sum;
  }

  // 定义一个函数，用于搜索格子
  function dfs(i, j) {
    // 如果格子越界或者数位之和大于k或者已经访问过，直接返回
    if (
      i < 0 ||
      i >= m ||
      j < 0 ||
      j >= n ||
      getSum(i) + getSum(j) > k ||
      visited[i][j]
    ) {
      return 0;
    }
    // 标记格子为已访问
    visited[i][j] = true;
    // 继续向四个方向进行搜索，并累加已访问的格子数
    return 1 + dfs(i - 1, j) + dfs(i + 1, j) + dfs(i, j - 1) + dfs(i, j + 1);
  }

  // 从起点开始搜索
  return dfs(0, 0);
}

function movingCount(m, n, k) {
  // 定义一个二维数组，用于标记格子是否被访问过
  const visited = new Array(m);
  for (let i = 0; i < m; i++) {
    visited[i] = new Array(n).fill(false);
  }

  // 定义一个函数，用于计算一个数的数位之和
  function getSum(num) {
    let sum = 0;
    while (num > 0) {
      sum += num % 10;
      num = Math.floor(num / 10);
    }
    return sum;
  }

  // 定义一个队列，用于存储待访问的格子
  const queue = [[0, 0]];
  // 定义一个变量，用于记录已访问的格子数
  let count = 0;

  // 开始搜索
  while (queue.length > 0) {
    // 取出队列中的第一个格子
    const [i, j] = queue.shift();
    // 如果格子越界或者数位之和大于k或者已经访问过，直接跳过
    if (
      i < 0 ||
      i >= m ||
      j < 0 ||
      j >= n ||
      getSum(i) + getSum(j) > k ||
      visited[i][j]
    ) {
      continue;
    }
    // 标记格子为已访问
    visited[i][j] = true;
    // 统计已访问的格子数
    count++;
    // 将当前格子的四个相邻格子加入队列中
    queue.push([i - 1, j]);
    queue.push([i + 1, j]);
    queue.push([i, j - 1]);
    queue.push([i, j + 1]);
  }

  // 返回已访问的格子数
  return count;
}
