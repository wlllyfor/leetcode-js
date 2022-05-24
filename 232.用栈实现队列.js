/*
 * @lc app=leetcode.cn id=232 lang=javascript
 *
 * [232] 用栈实现队列
 * 
 * [1,2]
 * [2,1]
 * 
 * 1,2
 */

// @lc code=start

function MyQueue () {
  this.stackIn = []
  this.stackOut = []
}

MyQueue.prototype.push = function(x) {
  this.stackIn.push(x)
}

MyQueue.prototype.pop = function() {
  if(this.stackOut.length){
    return this.stackOut.pop()
  }
  while(this.stackIn.length){
    this.stackOut.push(this.stackIn.pop())
  }
  return this.stackOut.pop()
}

MyQueue.prototype.peek = function() {
  let x = this.pop()
  this.stackOut.push(x)
  return x
}

MyQueue.prototype.empty = function() {
  return !this.stackIn.length && !this.stackOut.length
}

class MyQueue {
  constructor () {
    this.stackIn = []
    this.stackOut = []
  }
  push(x) {
    this.stackIn.push(x)
  }
  pop() {
    if(this.stackOut.length){
      return this.stackOut.pop()
    }
    while(this.stackIn.length){
      this.stackOut.push(this.stackIn.pop())
    }
    return this.stackOut.pop()
  }
  peek() {
    let x = this.pop()
    this.stackOut.push(x)
    return x
  }
  empty() {
    return !this.stackIn.length && !this.stackOut.length
  }
}

// @lc code=end

