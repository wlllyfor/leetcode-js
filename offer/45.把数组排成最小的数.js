function minNumber(nums) {
  nums.sort((a, b) => {
    const s1 = a + '' + b;
    const s2 = b + '' + a;
    return s1.localeCompare(s2);
  });
  return nums.join('');
}