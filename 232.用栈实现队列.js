/*
 * @lc app=leetcode.cn id=232 lang=javascript
 *
 * [232] 用栈实现队列
 * 
 * [1,2]
 * []
 * 
 * 1
 */

// @lc code=start

var MyQueue = function() {
  this.stack1 = []
  this.stack2 = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MyQueue.prototype.push = function(x) {
  this.stack1.push(x)
};

/**
 * @return {number}
 */
MyQueue.prototype.pop = function() {
  while(this.stack1.length) {
    this.stack2.push(this.stack1.pop())
  }
  const res = this.stack2.pop()
  while(this.stack2.length) {
    this.stack1.push(this.stack2.pop())
  }
  return res
};

/**
 * @return {number}
 */
MyQueue.prototype.peek = function() {
  return this.stack1[0]
};

/**
 * @return {boolean}
 */
MyQueue.prototype.empty = function() {
  return !this.stack1.length && !this.stack2.length
};

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */
// @lc code=end

