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
    head = head.next
    len++
  }
  return len
}
function removeNthFromEnd (head, n) {
  let len = getLength(head)
  let dummy = {
    next: head
  }
  let tmp = dummy
  let i = 0
  while(tmp) {
    if (len - n === i) {
      tmp.next = tmp.next.next
      break
    }
    tmp = tmp.next
    i++
  }
  return dummy.next
}

/**
 * i j
 * zero 1 2 3 4 5   n = 2
 *  
 * 快慢指针，快指针先移动到 n 的位置
 * 
 * 然后快慢指针一起移动，当快指针移动到链表末尾时，慢指针的位置就是 n 的位置
 * 
 */
/**
 * 2
 *     i
 * 0 1 2 3 4 5
 * j
 * 
 * 1
 * 
 * 0 1
 */
function removeNthFromEnd(head, n) {
  let dummy = {
    next: head
  }
  let slow = fast = dummy
  while (n--) {
    fast = fast.next
  }
  while (fast.next) {
    slow = slow.next
    fast = fast.next
  }
  slow.next = slow.next.next
  return dummy.next
}
// @lc code=end
