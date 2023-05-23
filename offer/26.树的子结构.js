function isSubStructure(A, B) {
  if (!A || !B) {
    return false;
  }
  return isSubTree(A, B) || isSubStructure(A.left, B) || isSubStructure(A.right, B);
}

function isSubTree(A, B) {
  if (!B) {
    return true;
  }
  if (!A || A.val !== B.val) {
    return false;
  }
  return isSubTree(A.left, B.left) && isSubTree(A.right, B.right);
}

