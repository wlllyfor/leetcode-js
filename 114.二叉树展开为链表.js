/*
 * @lc app=leetcode.cn id=114 lang=javascript
 *
 * [114] 二叉树展开为链表
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
 * @param {TreeNode} node
 * @return {void} Do not return anything, modify root in-place instead.
 * 
 * 中左右
 * 
 */
// var flatten = function(root) {
//   let list = []
//   if (root) {
//     let stack = [root]
//     while(stack.length) {
//       const node = stack.pop()
//       list.push(node)
//       node.right && stack.push(node.right)
//       node.left && stack.push(node.left)
//     }
//   }
  
//   for (let i = 1; i < list.length; i++) {
//     const prev = list[i - 1]
//     const cur = list[i]
//     prev.left = null
//     prev.right = cur
//   }
// };

function flatten (root) {
  let list = []
  function travel(root) {
    if (root) {
      list.push(root)
      travel(root.left)
      travel(root.right)
    }
  }
  travel(root)
  for (let i = 1; i < list.length; i++) {
    const prev = list[i - 1]
    const cur = list[i]
    prev.left = null
    prev.right = cur
  }
}
// @lc code=end

