/*
 * @lc app=leetcode.cn id=117 lang=javascript
 *
 * [117] 填充每个节点的下一个右侧节点指针 II
 */

// @lc code=start
/**
 * // Definition for a Node.
 * function Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {Node} root
 * @return {Node}
 */
var connect = function(root) {
  if (!root) {
    return root
  }
  let queue = [root]
  while(queue.length) {
    let len = queue.length
    let curLevel = []
    while(len--) {
      const node = queue.shift()
      curLevel.push(node)
      node.left && queue.push(node.left)
      node.right && queue.push(node.right)
    }
    for (let i = 0; i < curLevel.length; i++) {
      curLevel[i].next = curLevel[i + 1]
      if (i === curLevel.length - 1) {
        curLevel[i].next = null
      }
    }
  }
  return root
};
// @lc code=end

