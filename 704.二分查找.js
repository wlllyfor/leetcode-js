/*
 * @lc app=leetcode.cn id=704 lang=javascript
 *
 * [704] 二分查找
 * 
 * [-1,0,3,5,9,12]
 * 
 * mid 2
 * left 2
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 * 
 * 二分其实就是头尾指针（左右指针）
 * 注意开闭区间，就能写好条件判断
 */
// function search (nums, target) {
//   let left = 0
//   let right = nums.length - 1
//   while(left <= right) {
//     let mid = (left + right) >> 1
//     if (nums[mid] === target) {
//       return mid
//     } else if (nums[mid] > target) {
//       right = mid - 1
//     } else {
//       left = mid + 1
//     }
//   }
//   return -1
// }

/**
 * 左闭右闭：[left, right]
 * 
 * 闭合是指能访问到
 * 
 * i             j
 * 0 1 2 3 4 5 6 7
 *       k
 * 
 * i   j
 * 0 1 2 3 4 5 6 7
 *   k
 * 
 * 
 * j
 * i    
 * 0 1 2 3 4 5 6 7
 * k  
 * 
 */
// function search (nums, target) {
//   let left = 0
//   let right = nums.length - 1
//   while(left <= right) {
//     let mid = Math.floor((left + right) / 2)
//     if (nums[mid] === target) {
//       return mid
//     } else if (nums[mid] > target) {
//       right = mid - 1
//     } else {
//       left = mid + 1
//     }
//   }
//   return -1
// }

/**
 * 左闭右开：[left, right)
 * 
 * i               j
 * 0 1 2 3 4 5 6 7
 *         k
 * 
 * i       j
 * 0 1 2 3 4 5 6 7
 *     k      
 * 
 * i   j
 * 0 1 2 3 4 5 6 7
 *   k  
 * 
 * i j
 * 0 1 2 3 4 5 6 7
 * k  
 * 
 */
// function search (nums, target) {
//   let left = 0 
//   let right = nums.length // 注意变化
//   while(left < right) { // 注意变化
//     let mid = Math.floor((left + right) / 2)
//     if (nums[mid] === target) {
//       return mid
//     } else if (nums[mid] > target) {
//       right = mid // 注意变化
//     } else {
//       left = mid + 1
//     }
//   }
//   return -1
// }

/**
 * (left, right]
 *  i            j
 *   [-1,0,3,5,9,12]
 *         k
 * 
 *  i    j
 *   [-1,0,3,5,9,12]
 *     k
 * 
 *     i  j
 *   [-1,0,3,5,9,12]
 *     k
 * 
 */
function search (nums, target) {
  let left = 0 // 注意变化
  let right = nums.length - 1 // 注意变化
  while(left < right) { // 注意变化
    let mid = Math.floor((left + right) / 2)
    if (nums[mid] === target) {
      return mid
    } else if (nums[mid] > target) {
      right = mid - 1 // 注意变化
    } else {
      left = mid // 注意变化
    }
  }
  return -1
}

// @lc code=end


搜索插入位置
寻找旋转排序数组中的最小值
x的平方根