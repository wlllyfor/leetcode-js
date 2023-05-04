/**
 * 矩阵中的矩阵
 * 输入：board = [["A","B","C","E"],["S","F","C","S"],["A","D","E","E"]], word = "ABCCED"
 * 输出：true
 */

function exist(board, word) {
  // 处理边缘情况
  if (board.length === 0) {
    return false;
  }
  if (word.length === 0) {
    return true;
  }

  // 定义行和列
  let row = board.length;
  let col = board[0].length;

  // 两层循环查找
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const res = find(i, j, 0);
      if (res) {
        return true;
      }
    }
  }
  return false;

  // 查找的逻辑，用一个 find 函数封装
  function find(i, j, cur) {
    // 越界逻辑
    if (i < 0 || i >= row || j < 0 || j >= col) {
      return false;
    }
    // 用一个变量 letter 记录找过的字符
    let letter = board[i][j];
    // 没找到的情况返回 false
    if (letter !== word[cur]) {
      return false;
    }
    // 全部都找到了返回 true
    if (word.length - 1 === cur) {
      return true;
    }
    // 查找过程中，当前查找项置为 null
    board[i][j] = null;
    // 上下左右查找
    const res =
      find(i + 1, j, cur + 1) ||
      find(i - 1, j, cur + 1) ||
      find(i, j + 1, cur + 1) ||
      find(i, j - 1, cur + 1);
    // 回退
    board[i][j] = letter;
    return res;
  }
}
