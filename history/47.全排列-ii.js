/*
 * @lc app=leetcode.cn id=47 lang=javascript
 *
 * [47] 全排列 II
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */

/**
 * used []
 * 
 * [1,1,2]
 * 
 * nums[i] === nums[i - 1] && !used[i - 1]
 * 
 * 相等，前一个数没用过，
 */
function permuteUnique (nums) {

  nums.sort((a, b) => a - b)

  let res = []
  let path = []
  let used = []
  backTrack([])

  return res
  function backTrack () {
    if (path.length === nums.length) {
      res.push([...path])
      return 
    }
    for (let i = 0; i < nums.length; i++) {

      if (nums[i] === nums[i - 1] && used[i - 1]) {
        continue
      }
      if (!used[i]) {
        path.push(nums[i])
        used[i] = true
        backTrack()
        path.pop()
        used[i] = false
      }
    }
  }
}
// @lc code=end

