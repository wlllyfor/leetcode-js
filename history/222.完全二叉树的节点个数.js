/*
 * @lc app=leetcode.cn id=222 lang=javascript
 *
 * [222] 完全二叉树的节点个数
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
// var countNodes = function(root) {
//   let count = 0
//   function travel(root) {
//     if (!root) {
//       return 
//     }
//     count++
//     travel(root.left)
//     travel(root.right)
//   }
//   travel(root)
//   return count
// };
function countNodes (root) {
  function travel(root) {
    if (!root) {
      return 0
    }
    let left = travel(root.left)
    let right = travel(root.right)
    return left + right + 1
  }
  return travel(root)
}
// @lc code=end

