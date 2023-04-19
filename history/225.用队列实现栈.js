/*
 * @lc app=leetcode.cn id=225 lang=javascript
 *
 * [225] 用队列实现栈
 * 
 * [1,2,3,4]
 * []
 * 
 * 
 * [2,3,4]
 * [1]
 * 
 * 
 * [3,4]
 * [1,2]
 * 
 * [4]
 * [1,2,3]
 * 
 * 
 * []
 * [1,2,3]
 * 4
 * 
 * [1,2,3]
 * []
 * 4
 * 
 * [2,3]
 * [1]
 * 4
 * 
 * [3]
 * [1,2]
 * 4
 * 
 * []
 * [1,2]
 * 4,3
 * 
 * [1,2]
 * []
 * 4,3
 * 
 * [2]
 * [1]
 * 4,3
 * 
 * []
 * [1]
 * 4,3,2
 * 
 * 
 * [1]
 * []
 * 4,3,2
 * 
 * 
 * []
 * []
 * 4,3,2,1
 * 
 * 
 * 
 * 
 * 
 */

// @lc code=start

var MyStack = function() {
  this.queue1 = []
  this.queue2 = []
};

/** 
 * @param {number} x
 * @return {void}
 */
MyStack.prototype.push = function(x) {
  this.queue1.push(x)
};

/**
 * @return {number}
 */
MyStack.prototype.pop = function() {
  if (!this.queue1.length) {
    [this.queue1, this.queue2] = [this.queue2, this.queue1]
  }
  while(this.queue1.length > 1) {
    this.queue2.push(this.queue1.shift())
  }
  
  return this.queue1.shift()
};

/**
 * @return {number}
 */
MyStack.prototype.top = function() {
  const x = this.pop()
  this.queue1.push(x)
  return x
};

/**
 * @return {boolean}
 */
MyStack.prototype.empty = function() {
  return !this.queue1.length && !this.queue2.length
};


/**
 * [1,2,3]
 */
// var MyStack = function() {
//   this.queue = []
// };

// /** 
//  * @param {number} x
//  * @return {void}
//  */
// MyStack.prototype.push = function(x) {
//   this.queue.push(x)
// };

// /**
//  * @return {number}
//  */
// MyStack.prototype.pop = function() {
//   let len = this.queue.length
//   let res = len ? this.queue[len - 1] : null
//   this.queue = this.queue.slice(0, len - 1)
//   return res
// };

// /**
//  * @return {number}
//  */
// MyStack.prototype.top = function() {
//   let len = this.queue.length
//   return len ? this.queue[len - 1] : null
// };

// /**
//  * @return {boolean}
//  */
// MyStack.prototype.empty = function() {
//   return !this.queue.length
// };

/**
 * Your MyStack object will be instantiated and called as such:
 * var obj = new MyStack()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.empty()
 */
// @lc code=end

