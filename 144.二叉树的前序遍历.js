/*
 * @lc app=leetcode.cn id=144 lang=javascript
 *
 * [144] 二叉树的前序遍历
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
 * 
 *          1
 *       2    3
 *     4  5  6
 * 
 * 
 * 124536
 * 中左右
 */
// var preorderTraversal = function(root) {
//   let res = []
//   function walk(root) {
//     if (!root) {
//       return res
//     }
//     res.push(root.val)
//     walk(root.left)
//     walk(root.right)
//   }
//   walk(root)
//   return res
// };

/**
 *          1
 *       2    3
 *     4  5  6
 * 
 * root 4
 * stack [1,2, 4]
 * res [1,2,4]
 * 124536
 * 中左右
 */
// function preorderTraversal(root) {
//   let res = []
//   if (!root) {
//     return res
//   }
//   let stack = []

//   while (root || stack.length) {
//     while(root) {
//       res.push(root.val)
//       stack.push(root)
//       root = root.left
//     }
//     root = stack.pop()
//     root = root.right
//   }
//   return res
// }

/**
 *          1
 *       2    3
 *     4  5  6
 * 
 * 124536
 * 
 * stack: [6]
 * res: [1,2,4,5,3]
 */
function preorderTraversal (root) {
  let res = []
  if (!root) {
    return res
  }
  let stack = [root]
  while(stack.length) {
    const node = stack.pop()
    res.push(node.val)
    node.right && stack.push(node.right)
    node.left && stack.push(node.left)
  }
  return res
}
// @lc code=end

