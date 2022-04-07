/*
 * @lc app=leetcode.cn id=234 lang=javascript
 *
 * [234] 回文链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function(head) {
  let arr = []
  while(head) {
    arr.push(head.val)
    head = head.next
  }
  let l = 0, r = arr.length - 1
  while(l < r) {
    if (arr[l] !== arr[r]) {
      return false
    }
    l++
    r--
  }
  return true
};
// @lc code=end

