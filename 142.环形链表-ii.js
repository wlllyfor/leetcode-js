/*
 * @lc app=leetcode.cn id=142 lang=javascript
 *
 * [142] 环形链表 II
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
 * @return {ListNode}
 * 
 * [1]
 * 
 * -1
 */
var detectCycle = function(head) {
  let arr = []
  let tmp = head
  while (tmp) {
    if (arr.includes(tmp)) {
      return tmp
    }
    arr.push(tmp)
    tmp = tmp.next
  }
  return null
};

// @lc code=end

