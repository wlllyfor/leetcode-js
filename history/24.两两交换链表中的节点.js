/*
 * @lc app=leetcode.cn id=24 lang=javascript
 *
 * [24] 两两交换链表中的节点
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
 * 
 */
// function swapPairs (head) {
//   let dummy = {
//     next: head
//   }
//   let tmp = dummy
//   while(tmp && tmp.next && tmp.next.next) {
//     const node1 = tmp.next
//     const node2 = tmp.next.next

//     node1.next = node1.next.next

//     tmp.next = node2
//     node2.next = node1

//     tmp = tmp.next.next
//   }
//   return dummy.next
// }

function swapPairs (head) {
  let dummy = {
    next: head
  }
  let tmp = dummy
  while(tmp && tmp.next && tmp.next.next) {
    const node1 = tmp.next
    const node2 = tmp.next.next

    node1.next = node2.next

    tmp.next = node2
    node2.next = node1

    tmp = node1
  }
  return dummy.next
}
// @lc code=end

