/*
 * @lc app=leetcode.cn id=145 lang=javascript
 *
 * [145] 二叉树的后序遍历
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
 *         1
 *      2    3  
 *    4  5  6  7    
 * 
 * 4526731
 * 
 * stack：[124]
 * res：[]
 * 左右中
 */
function postorderTraversal(root) {
  let res = []
  function walk(root) {
    if (!root) {
      return res
    }
    walk(root.left)
    walk(root.right)
    res.push(root.val)
  }
  walk(root)
  return res
}
// @lc code=end

