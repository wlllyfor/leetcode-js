/*
 * @lc app=leetcode.cn id=977 lang=javascript
 *
 * [977] 有序数组的平方
 * 
 * 数组先平方
 * 
 * 先找到数组中最小的值
 * 
 * 双指针，从中间向两边
 * 
 *       i
 *       j
 * [16,1,0,9,100]
 * 
 *         i
 *         j
 * [16,9,1,1,9,100]
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[]}
 */
/**
 * 
 *  i 
 *            j          
 * [-4,-1,0,3,10]
 * 
 */

function sortedSquares (nums) {
  return nums.map(i => i * i).sort((a, b) => a - b)
}

/**
 * 
 *  i
 * [-4,-1,0,3,10]
 *            j
 *    
 */
 function sortedSquares (nums) {
  let left = 0, right = nums.length - 1
  let res = []

  while(left <= right) {
    let leftNumSquare = nums[left] * nums[left]
    let rightNumSquare = nums[right] * nums[right]

    if (leftNumSquare > rightNumSquare) {
      res.unshift(leftNumSquare)
      left++
    } else {
      res.unshift(rightNumSquare)
      right--
    }
  }
  return res
}

function sortedSquares (nums) {
  let left = 0
  let right = nums.length-1
  let res = []
  let index = right
  while(left <= right){
    let leftNumSquare = nums[left] * nums[left]
    let rightNumSquare = nums[right] * nums[right]
    if(leftNumSquare > rightNumSquare){
      res[index] = leftNumSquare
      left++
    } else {
      res[index] = rightNumSquare
      right++
    }
    index--
  }
  return res
};
// @lc code=end