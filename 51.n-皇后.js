/*
 * @lc app=leetcode.cn id=51 lang=javascript
 *
 * [51] N 皇后
 * 
 */

// @lc code=start
/**
 * @param {number} n
 * @return {string[][]}
 */
/**
 * 
 * [1,3,0,2]
 */
var solveNQueens = function(n) {
  let res = []
  let path = []
  backTrack(0)
  return res
  function backTrack (row) {

    if (row === n) {
      res.push(path.map(col => {
        let arr = new Array(n).fill('.')
        arr[col] = 'Q'
        return arr.join('')
      }))
    }

    for (let col = 0; col < n; col++) {
      const conNotSet = path.some((c, r) => {
        return c === col || (r - c === row - col)|| (r + c === row + col)
      })

      if (conNotSet) {
        continue
      }

      path.push(col)
      backTrack(row + 1)
      path.pop()
      
    }
  }
};

/**
 * [0,0]
 */
// @lc code=end

