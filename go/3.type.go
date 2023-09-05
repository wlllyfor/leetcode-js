package main

import "fmt"

func main() {
	var b bool = true
	fmt.Println(b) // 输出：true
	var i int = 10
	fmt.Println(i)
	var f float64 = 3.14
	fmt.Println(f)
	var s string = "Hello, World!"
	fmt.Println(s)
	var arr [3]int = [3]int{1, 2, 3}
	fmt.Println(arr)
	var arr2 [3]string = [3]string{"name", "age", "sex"}
	fmt.Println(arr2)
	var arr3 []interface{} = []interface{}{1, "two", 3.14, true}
	fmt.Println(arr3)
	var slice []int = []int{1, 2, 3}
	fmt.Println(slice)
	var m map[string]int = map[string]int{"a": 1, "b": 2}
	fmt.Println(m)
}
