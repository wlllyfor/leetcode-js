/*
 * @lc app=leetcode.cn id=746 lang=javascript
 *
 * [746] 使用最小花费爬楼梯
 */

// @lc code=start
/**
 * @param {number[]} cost
 * @return {number}
 */

/**
 * 
 * dp[i] = Math.min(dp[i -1] + cost[i - 1], dp[i -2] + cost[i - 2])
 * 
 * [0,0,10,15]
 */
var minCostClimbingStairs = function(cost) {
  let dp = [0, 0]
  let n = cost.length
  for (let i = 2; i <= n; i++) {
    dp[i] = Math.min(dp[i -1] + cost[i - 1], dp[i -2] + cost[i - 2])
    console.log('dp :>> ', dp);
  }
  
  return dp[n]
};
// @lc code=end

