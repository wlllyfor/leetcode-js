/*
 * @lc app=leetcode.cn id=572 lang=javascript
 *
 * [572] 另一棵树的子树
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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function(root, subRoot) {
  function isSameTree (p, q) {
    if(!p && !q) {
      return true
    }
    if(!p || !q) {
      return false
    }
    if (p.val !== q.val) {
      return false
    }
    return isSameTree(p.left, q.left) && isSameTree(p.right, q.right)
  }
  let res = false
  function travel(root) {
    if (!root) {
      return
    }
    if (isSameTree(root, subRoot)) {
      res = true
      return 
    }
    travel(root.left)
    travel(root.right)
  }
  travel(root)
  return res
};
// @lc code=end

