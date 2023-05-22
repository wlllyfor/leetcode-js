func mergeTwoLists(l1 *ListNode, l2 *ListNode) *ListNode {
	// 定义虚拟头节点。
	dummy := &ListNode{0, nil}

	// 定义临时链表。
	tmp := dummy

	// 遍历要合并的两个链表
	for l1 != nil && l2 != nil {
		// 两个链表谁的值小就先取谁。
		if l1.Val < l2.Val {
			tmp.Next = l1
			l1 = l1.Next
		} else {
			tmp.Next = l2
			l2 = l2.Next
		}
		tmp = tmp.Next
	}
	// 处理链表长度不一样的情况，当 l1 和 l2 中长度较小的链表遍历完后，再把长度较大的链表合并到 tmp 中去。
	if l1 != nil {
		tmp.Next = l1
	} else {
		tmp.Next = l2
	}
	return dummy.Next
}