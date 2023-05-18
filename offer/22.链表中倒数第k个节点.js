function getKthFromEnd(head, k) {
  let fast = head;
  let slow = head;
  for (let i = 0; i < k; i++) {
    if (fast === null) {
      return null; // 如果链表长度小于 k，返回 null
    }
    fast = fast.next;
  }
  while (fast !== null) {
    fast = fast.next;
    slow = slow.next;
  }
  return slow;
}