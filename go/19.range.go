// package main

// import "fmt"

// var pow = []int{1, 2, 4, 8, 16, 32, 64, 128}

// func main() {
// 	for i, v := range pow {
// 		fmt.Printf("2**%d = %d\n", i, v)
// 	}
// }

// package main

// import "fmt"

// func main() {
// 	map1 := make(map[int]float32)
// 	map1[1] = 1.0
// 	map1[2] = 2.0
// 	map1[3] = 3.0
// 	map1[4] = 4.0

// 	// 读取 key 和 value
// 	for key, value := range map1 {
// 		fmt.Printf("key is: %d - value is: %f\n", key, value)
// 	}

// 	// 读取 key
// 	for key := range map1 {
// 		fmt.Printf("key is: %d\n", key)
// 	}

// 	// 读取 value
// 	for _, value := range map1 {
// 		fmt.Printf("value is: %f\n", value)
// 	}
// }

package main

import "fmt"

func main() {
	//这是我们使用 range 去求一个 slice 的和。使用数组跟这个很类似
	nums := []int{2, 3, 4}
	sum := 0
	for _, num := range nums {
		sum += num
	}
	fmt.Println("sum:", sum)
	//在数组上使用 range 将传入索引和值两个变量。上面那个例子我们不需要使用该元素的序号，所以我们使用空白符"_"省略了。有时侯我们确实需要知道它的索引。
	for i, num := range nums {
		if num == 3 {
			fmt.Println("index:", i)
		}
	}
	//range 也可以用在 map 的键值对上。
	kvs := map[string]string{"a": "apple", "b": "banana"}
	for k, v := range kvs {
		fmt.Printf("%s -> %s\n", k, v)
	}

	//range也可以用来枚举 Unicode 字符串。第一个参数是字符的索引，第二个是字符（Unicode的值）本身。
	for i, c := range "go" {
		fmt.Println(i, c)
	}
}
