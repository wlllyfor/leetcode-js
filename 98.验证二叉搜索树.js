
/*
 * @lc app=leetcode.cn id=98 lang=javascript
 *
 * [98] 验证二叉搜索树
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
 * 遍历左子树、右子树
 * 
 * 左子树每一个值都小于 root
 * 右子树每一个值都大于 root
 * 
 *      5
 *    4   6
 *       3  7
 * 
 *     2
 *   1   3
 */
var isValidBST = function(root) {
  function travel(root, min, max) {
    if (!root) {
      return true
    }
    if (root.val <= min || root.val >= max) {
      return false
    }
    return travel(root.left, min, root.val) && travel(root.right, root.val, max)
  }
  return travel(root, -Infinity, Infinity)
};
// @lc code=end

