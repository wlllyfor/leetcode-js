class MedianFinder {
  constructor() {
    this.arr = []; // 存储数据流中的数
  }
  addNum(num) {
    let left = 0,
      right = this.arr.length - 1;
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      if (this.arr[mid] < num) {
        left = mid + 1;
      } else {
        right = mid - 1;
      }
    }
    this.arr.splice(left, 0, num); // 将 num 插入到合适的位置
  }
  findMedian() {
    let len = this.arr.length;
    if (len % 2 === 0) {
      // 如果是偶数个数，返回中间两个数的平均值
      return (this.arr[len / 2 - 1] + this.arr[len / 2]) / 2;
    } else {
      // 如果是奇数个数，返回中间的数
      return this.arr[Math.floor(len / 2)];
    }
  }
}
