/*
 * @lc app=leetcode.cn id=77 lang=javascript
 *
 * [77] 组合
 */

// @lc code=start
/**
 * @param {number} n
 * @param {number} k
 * @return {number[][]}
 */

/**
 * 
 * n - (k - len) + 1
 */
// function combine(n, k) {
//   let path = []
//   let res = []

//   backTrack(1)

//   return res

//   function backTrack(cur) {
//     let len = path.length
//     if (len === k) {
//       res.push([...path])
//       return
//     }
//     for (let i = cur; i <= n; i++) {
//       path.push(i)
//       backTrack(i + 1)
//       path.pop()
//     }
//   }
// }

function combine(n, k) {
  let path = []
  let res = []

  backTrack(1)

  return res

  function backTrack(cur) {
    let len = path.length
    if (len === k) {
      res.push([...path])
      return
    }
    for (let i = cur; i <= n - k + len + 1; i++) {
      path.push(i)
      backTrack(i + 1)
      path.pop()
    }
  }
}
// @lc code=end

