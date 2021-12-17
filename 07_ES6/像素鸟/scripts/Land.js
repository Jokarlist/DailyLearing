const landElem = document.querySelector(".land");
const landStyles = getComputedStyle(landElem, null);
const landHeight = parseFloat(landStyles.height);
const landWidth = parseFloat(landStyles.width);
const landTop = parseFloat(landStyles.top);

class Land extends Rectangle {
  constructor(speed) {
    super(landWidth, landHeight, 0, landTop, speed, 0, landElem);
  }

  onMove() {
    this.left <= -this.width / 2 && (this.left = 0);
  }
}
