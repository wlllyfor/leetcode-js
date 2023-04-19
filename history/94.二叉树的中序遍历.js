/*
 * @lc app=leetcode.cn id=94 lang=javascript
 *
 * [94] 二叉树的中序遍历
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
 * @return {number[]}
 * 左中右
 */
// var inorderTraversal = function(root) {
//   let res = []
//   function walk(root) {
//     if(!root) {
//       return res
//     }
//     walk(root.left)
//     res.push(root.val)
//     walk(root.right)
//   }
//   walk(root)
//   return res
// };

/**
 *        1
 *      2    3  
 *    4  5  6  7    
 * 
 * 4251637
 * 
 * stack：[1]
 * res：[]
 * 左中右
 */
function inorderTraversal(root) {
  let res = []
  if (!root) {
    return res
  }
  let stack = []
  while (root || stack.length) {
    while (root) {
      stack.push(root)
      root = root.left
    }
    root = stack.pop()
    res.push(root.val)
    root = root.right
  }
  return res
}
// @lc code=end

