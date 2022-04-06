/*
 * @lc app=leetcode.cn id=92 lang=javascript
 *
 * [92] 反转链表 II
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
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 * 
 * 
 *    pre   l     r   next
 * [1, 2,   3,4,5,6,   7]
 * 
 * 
 */

function reverseList(head) {
  let pre = null
  let tmp = head
  while(tmp) {
    let next = tmp.next
    tmp.next = pre
    pre = tmp
    tmp = next
  }
  return pre
}

var reverseBetween = function(head, left, right) {
  let zero = {
    next: head
  }
  let pre = zero

  for (let i = 0; i < left - 1; i++) {
    pre = pre.next
  }
  
  let r = pre
  for (let i = 0; i < right - left + 1; i++) {
    r = r.next
  }

  let l = pre.next
  let end = r.next

  pre.next = null
  r.next = null

  reverseList(l)

  pre.next = r
  l.next = end
  return zero.next
};
// @lc code=end

