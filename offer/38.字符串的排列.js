function permutation(s) {
  const result = [];

  function backtrack(str, arr, used) {
    if (str.length === s.length) {
      result.push(str);
      return;
    }

    for (let i = 0; i < arr.length; i++) {
      if (used[i] || (i > 0 && arr[i] === arr[i - 1] && !used[i - 1])) {
        continue;
      }
      used[i] = true;
      backtrack(str + arr[i], arr, used);
      used[i] = false;
    }
  }

  const arr = s.split('').sort();
  const used = new Array(arr.length).fill(false);
  backtrack('', arr, used);
  return result;
}