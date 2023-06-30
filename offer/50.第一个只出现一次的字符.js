function firstUniqChar(s) {
  const map = new Map();
  for (let i = 0; i < s.length; i++) {
    const c = s.charAt(i);
    map.set(c, (map.get(c) || 0) + 1);
  }
  for (let i = 0; i < s.length; i++) {
    const c = s.charAt(i);
    if (map.get(c) === 1) {
      return c;
    }
  }
  return ' ';
}
