function sortArray(arr, target) {
  const set = new Set(target);
  arr.sort((a, b) => {
    if (set.has(a.value) && set.has(b.value)) {
      return 0;
    } else if (set.has(a.value)) {
      return -1;
    } else if (set.has(b.value)) {
      return 1;
    } else {
      return 0;
    }
  });
  return arr;
}

const arr = [
  {
    value: 2,
  },
  {
    value: 4,
  },
  {
    value: 1,
  },
  {
    value: 3,
  },
  {
    value: 5,
  }
];

console.log(sortArray(arr, [2,4]))