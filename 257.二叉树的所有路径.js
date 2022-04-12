/*
 * @lc app=leetcode.cn id=257 lang=javascript
 *
 * [257] 二叉树的所有路径
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
 * @return {string[]}
 * [1,2,3,5,6]
 * 
 *         1
 *       2   3
 *     5  6
 */
var binaryTreePaths = function(root) {
  let res = []
  function travel(root, str) {
    if (root) {
      str += root.val.toString()
      if (!root.left && !root.right) {
        res.push(str)
      } else {
        str += '->'
        travel(root.left, str)
        travel(root.right, str)
      }
    } 
  }
  travel(root, '')
  return res
};
// @lc code=end

