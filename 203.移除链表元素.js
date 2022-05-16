/*
 * @lc app=leetcode.cn id=203 lang=javascript
 *
 * [203] 移除链表元素
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
 * @param {number} val
 * @return {ListNode}
 * 
 * [7,7,7,7]
 */
function removeElements (head, val) {
  let zero = {
    next: head
  }
  let tmp = zero
  while(tmp && tmp.next) {
    if (tmp.next.val === val) {
      tmp.next = tmp.next.next
    } else {
      tmp = tmp.next
    }
  }
  return zero.next
};
// @lc code=end

