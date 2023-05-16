import "regexp"

func isNumber(str string) bool {
	// 去除字符串两端的空格
	str = strings.TrimSpace(str)
	// 定义正则表达式
	reg := regexp.MustCompile(`^[\+\-]?(\d+(\.\d*)?|\.\d+)([eE][\+\-]?\d+)?$`)
	// 判断是否匹配
	return reg.MatchString(str)
}