function findMedianSortedArrays(nums1, nums2) {
  const merged = mergeArrays(nums1, nums2); // 合并两个数组
  const n = merged.length;

  if (n % 2 === 0) {
    // 如果合并后的数组长度为偶数
    const mid = n / 2;
    return (merged[mid - 1] + merged[mid]) / 2; // 返回中间两个数的平均值
  } else {
    // 如果合并后的数组长度为奇数
    const mid = Math.floor(n / 2);
    return merged[mid]; // 返回中间的数
  }
}

function mergeArrays(nums1, nums2) {
  const merged = [];
  let i = 0; // nums1 的指针
  let j = 0; // nums2 的指针

  while (i < nums1.length && j < nums2.length) {
    if (nums1[i] < nums2[j]) {
      merged.push(nums1[i]);
      i++;
    } else {
      merged.push(nums2[j]);
      j++;
    }
  }

  while (i < nums1.length) {
    merged.push(nums1[i]);
    i++;
  }

  while (j < nums2.length) {
    merged.push(nums2[j]);
    j++;
  }

  return merged;
}