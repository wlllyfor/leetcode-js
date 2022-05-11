/*
 * @lc app=leetcode.cn id=27 lang=javascript
 *
 * [27] 移除元素
 *
 *        i
 *              j           
 * [2,1,4,3,2,2,2] 2
 * [1,4,3]
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} val
 * @return {number}
 * 
 *              i
 * [0,1,3,0,4,2,4,2]
 *                  j
 * 
 */
function removeElement (nums, val) {
  let slow = 0, fast = 0
  const len = nums.length
  while(fast < len) {
    if (nums[fast] !== val) {
      nums[slow] = nums[fast]
      slow++
    }
    fast++
  }
  return slow
};

/**
 * 
 *  l         
 * [3,2,2,3]  
 *        r
 * 
 *  l         
 * [3,2,2,3]  
 *      r
 * 
 *  l         
 * [2,2,2,3]  
 *      r
 * 
 *    l         
 * [2,2,2,3]  
 *      r
 * 
 * 3
 * 
 * 
 *  l
 * [0,1,2,2,3,0,4,2]
 *                r
 * 
 *    l
 * [0,1,2,2,3,0,4,2]
 *                r
 * 
 *      l
 * [0,1,2,2,3,0,4,2]
 *                r
 * 
 *      l
 * [0,1,2,2,3,0,4,2]
 *              r
 * 
 *      l
 * [0,1,4,2,3,0,4,2]
 *              r
 * 
 *        l
 * [0,1,4,2,3,0,4,2]
 *              r
 * 
 *        l
 * [0,1,4,4,3,0,4,2]
 *              r
 * 
 *          l
 * [0,1,4,4,3,0,4,2]
 *              r
 * 
 *            l
 * [0,1,4,4,3,0,4,2]
 *              r
 * 
 *              l
 * [0,1,4,4,3,0,4,2]
 *              r
 * 
 * 2
 */

function removeElement (nums, val) {
  let left = 0, right = nums.length - 1
  while (left <= right) {
    if (nums[left] === val) {
      nums[left] = nums[right]
      right--
    } else {
      left++
    }
  }
  return left
}

// @lc code=end

