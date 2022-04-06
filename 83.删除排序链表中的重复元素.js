/*
 * @lc app=leetcode.cn id=83 lang=javascript
 *
 * [83] 删除排序链表中的重复元素
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
 * [1,1,1]
 * 
 * 
 */
var deleteDuplicates = function(head) {
  let tmp = head
  while(tmp && tmp.next) {
    while (tmp.next && tmp.next.val === tmp.val) {
      tmp.next = tmp.next.next
    }
    tmp = tmp.next
  }
  return head
};
// @lc code=end

