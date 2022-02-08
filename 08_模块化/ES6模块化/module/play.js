// 该模块实现游戏的核心逻辑
import * as map from "./map.js";

/**
 * 判断玩家是否可以在指定的方向上移动一步
 * @param {string} direction 移动的方向值有Left、right、up、down
 */
export function playerMove(direction) {
  const playerPoint = getPlayerPoint(); // 获取玩家当前位置
  const nextInfo = getNextInfo(playerPoint.row, playerPoint.col, direction); // 获取玩家下一个位置的信息

  switch (nextInfo.value) {
    case map.WALL:
      return false;
    case map.SPACE:
      exchange(playerPoint, nextInfo);
      return true;
    case map.BOX:
      const boxNextInfo = getNextInfo(nextInfo.row, nextInfo.col, direction); // 获取箱子的指定方向上下一个位置的信息

      if (boxNextInfo.value === map.SPACE) {
        exchange(nextInfo, boxNextInfo);
        exchange(playerPoint, nextInfo);
        return true;
      } else {
        return false;
      }
  }
}

/**
 * 根据当前地图内容，判断游戏是否胜利
 */
export function isWin() {
  // 是否每个正确位置上都有箱子
  return map.correct.every(
    (point) => map.content[point.row][point.col] === map.BOX
  );
}

/**
 * 交换两点位置
 * @param {object} point1
 * @param {object} point2
 */
function exchange(point1, point2) {
  const temp = map.content[point1.row][point1.col];

  map.content[point1.row][point1.col] = map.content[point2.row][point2.col];
  map.content[point2.row][point2.col] = temp;
}

/**
 * 获取玩家的当前位置
 */
function getPlayerPoint() {
  for (let row = 0; row < map.rowNum; row++) {
    for (let col = 0; col < map.colNum; col++) {
      if (map.content[row][col] === map.PLAYER) {
        return {
          row,
          col,
        };
      }
    }
  }
}

/**
 * 获取某个位置的指定方向的下一个位置的信息
 * @param {number} row
 * @param {number} col
 * @param {string} direction
 */
function getNextInfo(row, col, direction) {
  switch (direction) {
    case "left":
      return {
        row,
        col: col - 1,
        value: map.content[row][col - 1],
      };
    case "right":
      return {
        row,
        col: col + 1,
        value: map.content[row][col + 1],
      };
    case "up":
      return {
        row: row - 1,
        col,
        value: map.content[row - 1][col],
      };
    case "down":
      return {
        row: row + 1,
        col,
        value: map.content[row + 1][col],
      };
  }
}
