function add(a, b) {
  while (b !== 0) {
    let carry = (a & b) << 1; // 计算进位
    a = a ^ b; // 计算非进位和
    b = carry; // 将进位赋给b，继续循环
  }
  return a;
}