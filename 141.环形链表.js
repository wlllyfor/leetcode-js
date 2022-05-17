/*
 * @lc app=leetcode.cn id=141 lang=javascript
 *
 * [141] 环形链表
 */

// @lc code=start
/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 * 
 */
// function hasCycle (head) {
//   let slow = fast = head
//   while (fast && fast.next) {
//     slow = slow.next
//     fast = fast.next.next
//     if (fast === slow) {
//       return true
//     }
//   }
//   return false
// }

// function hasCycle (head) {
//   let map = new Map()
//   while (head) {
//     if (map.has(head)) {
//       return true
//     } 
//     map.set(head, true)
//     head = head.next
//   }
//   return false
// }
// @lc code=end

