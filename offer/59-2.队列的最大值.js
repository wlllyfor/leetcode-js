var MaxQueue = function() {
  this.queue = []; // 队列
  this.deque = []; // 双端队列
};

/**
 * @return {number}
 */
MaxQueue.prototype.max_value = function() {
  if (this.deque.length === 0) {
    return -1;
  }
  return this.deque[0];
};

/** 
 * @param {number} value
 * @return {void}
 */
MaxQueue.prototype.push_back = function(value) {
  this.queue.push(value);
  while (this.deque.length > 0 && value > this.deque[this.deque.length - 1]) {
    this.deque.pop();
  }
  this.deque.push(value);
};

/**
 * @return {number}
 */
MaxQueue.prototype.pop_front = function() {
  if (this.queue.length === 0) {
    return -1;
  }
  const value = this.queue.shift();
  if (value === this.deque[0]) {
    this.deque.shift();
  }
  return value;
};