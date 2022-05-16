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
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
 function mergeTwoLists (list1, list2) {
  let zero = {
    next: new ListNode()
  }
  let tmp = zero
  while (list1 && list2) {
    if (list1.val <= list2.val) {
      tmp.next = list1
      list1 = list1.next
    } else {
      tmp.next = list2
      list2 = list2.next
    }
    tmp = tmp.next
  }
  tmp.next = list1 ? list1 : list2
  return zero.next
};

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

