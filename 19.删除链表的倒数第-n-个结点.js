/*
 * @lc app=leetcode.cn id=19 lang=javascript
 *
 * [19] 删除链表的倒数第 N 个结点
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
 * @param {number} n
 * @return {ListNode}
 */

function getLength (head) {
  let len = 0
  while(head) {
    head  = head.next
    len++
  }
  return len
}
/**
 * 1 2 3 4 5 n = 2
 *   
 * s 5 4 3 2 1 
 * [1,2]
 * 
 * s 2 1    n = 1
 */
var removeNthFromEnd = function(head, n) {
  let len = getLength(head)
  let zero = {
    next: head
  }
  let tmp = zero
  let i = 0
  while(tmp) {
    if (len - n === i) {
      tmp.next = tmp.next.next
    }
    tmp = tmp.next
    i++
  }
  return zero.next
};
// @lc code=end

