/*
 * @lc app=leetcode.cn id=206 lang=javascript
 *
 * [206] 反转链表
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
 *  pre  cur  next      
 * null    1 -> 2 -> 3 -> 4 -> 5
 * 
 *        pre  cur next
 * null <- 1    2 -> 3 -> 4 -> 5
 * 
 *                        pre cur
 * null <- 1 <- 2 <- 3 <- 4 <- 5
 * 
 * 
 */
// function reverseList (head) {
//   let cur = null
//   let tmp = head
//   while(tmp) {
//     let next = tmp.next
//     tmp.next = cur
//     cur = tmp
//     tmp = next
//   }
//   return cur
// }

function reverseList (head) {
  let pre = null
  let cur = head
  while(cur) {
    let next = cur.next
    cur.next = pre
    pre = cur
    cur = next
  }
  return pre
}
// @lc code=end

