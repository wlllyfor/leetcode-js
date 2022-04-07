/*
 * @lc app=leetcode.cn id=876 lang=javascript
 *
 * [876] 链表的中间结点
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
 * @return {ListNode}
 * 
 * [1,2,3,4,5]
 * 1 1
 * 2 2
 * 3 2
 * 4 3
 */

// function getLength(head) {
//   let len = 0
//   while(head) {
//     head = head.next
//     len++
//   }
//   return len
// }
// var middleNode = function(head) {
//   let len = getLength(head)
//   let mid = Math.floor(len / 2) + 1
//   let zero = {
//     next: head
//   }
//   while(mid) {
//     zero = zero.next
//     mid--
//   }
//   return zero
// };

function middleNode (head) {
  let fast = slow = head
  while(fast && fast.next) {
    fast = fast.next.next
    slow = slow.next
  }
  return slow
}

// @lc code=end

