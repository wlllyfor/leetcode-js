// package main

// import "fmt"

// func main() {
// 	sum := 0
// 	for i := 0; i <= 10; i++ {
// 		sum += i
// 	}
// 	fmt.Println(sum)
// }

// package main

// import "fmt"

// func main() {
// 	sum := 1
// 	for sum <= 10 {
// 		sum += sum
// 	}
// 	fmt.Println(sum)

// 	// 这样写也可以，更像 While 语句形式
// 	for sum <= 10 {
// 		sum += sum
// 	}
// 	fmt.Println(sum)
// }

// package main

// import "fmt"

// func main() {
// 	strings := []string{"google", "runoob"}
// 	for i, s := range strings {
// 		fmt.Println(i, s)
// 	}

// 	numbers := [6]int{1, 2, 3, 5}
// 	for i, x := range numbers {
// 		fmt.Printf("第 %d 位 x 的值 = %d\n", i, x)
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

// package main

// import "fmt"

// func main() {
// 	/* 定义局部变量 */
// 	var i, j int

// 	for i = 2; i < 100; i++ {
// 		for j = 2; j <= (i / j); j++ {
// 			if i%j == 0 {
// 				break // 如果发现因子，则不是素数
// 			}
// 		}
// 		if j > (i / j) {
// 			fmt.Printf("%d  是素数\n", i)
// 		}
// 	}
// }

// package main

// import "fmt"

// func main() {
// 	for m := 1; m < 10; m++ {
// 		/*    fmt.Printf("第%d次：\n",m) */
// 		for n := 1; n <= m; n++ {
// 			fmt.Printf("%dx%d=%d ", n, m, m*n)
// 		}
// 		fmt.Println("")
// 	}
// }

// package main

// import "fmt"

// func main() {
// 	for i := 0; i < 10; i++ {
// 		if i == 5 {
// 			break // 当 i 等于 5 时跳出循环
// 		}
// 		fmt.Println(i)
// 	}
// }

