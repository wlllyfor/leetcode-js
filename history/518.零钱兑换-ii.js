/*
 * @lc app=leetcode.cn id=518 lang=javascript
 *
 * [518] 零钱兑换 II
 */

// @lc code=start
/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */

/**
 * dp[0] = 1
 * dp[i] = dp[i - coins[j]]
 * 
 * [1,2,5]
 * 
 * dp[5] = dp[4] + dp[3] + dp[0]
 * 
 * dp[100] = dp[99] + dp[98] + dp[95]
 */
var change = function(amount, coins) {
  let dp = new Array(amount + 1).fill(0)
  dp[0] = 1
  for (let i = 0; i < coins.length; i++) {
    for (let j = coins[i]; j <= amount; j++) {
      dp[j] += dp[j - coins[i]]
    }
  }
  console.log('dp :>> ', dp);
  return dp[amount]
};
// @lc code=end

