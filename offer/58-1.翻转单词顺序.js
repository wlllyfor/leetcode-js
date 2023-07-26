function reverseWords(sentence) {
  // 使用正则表达式将句子分割成单词数组
  const words = sentence.trim().split(/\s+/);
  
  // 翻转单词数组并将其连接成一个新的句子
  const reversedSentence = words.reverse().join(' ');
  
  return reversedSentence;
}
