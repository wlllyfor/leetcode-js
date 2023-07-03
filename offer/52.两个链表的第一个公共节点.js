function getIntersectionNode(headA, headB) {
  let pA = headA
  let pB = headB

  while (pA !== pB) {
    pA = pA ? pA.next : headB // 如果 pA 到达链表 headA 的尾部，则将其指向链表 headB 的头节点
    pB = pB ? pB.next : headA // 如果 pB 到达链表 headB 的尾部，则将其指向链表 headA 的头节点
  }

  return pA // 返回第一个公共节点
}