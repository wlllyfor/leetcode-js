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
 * 2
 * 
 *  i
 * [0,2,2,3,1]
 *  j
 * 
 *    i
 * [0,2,2,3,1]
 *    j
 * 
 *    i
 * [0,2,2,3,1]
 *      j
 * 
 *    i
 * [0,2,2,3,1]
 *        j
 * 
 *    i
 * [0,3,2,3,1]
 *        j
 * 
 * 
 *      i
 * [0,3,2,3,1]
 *          j
 * 
 *      i
 * [0,3,1,3,1]
 *          j
 * 
 *        i
 * [0,3,1,3,1]
 *            j
 * 
 * 
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
 *  l
 * [0,2,2,3,1]
 *          r
 * 
 *    l
 * [0,2,2,3,1]
 *          r
 * 
 *    l
 * [0,1,2,3,1]
 *          r
 * 
 *    l
 * [0,1,2,3,1]
 *        r
 * 
 *      l
 * [0,1,2,3,1]
 *        r
 * 
 *      l
 * [0,1,3,3,1]
 *        r
 * 
 *      l
 * [0,1,3,3,1]
 *      r
 * 
 *        l
 * [0,1,3,3,1]
 *      r
 * 
 * 
 * 
 * 
 * 
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

function removeElement (nums, val) {
  let left = 0, right = nums.length
  while (left < right) {
    if (nums[left] === val) {
      nums[left] = nums[right - 1]
      right--
    } else {
      left++
    }
  }
  return left
}

/**
 * 
 *      i
 * [0,3,1]
 *      j
 * 
 */
function removeElement (nums, val) {
  let res = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === val){
      nums.splice(i,1)
      i--
    } else{
      res++
    }
  }
  return res
}

function removeElement (nums, val) {
  let count = 0
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] === val) {
      count++
    }
  }
  return nums.length - count
}

/**
 *  l
 * [0,2,2,3,1]
 *          r
 *  l
 * [1]
 *  r
 */
function removeElement (nums, val) {
  let left = 0, right = nums.length - 1

  while (left < right) {
    if (nums[left] === val) {

      nums[left] = nums[right]
      right--
    } else {
      left++
    }
  }
  return nums[left + 1] !== undefined ? left + 1 : left
}



// @lc code=end

