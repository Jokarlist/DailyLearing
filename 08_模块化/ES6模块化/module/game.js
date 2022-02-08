// 该模块为游戏注册事件
import { playerMove, isWin } from "./play.js";
import showUI from "./ui.js";

showUI();

let over = false; // 游戏结束标志

window.onkeydown = (e) => {
  if (over) {
    return;
  }

  let result = false; // 是否可以移动下一步的标志

  switch (e.key) {
    case "ArrowUp":
      result = playerMove("up");
      break;
    case "ArrowDown":
      result = playerMove("down");
      break;
    case "ArrowLeft":
      result = playerMove("left");
      break;
    case "ArrowRight":
      result = playerMove("right");
      break;
  }

  if (result) {
    showUI();
    isWin() && (over = true, console.log("游戏胜利！"));
  }
};
