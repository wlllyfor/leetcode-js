/*
 * @lc app=leetcode.cn id=99 lang=javascript
 *
 * [99] 恢复二叉搜索树
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
 * @return {void} Do not return anything, modify root in-place instead.
 *     1
 *   3
 *     2
 * 
 * 
 *      i
 * [3 2 1]
 * 
 * 
 * 只有交换根节点的情况
 */
var recoverTree = function(root) {
  const arr = []
  function travel(node) {
    if (!node) {
      return
    }
    travel(node.left)
    arr.push(node)
    travel(node.right)
  }
  travel(root)

  let i = 0
  let first
  let second
  while (i < arr.length - 1) {
    if (arr[i].val >= arr[i+1].val) {
      if (!first) {
        first = arr[i]
      }
      second = arr[i + 1]
    } 
    i++
  }
  let tmp = first.val
  first.val = second.val
  second.val = tmp
  return root
};
/**
 *       3
 *    1    4
 *       2
 * 
 * [1,3,2,4]
 * 
 * 
 */
// @lc code=end

