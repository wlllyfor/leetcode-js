/*
 * @lc app=leetcode.cn id=654 lang=javascript
 *
 * [654] 最大二叉树
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
 */
var constructMaximumBinaryTree = function(nums) {
  function travel(nums) {
    if (!nums.length) {
      return null
    }
    let max = Math.max(...nums)
    let index = nums.indexOf(max)
    let node = new TreeNode(nums[index])
    node.left = travel(nums.slice(0, index))
    node.right = travel(nums.slice(index + 1))
    return node
  }
  return travel(nums)
};
// @lc code=end

