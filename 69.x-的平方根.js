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
 *  i                 j
 * [0,1,2,3,4,5,6,7,8,9]
 *          k
 * 
 *  i       j
 * [0,1,2,3,4,5,6,7,8,9]
 *      k   
 * 
 *        i j
 * [0,1,2,3,4,5,6,7,8,9]
 *      k             
 */
function mySqrt (x) {
  let left = 0
  let right = x
  while (left <= right) {
    let mid = Math.floor((left + right) / 2)
    if (mid * mid > x) {
      right = mid - 1
    } else if (mid * mid < x) {
      left = mid + 1
    } else {
      return mid
    }
  }

  // 这里返回 left - 1 也是一样的
  return right
};

/**
 *  i               j
 * [0,1,2,3,4,5,6,7,8]
 *          k
 * 
 *  i       j
 * [0,1,2,3,4,5,6,7,8]
 *      k   
 * 
 *        i j
 * [0,1,2,3,4,5,6,7,8]
 *        k  
 * 
 *        i 
 *        j
 * [0,1,2,3,4,5,6,7,8]
 *        k    
 */
function mySqrt (x) {
  let left = 0
  let right = x + 1
  console.log(right)
  while (left < right) {
    let mid = Math.floor((left + right) / 2)
    console.log(mid)
    if (mid * mid > x) {
      right = mid
    } else if (mid * mid < x) {
      left = mid + 1
    } else {
      return mid
    }
  }
  return right - 1
//   return left - 1
};

// @lc code=end

// 2147483647