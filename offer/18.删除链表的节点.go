func deleteNode(head *ListNode, val int) *ListNode {
	// 定义虚拟头节点，next 指向原链表头节点。
	dummy := &ListNode{0, head}

	// 把 dummy 节点赋值给临时节点。
	tmp := dummy

	// 还是遍历临时链表，操作临时链表。
	for tmp != nil && tmp.Next != nil {
		if tmp.Next.Val == val {
			tmp.Next = tmp.Next.Next
		} else {
			tmp = tmp.Next
		}
	}

	// 最后返回虚拟头节点的 next 节点。
	return dummy.Next
}