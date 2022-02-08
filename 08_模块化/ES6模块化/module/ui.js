// 该模块用于将地图渲染到页面上
import * as map from "./map.js";

const game = document.getElementById("game");
const PIECE_WIDTH = 45;
const PIECE_HEIGHT = 45;

/**
 * 渲染地图整体
 */
export default function () {
  // 1. 渲染game容器的宽高
  renderGameContainer();
  // 2. 渲染地图中的内容
  renderContent();
}

/**
 * 渲染游戏主容器
 */
function renderGameContainer() {
  game.style.height = map.rowNum * PIECE_HEIGHT + "px";
  game.style.width = map.colNum * PIECE_WIDTH + "px";
}

/**
 * 渲染主体内容
 */
function renderContent() {
  // 1. 清空game容器
  game.innerHTML = "";
  // 2. 遍历地图内容，渲染元素
  for (let col = 0; col < map.colNum; col++) {
    for (let row = 0; row < map.rowNum; row++) {
      renderPiece(row, col);
    }
  }
}

/**
 * 根据传入的行和列，渲染单个元素到游戏容器中
 * @param {number} row
 * @param {number} col
 */
function renderPiece(row, col) {
  const val = map.content[row][col]; // 去除地图相应位置的表示值
  const div = document.createElement("div");

  div.className = "item";
  // 调整元素位置
  div.style.left = col * PIECE_WIDTH + "px";
  div.style.top = row * PIECE_HEIGHT + "px";

  const correct = isCorrect(row, col);

  switch (val) {
    case map.PLAYER:
      div.classList.add("player");
      break;
    case map.WALL:
      div.classList.add("wall");
      break;
    case map.BOX:
      if (correct) {
        // 处于正确位置的箱子
        div.classList.add("correct-box");
      } else {
        // 不处于正确位置的箱子
        div.classList.add("box");
      }
      break;
    case map.SPACE:
      if (correct) {
        // 箱子应在的空白
        div.classList.add("correct");
      } else {
        // 普通空白
        return;
      }
      break;
    default:
      return;
  }

  game.appendChild(div);
}

/**
 * 根据传入的行和列判断该箱子是否处于正确位置
 * @param {numebr} row
 * @param {number} col
 */
function isCorrect(row, col) {
  return map.correct.find((p) => p.col === col && p.row === row) !== undefined;
}
