// 该模块用于记录地图中的内容
export const SPACE = 0; // 0表示空白
export const PLAYER = 1; // 1表示玩家
export const WALL = 2; // 2表示墙
export const BOX = 3; // 3表示箱子

// 记录空白、玩家、墙、箱子的内容
export const content = [
  [0, 0, 2, 2, 2, 2, 2, 0, 0],
  [0, 0, 2, 0, 1, 0, 2, 0, 0],
  [0, 0, 2, 0, 3, 0, 2, 0, 0],
  [2, 2, 2, 0, 0, 0, 2, 2, 2],
  [2, 0, 0, 0, 3, 0, 0, 0, 2],
  [2, 0, 3, 3, 3, 3, 3, 0, 2],
  [2, 0, 0, 0, 3, 0, 0, 0, 2],
  [2, 2, 0, 3, 3, 3, 0, 2, 2],
  [0, 2, 0, 0, 0, 0, 0, 2, 0],
  [0, 2, 0, 0, 3, 0, 0, 2, 0],
  [0, 2, 0, 0, 0, 0, 0, 2, 0],
  [0, 2, 2, 2, 2, 2, 2, 2, 0],
];

// 记录正确位置
export const correct = [
  { row: 3, col: 4 },
  { row: 4, col: 4 },
  { row: 5, col: 2 },
  { row: 5, col: 3 },
  { row: 5, col: 4 },
  { row: 5, col: 5 },
  { row: 5, col: 6 },
  { row: 6, col: 4 },
  { row: 7, col: 4 },
  { row: 8, col: 4 },
  { row: 9, col: 4 },
  { row: 10, col: 4 },
];

export const colNum = content[0].length; // content的总列数
export const rowNum = content.length; // content的总行数
