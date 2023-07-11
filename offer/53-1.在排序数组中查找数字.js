function search(nums, target) {
  const helper = (tar) => {
    let i = 0;
    let j = nums.length - 1;

    while (i <= j) {
      const m = Math.floor((i + j) / 2);

      if (nums[m] <= tar) {
        i = m + 1;
      } else {
        j = m - 1;
      }
    }

    return i;
  };

  return helper(target) - helper(target - 1);
}