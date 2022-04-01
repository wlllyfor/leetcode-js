/*
 * @lc app=leetcode.cn id=509 lang=javascript
 *
 * [509] 斐波那契数
 */

// @lc code=start
/**
 * @param {number} n
 * @return {number}
 */
const cache = [0, 1]
var fib = function(n) {
  for (let i = 2; i <= n; i++) {
    cache[i] = cache[i - 1] + cache[i - 2]
  }
  return cache[n]
};
// @lc code=end

