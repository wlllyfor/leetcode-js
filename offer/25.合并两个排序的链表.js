function mergeTwoLists(l1, l2) {
  // 定义虚拟头节点。
  let dummy = {
    next: null,
  };

  // 定义临时链表。
  let tmp = dummy;

  // 遍历要合并的两个链表
  while (l1 && l2) {
    // 两个链表谁的值小就先取谁。
    if (l1.val < l2.val) {
      tmp.next = l1;
      l1 = l1.next;
    } else {
      tmp.next = l2;
      l2 = l2.next;
    }
    tmp = tmp.next;
  }
  // 处理链表长度不一样的情况，当 l1 和 l2 中长度较小的链表遍历完后，再把长度较大的链表合并到 tmp 中去。
  tmp.next = l1 ? l1 : l2;
  return dummy.next;
}