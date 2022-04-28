/*
 * @lc app=leetcode.cn id=322 lang=javascript
 *
 * [322] 零钱兑换
 * 
 * 
 * 每次先兑换当前能兑换的最大零钱
 * 
 * [1, 2, 5] 7
 * [Infinity,Infinity,Infinity,Infinity,Infinity,Infinity,Infinity]
 * [1, 1, 2, 2, 1, 2, 2]
 * f(0) = 0
 * f(1) = Math.min(f(1-1), f(1-2), f(1-5)) + 1 = 1
 * f(2) = Math.min(f(2-1), f(2-2), f(2-5)) + 1 = 1
 * f(3) = Math.min(f(3-1), f(3-2), f(3-5)) + 1 = 2
 * ...
 * f(7) = Math.min(f(7-1), f(7-2), f(7-5)) + 1
 * 
 * const dp = []
 * if (i - coins[j] > 0)
 * dp[i] = Math.min(dp[i], dp[i-conins[j]] + 1)
 * 
 * [2] 3
 */

// @lc code=start
/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
// var coinChange = function(coins, amount) {
//   const dp = []
//   dp[0] = 0
//   for (let i = 1; i <= amount; i++) {
//     dp[i] = Infinity
//     for (let j = 0; j < coins.length; j++) {
//       if (i - coins[j] >= 0) {
//         dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1)
//       }
//     }
//   }
//   if (dp[amount] === Infinity) {
//     return -1
//   }
//   return dp[amount]
// };

/**
 * 
 * 
 * dp[i] = Math.min(dp[i], dp[i - coins[j]]) + 1
 */
function coinChange (coins, amount) {

  
  let dp = []
  dp[0] = 0
  for (let i = 1; i <= amount; i++) {
    dp[i] = Infinity
    for (let j = 0; j < coins.length; j++) {
      if (i >= coins[j]) {
        dp[i] = Math.min(dp[i], dp[i - coins[j]] + 1) 
      }
    }
  }

  return dp[amount] === Infinity ? -1 : dp[amount]

}
// @lc code=end

