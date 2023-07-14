function findContinuousSequence(target) {
  const result = [];
  let left = 1;
  let right = 2;
  while (left < right) {
    const sum = (left + right) * (right - left + 1) / 2;
    if (sum === target) {
      const sequence = [];
      for (let i = left; i <= right; i++) {
        sequence.push(i);
      }
      result.push(sequence);
      left++;
    } else if (sum < target) {
      right++;
    } else {
      left++;
    }
  }
  return result;
}