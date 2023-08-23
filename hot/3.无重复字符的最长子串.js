function lengthOfLongestSubstring(s) {
  let maxLength = 0; // 最长子串的长度
  let start = 0; // 子串的起始位置
  let charMap = new Map(); // 用于存储字符和其在字符串中的索引位置

  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (charMap.has(char) && charMap.get(char) >= start) {
      // 如果字符已经在子串中出现过，并且出现的位置在当前子串的起始位置之后
      start = charMap.get(char) + 1; // 更新子串的起始位置为重复字符的下一个位置
    }
    charMap.set(char, i); // 存储字符和其索引位置
    maxLength = Math.max(maxLength, i - start + 1); // 更新最长子串的长度
  }

  return maxLength;
}