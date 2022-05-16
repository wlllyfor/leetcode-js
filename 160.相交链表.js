/*
 * @lc app=leetcode.cn id=160 lang=javascript
 *
 * [160] 相交链表
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
 * @param {ListNode} headA
 * @param {ListNode} headB
 * @return {ListNode}
 * 
 */
function getLength (head) {
  let len = 0
  while(head) {
    head = head.next
    len++
  }
  return len
}
var getIntersectionNode = function(headA, headB) {
    let aLen = getLength(headA)
    let bLen = getLength(headB)
    let longerHead = aLen > bLen ? headA: headB
    let shorterHead =  aLen > bLen ? headB: headA

    let gap = aLen > bLen ? aLen - bLen : bLen - aLen

    while(gap) {
      longerHead = longerHead.next
      gap--
    }
    let zero1 = {
      next: longerHead
    }
    let zero2 = {
      next: shorterHead
    }
    while(zero1) {
      if (zero1.next === zero2.next) {
        return zero1.next
      }
      zero1 = zero1.next
      zero2 = zero2.next
    }
    return null
};

function getIntersectionNode (headA, headB) {
  let curA = headA
  let curB = headB
  while(curA !== curB){
    curA = curA === null ? headB : curA.next
    curB = curB === null ? headA : curB.next
  }
  return curA
};
// @lc code=end

