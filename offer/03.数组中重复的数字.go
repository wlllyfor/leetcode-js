func findRepeatNumber(nums []int) int {
    obj := make(map[int]bool)
    var res int
    for _, num := range nums {
        if _, ok := obj[num]; !ok {
            obj[num] = true
        } else {
            res = num
        }
    }
    return res
}

func findRepeatNumber(nums []int) int {
    obj := make(map[int]bool)
    var res int
    for _, num := range nums {
        if obj[num] {
            res = num
            break
        }
        obj[num] = true
    }
    return res
}