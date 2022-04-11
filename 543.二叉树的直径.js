/*
 * @lc app=leetcode.cn id=543 lang=javascript
 *
 * [543] 二叉树的直径
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
 * @return {number}
 */
var diameterOfBinaryTree = function(root) {
  function maxDepth(root) {
    if (!root) {
      return 0
    } else {
      return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
    }
  }
  let maxLength = 0
  function travel(root) {
    if(!root) {
      return
    }
    maxLength = Math.max(maxLength, maxDepth(root.left) + maxDepth(root.right) + 1) 
    travel(root.left)
    travel(root.right)
  }
  travel(root)
  return maxLength - 1
};
// @lc code=end

