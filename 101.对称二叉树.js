/*
 * @lc app=leetcode.cn id=101 lang=javascript
 *
 * [101] 对称二叉树
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
 * 
 * [1,2,2,3,4,4,3]
 * 
 *             1
 *          2      2
 *       3    4  4   3
 */
var isSymmetric = function(root) {
  if (!root) {
    return false
  }
  function check(l, r) {
    if (!l && !r) {
      return true
    }
    if (!l || !r) {
      return false
    }
    if (l.val !== r.val) {
      return false
    }
    return check(l.left, r.right) && check(l.right, r.left)
  }
  return check(root.left, root.right)
};
// @lc code=end

