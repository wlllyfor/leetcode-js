/*
 * @lc app=leetcode.cn id=860 lang=javascript
 *
 * [860] 柠檬水找零
 */

/**
 * 
 * 定义两个变量 five 和 ten 来缓存手里的钱
 * 遍历 bills 
 * 如果 收到 5元，five++
 * 如果收到 10 元，在 cache 中去找一个 5元来补
 * ten++ five--
 * 如果收到 20 元，在 cache 中找 3个5元 或者 1个10元、1个5元
 * five - 3 或者 ten-- five--
 * 
 * [5,5,5,10,20]
 * five 2
 * ten 1
 */


// @lc code=start
/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function(bills) {
  let five = 0, ten = 0
  for (const bill of bills) {
    if (bill === 5) {
      five++
    } else if (bill === 10) {
      if (five < 1) {
        return false
      }
      five--
      ten++
    } else if (bill === 20) {
      if (five > 0 && ten > 0) {
        five--
        ten--
      } else if (five >= 3) {
        five -= 3
      } else {
        return false
      }
    }
  }
  return true
};
// @lc code=end

