/*
 * @lc app=leetcode.cn id=455 lang=javascript
 *
 * [455] 分发饼干
 */

/**
 * 给 g 排序和 s 排序
 * 先满足小的，再满足大的
 * 
 * 初始化满足的小朋友数量为 count，初始化 i = 0
 * 
 * 每次取 s[0]
 * 
 * [1,2,3]
 * [1,1]
 * 
 * s[0] >= g[i] 的话
 * 
 * i++  count++   s.shift()
 * 
 * [2,3]
 * [1,2]
 * 
 * s[0] < g[i] 的话
 * 
 * s.shift()
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} g
 * @param {number[]} s
 * @return {number}
 */
var findContentChildren = function(g, s) {
  g.sort((a, b) => a - b)
  s.sort((a, b) => a - b)
  let count = 0
  let i = 0

  while(s.length && count < g.length) {
    const item = s[0]
    if (g[i] <= item) {
      i++
      count++
      s.shift()
    } else {
      s.shift()
    }
  }

  return count
};
// @lc code=end

