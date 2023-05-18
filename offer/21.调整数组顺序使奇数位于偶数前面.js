function exchange (nums) {
  const arr = [];
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] % 2 === 1) {
      arr.unshift(nums[i]);
    } else { 
      arr.push(nums[i]);
    }
  }
  return arr;
};


function exchange(nums) {
  let left = 0;
  let right = nums.length - 1;

  while (left < right) {
    // 判断左边是否为奇数，如果是，就跳过
    if ((nums[left] & 1) !== 0) {
      left++;
      continue;
    }
    // 判断右边是否为偶数，如果是，就跳过
    if ((nums[right] & 1) !== 1) {
      right--;
      continue;
    }
    // 交换
    [nums[left], nums[right]] = [nums[right], nums[left]];
    left++;
    right--;
  }

  return nums;
}

function exchange(nums) {
  let low = 0;
  let fast = 0;

  while (fast < nums.length) {
    // 快指针为奇数，就和慢指针交换位置
    if (nums[fast] & 1) {
      [nums[low], nums[fast]] = [nums[fast], nums[low]];
      low++;
    }
    fast++;
  }

  return nums;
}