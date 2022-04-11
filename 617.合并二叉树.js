/*
 * @lc app=leetcode.cn id=617 lang=javascript
 *
 * [617] 合并二叉树
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
 * @param {TreeNode} root1
 * @param {TreeNode} root2
 * @return {TreeNode}
 */
var mergeTrees = function(root1, root2) {
  if (!root1) {
    return root2
  }
  if (!root2) {
    return root1
  }
  console.log('root1', root1)
  console.log('root2', root2)
  let merged = new TreeNode(root1.val + root2.val)
  merged.left = mergeTrees(root1.left, root2.left)
  merged.right = mergeTrees(root1.right, root2.right)
  return merged
};
// @lc code=end

