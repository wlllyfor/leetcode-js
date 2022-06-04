/*
 * @lc app=leetcode.cn id=239 lang=javascript
 *
 * [239] 滑动窗口最大值
 */

// @lc code=start
/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
function maxSlidingWindow (nums, k) {
  const res = []
  for (let i = 0; i <= nums.length - k; i++) {
    let max = -Infinity
    for (let j = i; j < i + k; j++) {
      max = Math.max(max, nums[j])
    }
    res.push(max)
  }
  return res
}

function maxSlidingWindow (nums, k) {
  const queue = [];//单递减的双端队列
  const res = [];//最后的返回结果
  for (let i = 0; i < nums.length; i++) {//循环nums
      //当进入滑动窗口的元素大于等于队尾的元素时 不断从队尾出队，
      //直到进入滑动窗口的元素小于队尾的元素，以保证单调递减的性质
      while (queue.length && nums[i] >= nums[queue[queue.length - 1]]) {
          queue.pop();
      }
      queue.push(i);//元素的索引入队
      while (queue[0] <= i - k) {//队头元素已经在滑动窗口外了，移除队头元素
          queue.shift();
      }
      //当i大于等于k-1的时候，单调递减队头就是滑动窗口的最大值
      if (i >= k - 1) res.push(nums[queue[0]]);
      console.log(queue)
  }
  return res;
};

// @lc code=end


// [ 7 ]
// [ 7, 2 ]
// [ 7, 4 ]