/*
 * @lc app=leetcode.cn id=344 lang=javascript
 *
 * [344] 反转字符串
 * 
 *   i               j
 * ["h","e","l","l","o"]
 */

// @lc code=start
/**
 * @param {character[]} s
 * @return {void} Do not return anything, modify s in-place instead.
 */
function reverseString (s) {
  let left = 0, right = s.length - 1
  while (left < right) {
    [s[left], s[right]] = [s[right], s[left]]
    left++
    right--
  }
  return s
};
// @lc code=end

function reverseString (s) {
  return s.reverse()
};

function reverseString (s) {
  for (let i = 0, j = s.length - 1; i < j; i++, j--) {
    [s[i], s[j]] = [s[j], s[i]]
  }
  return s
}

function reverseString (s) {
  let tmp, left = 0, right = s.length - 1

  while (left < right) {
    tmp = s[left]
    s[left] = s[right]
    s[right] = tmp
    left++
    right--
  }
  return s
}