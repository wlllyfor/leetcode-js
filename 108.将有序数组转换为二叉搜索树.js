/*
 * @lc app=leetcode.cn id=108 lang=javascript
 *
 * [108] 将有序数组转换为二叉搜索树
 */

// @lc code=start
/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 * 
 *          i
 *  [-10,-3,0,5,9]
 * 
 */

// var sortedArrayToBST = function(nums) {
//   function travel(nums, left, right) {
//     if (left > right) {
//       return null
//     }
//     let mid = (left + right) >> 1
//     let node = new TreeNode(nums[mid])
//     node.left = travel(nums, left, mid - 1)
//     node.right = travel(nums, mid + 1,right)
//     return node
//   }
//   return travel(nums, 0, nums.length - 1)
// };

function sortedArrayToBST (nums) {
  if (!nums.length) {
    return null
  }
  let mid = nums.length >> 1
  let node = new TreeNode(nums[mid])
  node.left = sortedArrayToBST(nums.slice(0, mid))
  node.right = sortedArrayToBST(nums.slice(mid + 1))
  return node
}
// @lc code=end

