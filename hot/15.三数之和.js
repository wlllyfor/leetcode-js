/**
 * @param {number[]} nums
 * @return {number[][]}
 */
function threeSum (nums) {
  let res = []
  let len = nums.length

  // 处理边界情况，数组长度小于 3，直接返回空数组。
//   if (len < 3) {
//     return res
//   }

  nums.sort((a, b) => a - b)

  for (let i = 0; i < len - 2; i++) {
    
    // 循环过程中 nums[i] 如果大于 0 ，就直接跳出循环。
    if (nums[i] > 0) {
      break
    }

    // 去重。
    if (nums[i] === nums[i - 1]) {
      continue
    }
    
    let left = i + 1
    let right = len - 1

    while (left < right) {
      const sum = nums[i] + nums[left] + nums[right]
      if (sum === 0) {
        res.push([nums[i], nums[left], nums[right]])

        // 去重。
        while(nums[left] === nums[left + 1]) {
          left++
        }

        // 去重。
        while(nums[right] === nums[right - 1]) {
          right--
        }
        right--
      }
      if (sum > 0) {
        right--
      }
      if (sum < 0) {
        left++
      }
      
    }
  }

  return res
}