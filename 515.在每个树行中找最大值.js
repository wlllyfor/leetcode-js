/*
 * @lc app=leetcode.cn id=515 lang=javascript
 *
 * [515] 在每个树行中找最大值
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
 */
var largestValues = function(root) {
  let res = []
  if (!root) {
    return res
  }
  let queue = [root]
  while(queue.length) {
    let len = queue.length
    let curMax = -Infinity
    while(len--) {
      const node = queue.shift()
      curMax = Math.max(node.val, curMax)
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
    res.push(curMax)
  }
  return res
};
// @lc code=end

