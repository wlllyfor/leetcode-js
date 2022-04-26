/*
 * @lc app=leetcode.cn id=93 lang=javascript
 *
 * [93] 复原 IP 地址
 */

// @lc code=start
/**
 * @param {string} s
 * @return {string[]}
 */

function isValidIp (str) {
  if (str.length > 1 && str[0] === '0') {
    return false
  }
  return str >=0 && str <= 255
}
var restoreIpAddresses = function(s) {
  let res = []
  let path = []
  backTrack(0)
  return res
  function backTrack (cur) {
    if (path.length === 4 && path.join('').length === s.length) {
      res.push(path.join('.'))
      return 
    }
    for (let i = cur; i < s.length; i++) {
      const str = s.slice(cur, i + 1)
      if(!isValidIp(str)) {
        continue
      }
      path.push(str)
      backTrack(i + 1)
      path.pop()
    }
  }
};
// @lc code=end

