module.exports = class {
  constructor(color, number) {
    this.color = color;
    this.number = number;
  }

  // 得到某扑克牌的字符串
  toString() {
    let str = "";

    switch (this.color) {
      case 1:
        str = "♠";
        break;
      case 2:
        str = "♥";
        break;
      case 3:
        str = "♣";
        break;
      case 4:
        str = "♦";
        break;
      default:
        break;
    }

    if (this.number >= 2 && this.number <= 10) {
      str += this.number;
    } else {
      switch (this.number) {
        case 1:
          str += "A";
          break;
        case 11:
          str += "J";
          break;
        case 12:
          str += "Q";
          break;
        case 13:
          str += "K";
          break;
        case 14:
          str = "joker";
          break;
        case 15:
          str = "JOKER";
          break;
        default:
          break;
      }
    }

    return str;
  }
};
