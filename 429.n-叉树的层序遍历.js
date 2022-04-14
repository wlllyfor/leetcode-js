/*
 * @lc app=leetcode.cn id=429 lang=javascript
 *
 * [429] N 叉树的层序遍历
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val,children) {
 *    this.val = val;
 *    this.children = children;
 * };
 */

/**
 * @param {Node|null} root
 * @return {number[][]}
 */
var levelOrder = function(root) {
  let res = []
  if (!root) {
    return res
  }
  let queue = [root]
  while(queue.length) {
    let len = queue.length
    let curLevel = []
    while(len--) {
      const node = queue.shift()
      curLevel.push(node.val)
      for(let child of node.children) {
        queue.push(child)
      }
    }
    res.push(curLevel)
  }
  return res
};
// @lc code=end

