const util = require("./util");
const Poker = require("./poker");
const pokers = [];

// 创建54张扑克牌
for (let i = 1; i <= 13; i++) {
  for (let j = 1; j <= 4; j++) {
    pokers.push(new Poker(j, i).toString());
  }
}

pokers.push(new Poker(null, 14).toString(), new Poker(null, 15).toString());

// 洗牌
util.sortRandom(pokers);

// 发牌
const player1 = pokers.slice(0, 17);
const player2 = pokers.slice(17, 34);
const player3 = pokers.slice(34, 51);
const desk = pokers.slice(51);

console.log(util.print(player1));
console.log(util.print(player2));
console.log(util.print(player3));
console.log(util.print(desk));