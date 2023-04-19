/*
 * @lc app=leetcode.cn id=700 lang=javascript
 *
 * [700] 二叉搜索树中的搜索
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
 * @param {number} val
 * @return {TreeNode}
 */
// var searchBST = function(root, val) {
//   let res = null
//   function travel(node) {
//     if (!node) {
//       return
//     }
//     if (node.val === val) {
//       res = node
//     }
//     travel(node.left)
//     travel(node.right)
//   }
//   travel(root)
//   return res
// };

function searchBST (root, val) {
  if (!root) {
    return null
  }
  if (root.val === val) {
    return root
  }
  if (root.val > val) {
    return searchBST(root.left, val)
  }
  if (root.val < val) {
    return searchBST(root.right, val)
  }
}
// @lc code=end

