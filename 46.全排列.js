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
 * 
 * 回溯模板
 * 1.需要返回全部路径的类型
 * 
 * 
 * function fn (arr) {
 *   let res = []
 *   backTrack(res, path, arr)
 * 
 *   function backTrack (res, path, arr) {
 * 
 *    递归终止条件
 *     return res.push([...path])
 *  
 *    for (let i = 0; i < arr.length; i++) {
 *     
 *      选择一个值，添加进路径
 *      backTrack(res, path, arr)
 *      回退，撤回选择的数据
 * 
 *    }
 *   }
 *   return res
 * }
 * 
 * 2.不需要全部路径，只需要 true 或 false
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */

function permute(nums) {
  let res = [], path = []

  backTrack(nums)

  function backTrack (nums) {
    if (path.length === nums.length) {
      return res.push([...path])
    }

    for (let i = 0; i < nums.length; i++) {
      if (path.includes(nums[i])) {
        continue
      }

      path.push(nums[i])
      backTrack(nums)
      path.pop()
    }

  }
  return res
}
// @lc code=end

