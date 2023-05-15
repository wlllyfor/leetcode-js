/**
 * 请实现一个函数用来匹配包含'. '和'*'的正则表达式。
 * 模式中的字符'.'表示任意一个字符，而'*'表示它前面的字符可以出现任意次（含0次）。
 * 在本题中，匹配是指字符串的所有字符匹配整个模式。例如，字符串"aaa"与模式"a.a"和"ab*ac*a"匹配，但与"aa.a"和"ab*a"均不匹配。
 */

function isMatch (s, p) {
  if (s === null || p === null) return false;
  return matchCore(s, 0, p, 0);
};

function matchCore(s, i, p, j) {
  if (i === s.length && j === p.length) return true;
  if (i !== s.length && j === p.length) return false;

  if (p[j + 1] === '*') {
    if (s[i] === p[j] || (p[j] === '.' && i !== s.length)) {
      return matchCore(s, i + 1, p, j + 2) || matchCore(s, i + 1, p, j) || matchCore(s, i, p, j + 2);
    } else {
      return matchCore(s, i, p, j + 2);
    }
  }

  if (s[i] === p[j] || (p[j] === '.' && i !== s.length)) {
    return matchCore(s, i + 1, p, j + 1);
  }

  return false;
}



function isMatch(s, p) {
  const sLen = s.length, pLen = p.length;
  const dp = Array.from({ length: sLen + 1 }, () => Array.from({ length: pLen + 1 }, () => false));
  dp[0][0] = true; // 空字符串和空模式可以匹配
  for (let i = 0; i <= sLen; i++) {
    for (let j = 1; j <= pLen; j++) {
      if (p[j - 1] === '*') {
        // 如果模式 p 的第 j 个字符是 *，那么它可以和它前面的字符一起消失，也可以重复出现多次
        dp[i][j] = dp[i][j - 2] || (i > 0 && (s[i - 1] === p[j - 2] || p[j - 2] === '.') && dp[i - 1][j]);
      } else {
        // 如果模式 p 的第 j 个字符不是 *，那么它必须和字符串 s 的第 i 个字符匹配
        dp[i][j] = i > 0 && dp[i - 1][j - 1] && (s[i - 1] === p[j - 1] || p[j - 1] === '.');
      }
    }
  }
  return dp[sLen][pLen]; // 返回最终的匹配结果
}