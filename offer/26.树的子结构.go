func isSubStructure(A *TreeNode, B *TreeNode) bool {
	if A == nil || B == nil {
		return false
	}
	return isSubTree(A, B) || isSubStructure(A.Left, B) || isSubStructure(A.Right, B)
}

func isSubTree(A *TreeNode, B *TreeNode) bool {
	if B == nil {
		return true
	}
	if A == nil || A.Val != B.Val {
		return false
	}
	return isSubTree(A.Left, B.Left) && isSubTree(A.Right, B.Right)
}