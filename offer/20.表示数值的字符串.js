function isNumber(str) {
  // 去除字符串两端的空格
  str = str.trim();
  // 定义正则表达式
  const reg = /^[\+\-]?(\d+(\.\d*)?|\.\d+)([eE][\+\-]?\d+)?$/;
  // 判断是否匹配
  return reg.test(str);
}