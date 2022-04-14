/*
 * @lc app=leetcode.cn id=112 lang=javascript
 *
 * [112] 路径总和
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
 * @param {TreeNode} root
 * @param {number} targetSum
 * @return {boolean}
 *     1
 *   2
 * [1,2]
 * 1
 */
var hasPathSum = function(root, targetSum) {
  let res = false
  function travel(root, sum) {
    if (!root) {
      return 
    }
    sum += root.val
    if (sum === targetSum && !root.left && !root.right) {
      res = true
      return
    }
    travel(root.left, sum)
    travel(root.right, sum)
  }
  travel(root, 0)
  return res
};
// @lc code=end

