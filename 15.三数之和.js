/*
 * @lc app=leetcode.cn id=15 lang=javascript
 *
 * [15] 三数之和
 * 
 * 如果数组长度小于3，就直接返回 []
 * 
 * [-1,0,1,2,-1,-4]
 * 
 * 给数组排序
 * 
 * [-4,-1,-1,0,1,2]
 * 
 * 
 * 遍历数组，定义两个指针 l 和 k，j 指向第 i + 1个元素，k 指向最末尾元素
 * 
 *   i  l          r
 * [-4,-1,-1,0,1,2,9]
 * 
 * nums[i] + nums[l] + nums[r] 和 0 作比较
 * nums[i] + nums[l] + nums[r] > 0，说明 r 大了，k 左移
 * nums[i] + nums[l] + nums[r] < 0，说明 l 小了，j 右移
 * nums[i] + nums[l] + nums[r] = 0，找到，记录下来
 * 
 * 注意要去重
 * 
 *  i   l                r
 * [-1, 0,0,0,0,0,1,1,1,1]
 * 
 * 遇到 nums[l] === nums[l+1] l++
 * 遇到 nums[r] === nums[r-1] r++
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function(nums) {
  let res = []
  let len = nums.length
  if (len < 3) {
    return res
  }
  nums.sort((a, b) => a - b)

  for (let i = 0; i < len; i++) {
    if (nums[i] > 0) {
      break
    }

    if (nums[i] === nums[i - 1]) {
      continue
    }
    
    let l = i + 1
    let r = len - 1

    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r]
      if (sum === 0) {
        res.push([nums[i], nums[l], nums[r]])
        while(nums[l] === nums[l + 1]) {
          l++
        }
        while(nums[r] === nums[r - 1]) {
          r--
        }
        r--
      }
      if (sum > 0) {
        r--
      }
      if (sum < 0) {
        l++
      }
      
    }
  }

  return res
  
};
// @lc code=end


