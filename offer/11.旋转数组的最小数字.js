// [3,4,5,1,2]
// [4,5,1,2,3]
// [5,1,2,3,4]
// [1,2,3,4,5]
// [2,3,4,5,1]
// [3,1,3]
// [1]
// [1,1]
function minArray(numbers) {
  let left = 0;
  let right = numbers.length - 1;
  while (numbers[left] >= numbers[right] && left < right) {
    left++;
  }
  return numbers[left];
}
