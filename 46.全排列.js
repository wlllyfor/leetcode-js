/*
 * @lc app=leetcode.cn id=46 lang=javascript
 *
 * [46] 全排列
 */

/**
 * 输入 nums = [1,2,3]
 * 输出 [[1,2,3],[1,3,2],[2,1,3],[2,3,1],[3,1,2],[3,2,1]]
 * [1]
 * [1,2]
 * [1,2,3]
 * [1,3]
 * [1,3,2]
 * [2]
 * [2,1]
 * [2,1,3]
 * 
 * 后悔药
 * 
 * 
 * 递归实现，终止条件 nums.length === path.length
 * 遇到一条路走到底的就回退
 * 
 * 回溯模板
 * 需要返回全部路径的类型
 * 
 * 
 *   function backTrack (缓存路径，数据) {
 *     if (递归终止条件) {
 *       存放结果
 *       return
 *     }
 *     for (循环数据) {
 *       选择一个值，添加进缓存路径
 *       backTrack(缓存路径，数据)
 *       回退，撤回选择的数据
 *     }
 *   }
 * 
 * 
 * 
 * 
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @return {number[][]}
 */

// function permute (nums) {
//   let path = []
//   let res = []
//   return backTrack(res, path, nums)

// }
// function backTrack(res, path, nums) {
//   if (path.length === nums.length) {
//     res.push([...path])
//     return 
//   }

//   for (let num of nums) {
//     if (path.includes(num)) {
//       continue
//     }
//     path.push(num)
//     backTrack(res, path, nums)
//     path.pop()
//   }
//   return res
// }

// function permute(nums) {
//   let res = [], path = []

//   backTrack()

//   return res

//   function backTrack () {
//     if (path.length === nums.length) {
//       return res.push([...path])
//     }

//     for (let num of nums) {
//       if (path.includes(num)) {
//         continue
//       }

//       path.push(num)
//       backTrack()
//       path.pop()
//     }

//   }
// }

 function permute(nums) {
  let res = []
  let path = []
  let used = {}

  backTrack()

  return res
  function backTrack () {
    if (path.length === nums.length) {
      return res.push([...path])
    }

    for (let num of nums) {
      if (used[num]) {
        continue
      }

      path.push(num)
      used[num] = true
      backTrack()
      path.pop()
      used[num] = false
    }

  }
  
}


// @lc code=end

