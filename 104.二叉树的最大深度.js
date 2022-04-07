/*
 * @lc app=leetcode.cn id=104 lang=javascript
 *
 * [104] 二叉树的最大深度
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
 *   1
 *  2 3
 * 4 5
 * [1,2,3,4,5]
 */
var maxDepth = function(root) {
  if (!root) {
    return 0
  }
  const l = maxDepth(root.left)
  const r = maxDepth(root.right)
  return Math.max(l, r) + 1
};
// @lc code=end

