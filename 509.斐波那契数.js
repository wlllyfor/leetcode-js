/*
 * @lc app=leetcode.cn id=509 lang=javascript
 *
 * [509] 斐波那契数
 * 
 * 0 1 1 2
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */

 function fib (n) {
  if (n <= 1) {
    return n
  }
  let p = 0, q = 1, r
  for (let i = 2; i <= n; i++) {
    r = p + q
    p = q
    q = r
  }
  return r
}

// @lc code=end

