/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 */

/**
 * 输入 nums = [1,2,3]
 * 输出 [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 * 定义一个 res，代表输出结果
 * 定义一个临时数组 temp，用来暂存存值的过程
 * [1]
 * [1,2]
 * [1,2,3]
 * [1,3]
 * [1,3,2]
 * [2]
 * [2,1]
 * [2,1,3]
 * 
 * 
 * 递归实现，终止条件 nums.length === path.length
 * 遇到一条路走到底的就回退
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */

function backTracking(res, path, nums) {
  if (path.length === nums.length) {
    return res.push([...path]) // 拷贝一下，不然引用类型互相影响
  }
  for (let i = 0; i < nums.length; i++) {
    // 已经添加了就不再添加
    if (path.includes(nums[i])) {
      continue
    }
    path.push(nums[i])
    backTracking(res, path, nums)
    path.pop()
  }
}
function permute(nums) {
  let res = []
  backTracking(res, [], nums)
  return res
}
// @lc code=end

