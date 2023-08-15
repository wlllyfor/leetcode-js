function strToInt(str) {
  const INT_MAX = Math.pow(2, 31) - 1; // 最大整数值
  const INT_MIN = -Math.pow(2, 31); // 最小整数值
  let i = 0; // 字符串索引
  let sign = 1; // 符号，默认为正数
  let result = 0; // 结果

  // 跳过开头的空格字符
  while (str[i] === ' ') {
    i++;
  }

  // 判断符号
  if (str[i] === '-' || str[i] === '+') {
    sign = str[i] === '-' ? -1 : 1;
    i++;
  }

  // 转换数字部分
  while (i < str.length && str[i] >= '0' && str[i] <= '9') {
    result = result * 10 + (str[i] - '0');
    i++;
  }

  // 根据符号和范围返回结果
  result = sign * result;
  if (result > INT_MAX) {
    return INT_MAX;
  } else if (result < INT_MIN) {
    return INT_MIN;
  } else {
    return result;
  }
}

// 示例输入
const str = "   -42";
console.log(strToInt(str)); // 输出: -42