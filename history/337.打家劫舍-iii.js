/*
 * @lc app=leetcode.cn id=337 lang=javascript
 *
 * [337] 打家劫舍 III
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
 * @return {number}
 */

/** 
 *     2
 *   1   3
 *     4
 * 
 * 
 * dp[i] = Math.max(dp[i - 2] + nums[i - 1], dp[i - 1])
 */

/**
 * 选了当前某个节点，就要在左边和右边选最大值
 */
var rob = function(root) {
  return Math.max(...dfs(root))

  function dfs (root) {
    if (!root) {
      return [0, 0]
    }
    const left = dfs(root.left)
    const right = dfs(root.right)
    const robSelf = root.val + left[0] + right[0]
    const notRobSelf = Math.max(...left) + Math.max(...right)

    return [notRobSelf, robSelf]
  }
};


// @lc code=end

