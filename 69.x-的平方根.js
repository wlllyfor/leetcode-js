/*
 * @lc app=leetcode.cn id=69 lang=javascript
 *
 * [69] x 的平方根 
 */

// @lc code=start
/**
 * @param {number} x
 * @return {number}
 * 
 * [1,2,3,4,5,6,7,8]
 */
var mySqrt = function(x) {
  let left = 0
  let right = x
  while (left <= right) {
    let mid = (left + right) >> 1
    if (mid * mid > x) {
      right = mid - 1
    } else {
      left = mid + 1
    }
  }
  return left - 1
};
// @lc code=end

