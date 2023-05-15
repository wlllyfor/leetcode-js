func isMatch(s string, p string) bool {
	if s == "" && p == "" {
		return true
	}
	if p == "" {
		return false
	}
	if len(p) > 1 && p[1] == '*' {
		if len(s) > 0 && (s[0] == p[0] || p[0] == '.') {
			return isMatch(s[1:], p[2:]) || isMatch(s[1:], p) || isMatch(s, p[2:])
		} else {
			return isMatch(s, p[2:])
		}
	}
	if len(s) > 0 && (s[0] == p[0] || p[0] == '.') {
		return isMatch(s[1:], p[1:])
	}
	return false
}

func isMatch(s string, p string) bool {
	sLen, pLen := len(s), len(p)
	dp := make([][]bool, sLen+1)
	for i := 0; i <= sLen; i++ {
		dp[i] = make([]bool, pLen+1)
	}
	dp[0][0] = true // 空字符串和空模式可以匹配
	for i := 0; i <= sLen; i++ {
		for j := 1; j <= pLen; j++ {
			if p[j-1] == '*' {
				// 如果模式 p 的第 j 个字符是 *，那么它可以和它前面的字符一起消失，也可以重复出现多次
				dp[i][j] = dp[i][j-2] || (i > 0 && (s[i-1] == p[j-2] || p[j-2] == '.') && dp[i-1][j])
			} else {
				// 如果模式 p 的第 j 个字符不是 *，那么它必须和字符串 s 的第 i 个字符匹配
				dp[i][j] = i > 0 && dp[i-1][j-1] && (s[i-1] == p[j-1] || p[j-1] == '.')
			}
		}
	}
	return dp[sLen][pLen] // 返回最终的匹配结果
}