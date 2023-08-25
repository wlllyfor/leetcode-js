/**
 * @param {string} s
 * @return {string}
 */
function longestPalindrome(s) {
  const n = s.length;
  let maxLength = 1; // 最长回文子串的长度
  let start = 0; // 最长回文子串的起始位置

  // 创建一个二维数组 dp，用于记录子串是否为回文
  const dp = Array.from(Array(n), () => Array(n).fill(false));

  // 单个字符都是回文
  for (let i = 0; i < n; i++) {
    dp[i][i] = true;
  }

  // 遍历字符串，从长度为 2 的子串开始判断
  for (let len = 2; len <= n; len++) {
    for (let i = 0; i < n - len + 1; i++) {
      const j = i + len - 1; // 子串的结束位置

      // 如果子串的首尾字符相同，并且子串的内部也是回文，则该子串是回文
      if (s[i] === s[j] && (len === 2 || dp[i + 1][j - 1])) {
        dp[i][j] = true;

        // 更新最长回文子串的长度和起始位置
        if (len > maxLength) {
          maxLength = len;
          start = i;
        }
      }
    }
  }

  // 根据最长回文子串的起始位置和长度，截取出最长回文子串
  return s.substring(start, start + maxLength);
}