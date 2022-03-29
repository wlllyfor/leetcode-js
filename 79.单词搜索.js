/*
 * @lc app=leetcode.cn id=79 lang=javascript
 *
 * [79] 单词搜索
 */

/**
 * board = [
 *  ["A","B","C","E"],
 *  ["S","F","C","S"],
 *  ["A","D","E","E"]
 * ]
 * word = "SEE"
 * 
 * row 代表行的长度，为 4，clo 代表列的长度，为 3
 * i 代表横坐标，j 代表纵坐标
 * 递归函数为 find(i, j, curIndex) curIndex 代表查找过程中，word 当前的索引值
 * 二层循环查找，如果找到第一个元素，把那个位置的元素置为 null，表示找过了
 * board = [
 *  ["A","B","C","E"],
 *  ["S","F","C","null"],
 *  ["A","D","E","E"]
 * ]
 * 
 * 这时可以从上下左右四个方向继续查找，
 * 
 * find(i + 1, j, curIndex + 1)
 * find(i - 1, j, curIndex + 1)
 * find(i, j + 1, curIndex + 1)
 * find(i, j - 1, curIndex + 1)
 * 
 * i < 0 || i >= row || j < 0 || j >= col 都是越界的情况
 * 
 * 如果 board[i][j] !== word[curIndex]，说明找错了分支，回退
 * 
 * 回退，就把原来置为 null 的元素还原就行
 * 
 * let letter = board[i][j] 用一个变量 letter 记录当前找到的值
 * 回退时，board[i][j] = letter，还原就行
 * 
 * 如果 board[i][j] === word[curIndex] 说明一直都找到了新的值
 * 
 * 当 curIndex === word.length - 1，说明找完了。
 * 
 */
// 

// @lc code=start
/**
 * @param {character[][]} board
 * @param {string} word
 * @return {boolean}
 */

function exist (board, word) {

  if (board.length === 0 ) {
    return false
  }

  if (word.length === 0) {
    return true
  }

  let row = board.length
  let col = board[0].length
  for (let i = 0; i < row; i++) {
    for (let j = 0; j < col; j++) {
      const res = find(i, j, 0)
      if (res) {
        return true
      }
    }
  }
  return false

  function find (i, j, curIndex) {
    if (i >= row || i < 0 || j >= col || j < 0) {
      return false
    }
  
    let letter = board[i][j]
  
    if (letter !== word[curIndex]) {
      return false
    }
  
    if (curIndex === word.length - 1) {
      return true
    }
  
    board[i][j] = null // 标记，已经找过的字母置为 null
    const res = find(i + 1, j, curIndex + 1)
             || find(i - 1, j, curIndex + 1)
             || find(i, j + 1, curIndex + 1)
             || find(i, j - 1, curIndex + 1)
    board[i][j] = letter
  
    return res
  }

}

// @lc code=end

