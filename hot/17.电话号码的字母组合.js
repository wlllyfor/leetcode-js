/**
 * @param {string} digits
 * @return {string[]}
 */
function letterCombinations (digits) {
  let len = digits.length
  if (!len) {
    return []
  }
  let res = []
  const arr = ['', '', 'abc', 'def', 'ghi', 'jkl', 'mno', 'pqrs', 'tuv', 'wxyz'] 
  let path = []
  backTrack(0)
  return res
  function backTrack (i) {
    if (path.length === len) {
      res.push(path.join(''))
      return
    }

    let letters = arr[digits[i]]

    for (let char of letters) {
      path.push(char)
      backTrack(i + 1)
      path.pop()
    }
  }
}