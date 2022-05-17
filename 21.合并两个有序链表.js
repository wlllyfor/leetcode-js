/*
 * @lc app=leetcode.cn id=21 lang=javascript
 *
 * [21] 合并两个有序链表
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
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
function mergeTwoLists (l1, l2) {
  let dummy = {
    next: null
  }
  let tmp = dummy
  while (l1 && l2) {
    if (l1.val <= l2.val) {
      tmp.next = l1
      l1 = l1.next
    } else {
      tmp.next = l2
      l2 = l2.next
    }
    tmp = tmp.next
  }
  tmp.next = l1 ? l1 : l2
  return dummy.next
}

// function mergeTwoLists(l1, l2) {
//   if (!l1) {
//     return l2
//   } else if (!l2) {
//     return l1
//   } else if (l1.val <= l2.val) {
//     l1.next = mergeTwoLists(l1.next, l2)
//     return l1
//   } else {
//     l2.next = mergeTwoLists(l1, l2.next)
//     return l2
//   }
// }
// @lc code=end

