/*
 * @lc app=leetcode.cn id=933 lang=javascript
 *
 * [933] 最近的请求次数
 */

// @lc code=start



class RecentCounter {
  constructor () {
    this.queue = []
  }
  ping(t) {
    this.queue.push(t)
    while (this.queue[0] + 3000 < t) {
      this.queue.shift()
    }
    return this.queue.length
  }
}

/**
 * Your RecentCounter object will be instantiated and called as such:
 * var obj = new RecentCounter()
 * var param_1 = obj.ping(t)
 */
// @lc code=end

