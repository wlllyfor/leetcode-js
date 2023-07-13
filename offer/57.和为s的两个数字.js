function twoSum (nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [complement, nums[i]];
    }
    map.set(nums[i], i);
  }
  return null;
};

function twoSum (nums, target) {
  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    const sum = nums[left] + nums[right];
    if (sum === target) {
      return [nums[left], nums[right]];
    } else if (sum > target) {
      right--;
    } else {
      left++;
    }
  }
  return null;
};