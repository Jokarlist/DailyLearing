/**
 * 测试一个字符的编码位长是否为32位
 * @param {待测试的字符} char 
 * @param {测试起始的字符码元索引值} index
 * @returns 
 */
function is32bit(char, index) {
  return char.codePointAt(index) > 0xffff;
}

/**
 * 根据字符串的码点获取其真实长度
 * @param {待检测的字符串} str 
 * @returns 
 */
function getLengthOfCodePoint(str) {
  let length = 0;

  for (let i = 0, len = str.length; i < len; i++) {
    if (is32bit(str, i)) {
      i++;
      console.log(1);
    }
    length++;
  }

  return length;
}