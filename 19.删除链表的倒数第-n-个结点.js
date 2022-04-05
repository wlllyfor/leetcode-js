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
 *
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

/**
 * i j
 * zero 1 2 3 4 5   n = 2
 *  
 * 快慢指针，快指针先移动到 n 的位置
 * 
 * 然后快慢指针一起移动，当快指针移动到链表末尾时，慢指针的位置就是 n 的位置
 * 
 */
function removeNthFromEnd(head, n) {
  let zero = {
    next: head
  }
  let slow = fast = zero
  while (n) {
    fast = fast.next
    n--
  }
  while (fast) {
    slow = slow.next
    fast = fast.next
  }
  slow.next = slow.next.next
  return zero.next
}
// @lc code=end

