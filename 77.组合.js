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
 * 
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


/**
 * 
 * 剪枝优化
 * n = 4
 * k = 4
 * n - (k - len) + 1
 * n - k + len + 1
 * 
 * len 0  i <= 1
 * len 1  i <= 2
 * len 2  i <= 3
 * len 3  i <= 4
 * 
 * 
 * 
 * n = 4
 * k = 2
 * n - k + len + 1
 * 
 * len 0  i <= 3
 * len 1  i <= 4
 * 
 */
function combine(n, k) {
  let res = []
  let path = []

  backTrack(1)

  return res

  function backTrack (cur) {
    console.log('cur :>> ', cur);
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

