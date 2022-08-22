const colors = [
  "#f26395",
  "#62efab",
  "#ef7658",
  "#ffe868",
  "#80e3f7",
  "#d781f9",
];

/**
 * 在指定范围内获取一个随机数
 * @param {number} min
 * @param {number} max
 * @returns
 */
export function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min) + min);
}

export default function () {
  return colors[getRandom(0, colors.length)];
}
