const util = require("./util");
const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const Poker = require("./poker");

const p = new Poker(3, 8);

console.log(p.toString());