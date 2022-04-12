/*
 * @lc app=leetcode.cn id=110 lang=javascript
 *
 * [110] 平衡二叉树
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
 * @return {boolean}
 * 9 15 7 20 3
 */

function getDepth(root) {
  if (!root) {
    return 0
  }
  return Math.max(getDepth(root.left), getDepth(root.right)) + 1
}
var isBalanced = function(root) {
  if (!root) {
    return true
  }
  if (Math.abs(getDepth(root.left) - getDepth(root.right)) > 1) {
    return false
  } 
  return isBalanced(root.left) && isBalanced(root.right)
};
// @lc code=end

