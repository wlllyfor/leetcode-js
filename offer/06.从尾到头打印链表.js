function reversePrint(head) {
  const res = [];
  while (head) {
    res.unshift(head.val);
    head = head.next;
  }
  return res;
}
