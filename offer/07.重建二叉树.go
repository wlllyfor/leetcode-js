func buildTree(preorder []int, inorder []int) *TreeNode {
	if len(preorder) == 0 || len(inorder) == 0 {
		return nil
	}
	rootVal := preorder[0]
	root := &TreeNode{
		Val:   rootVal,
		Left:  nil,
		Right: nil,
	}
	rootIndex := 0
	for i, val := range inorder {
		if val == rootVal {
			rootIndex = i
			break
		}
	}
	leftInorder := inorder[:rootIndex]
	rightInorder := inorder[rootIndex+1:]

	leftPreorder := preorder[1 : rootIndex+1]
	rightPreorder := preorder[rootIndex+1:]

	root.Left = buildTree(leftPreorder, leftInorder)
	root.Right = buildTree(rightPreorder, rightInorder)
	return root
}