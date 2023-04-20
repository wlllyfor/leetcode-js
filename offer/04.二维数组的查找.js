/**
 * 暴力法
 * 时间复杂度：O(mn)，其中 m 是矩阵的行数，n 是矩阵的列数
 * 空间复杂度：O(1)，只使用了常数级别的额外空间来存储循环变量和目标值
 */
function findNumberIn2DArray(matrix, target) {
  const m = matrix.length;
  if (m === 0) {
    return false;
  }
  const n = matrix[0].length;
  for (let i = 0; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (matrix[i][j] === target) {
        return true;
      }
    }
  }
  return false;
}

/**
 * 二分查找法
 * 时间复杂度：O(mlogn)，其中 m 是矩阵的行数，n 是矩阵的列数
 *     二分查找的时间复杂度为 O(logn)
 * 空间复杂度：O(1)，只使用了常数级别的额外空间来存储循环变量和目标值
 */
function findNumberIn2DArray(matrix, target) {
  const m = matrix.length;
  if (m === 0) {
    return false;
  }
  const n = matrix[0].length;
  for (let i = 0; i < m && matrix[i][0] <= target; i++) {
    // 如果当前行最后一个值都比 target 小，直接跳到下一行
    if (matrix[i][n - 1] < target) {
      continue;
    }
    // 二分查找
    let left = 0,
      right = n - 1;
    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      if (matrix[i][mid] === target) {
        return true;
      } else if (matrix[i][mid] < target) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
  }
  return false;
}

/**
 * 双指针法
 * 二维数组是有序的，可以从二维数组右上角开始遍历
 * 如果当前值大于 target，指针左移
 * 如果当前值小于 target，指针下移
 *
 * 时间复杂度：O(m + n)，其中 m 是矩阵的行数，n 是矩阵的列数
 *    因为该算法从矩阵的右上角开始查找，每次可以排除一行或一列，因此最多只需要遍历 m + n 个元素
 * 空间复杂度：O(1)，只使用了常数级别的额外空间来存储循环变量和目标值
 */
function findNumberIn2DArray(matrix, target) {
  let m = 0;
  let n = matrix[0]?.length - 1;
  while (m < matrix.length && n >= 0) {
    if (matrix[m][n] === target) {
      return true;
    } else if (matrix[m][n] > target) {
      n--;
    } else if (matrix[m][n] < target) {
      m++;
    }
  }
  return false;
}

const arr = [
  [1, 4, 7, 11, 15],
  [2, 5, 8, 12, 19],
  [3, 6, 9, 16, 22],
  [10, 13, 14, 17, 24],
  [18, 21, 23, 26, 30],
];
