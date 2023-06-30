function reversePairs(nums) {
  let count = 0;
  mergeSort(nums);
  return count;

  function mergeSort(arr) {
    if (arr.length < 2) {
      return arr;
    }
    const mid = Math.floor(arr.length / 2);
    const left = arr.slice(0, mid);
    const right = arr.slice(mid);
    return merge(mergeSort(left), mergeSort(right));
  }

  function merge(left, right) {
    let i = 0;
    let j = 0;
    const result = [];
    while (i < left.length && j < right.length) {
      if (left[i] <= right[j]) {
        result.push(left[i]);
        i++;
      } else {
        result.push(right[j]);
        j++;
        count += left.length - i;
      }
    }
    return result.concat(i < left.length ? left.slice(i) : right.slice(j));
  }
}