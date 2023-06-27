function lengthOfLongestSubstring(s) {
  let left = 0, right = 0;
  let maxLen = 0;
  const set = new Set();

  while (right < s.length) {
    if (!set.has(s[right])) {
      set.add(s[right]);
      right++;
      maxLen = Math.max(maxLen, set.size);
    } else {
      set.delete(s[left]);
      left++;
    }
  }

  return maxLen;
}