function spiralOrder(matrix) {
  if (!matrix || matrix.length === 0) {
    return [];
  }

  const rows = matrix.length;
  const cols = matrix[0].length;
  const result = [];

  let startRow = 0;
  let endRow = rows - 1;
  let startCol = 0;
  let endCol = cols - 1;

  while (startRow <= endRow && startCol <= endCol) {
    // 从左到右打印一行
    for (let i = startCol; i <= endCol; i++) {
      result.push(matrix[startRow][i]);
    }

    // 从上到下打印一列
    for (let i = startRow + 1; i <= endRow; i++) {
      result.push(matrix[i][endCol]);
    }

    // 如果只有一行或一列，就不需要从右到左和从下到上打印了
    if (startRow !== endRow && startCol !== endCol) {
      // 从右到左打印一行
      for (let i = endCol - 1; i >= startCol; i--) {
        result.push(matrix[endRow][i]);
      }

      // 从下到上打印一列
      for (let i = endRow - 1; i > startRow; i--) {
        result.push(matrix[i][startCol]);
      }
    }

    // 缩小矩阵的范围
    startRow++;
    endRow--;
    startCol++;
    endCol--;
  }

  return result;
}
