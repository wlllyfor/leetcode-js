/*
 * @lc app=leetcode.cn id=71 lang=javascript
 *
 * [71] 简化路径
 */

// @lc code=start
/**
 * @param {string} path
 * @return {string}
 * 
 * /a//./b/../../c/
 * 
 * arr [a, '.', b, '..', '..', c]
 * 
 * stack [c]
 */
function simplifyPath (path) {
  let stack = []
  let arr = path.split('/')
  while(arr.length) {
    let item = arr.shift()
    if (item === '..') {
      stack.pop()
    } else if (item && item !== '.' ) {
      stack.push(item)
    }
  }
  return '/' + stack.join('/')
}
// @lc code=end

