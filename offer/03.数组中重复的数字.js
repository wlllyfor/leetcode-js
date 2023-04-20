/**
 * 输入：
 * [2, 3, 1, 0, 2, 5, 3]
 * 输出：2 或 3
 */

// function findRepeatNumber(nums) {
//   const map = {};
//   let res;
//   for (let num of nums) {
//     if (map[num] === undefined) {
//       map[num] = true;
//     } else {
//       res = num;
//     }
//   }
//   return res;
// }

function findRepeatNumber(nums) {
  const map = {};
  let res;
  for (let num of nums) {
    if (map[num]) {
      res = num;
      break;
    }
    map[num] = true;
  }
  return res;
}

console.log(findRepeatNumber([2, 3, 1, 0, 2, 5, 3]));
