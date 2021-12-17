/* const a = "hello";
const b = "world";
const str = myTag`你好：${a}，世界：${b}`;

console.log(str);

function myTag(parts) {
  const values = Array.prototype.slice.call(arguments).slice(1);
  let str = "";

  for (let i = 0, len = values.length; i < len; i++) {
    str += `${parts[i]}${values[i]}`;
    i === len - 1 && (str += `${parts[i + 1]}`);
  }

  return str;
} */

btn.onclick = function () {
  container.innerHTML = safe`<p>${text.value}</p>`;
}

/**
 * 对不正确不安全的输入进行处理
 * @param {被插值分割的字符串数组} parts 
 * @returns 
 */
function safe(parts) {
  const values = Array.prototype.slice.call(arguments).slice(1);
  let str = "";
  
  for (let i = 0, len = values.length; i < len; i++) {
    const fixedVal = values[i].replace(/</g, "&lt;").replace(/>/g, "&gt;");

    str += `${parts[i]}${fixedVal}`;
    i === len - 1 && (str += `${parts[i + 1]}`);
  }

  return str;
}