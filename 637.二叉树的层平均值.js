/*
 * @lc app=leetcode.cn id=637 lang=javascript
 *
 * [637] 二叉树的层平均值
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
var averageOfLevels = function(root) {
  let res = []
  if (!root) {
    return res
  }
  const queue = [root]
  while(queue.length) {
    let len = queue.length
    let curLevelSum = 0
    for (let i = 0; i < len; i++) {
      const node = queue.shift()
      curLevelSum += node.val
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
    const average = curLevelSum / len
    res.push(average)
  }
  return res
};
// @lc code=end

