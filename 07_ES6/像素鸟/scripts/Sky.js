const skyElem = document.querySelector(".sky");
const skyStyles = getComputedStyle(skyElem, null);
const skyHeight = parseFloat(skyStyles.height);
const skyWidth = parseFloat(skyStyles.width);

class Sky extends Rectangle {
  constructor() {
    super(skyWidth, skyHeight, 0, 0, -50, 0, skyElem);
  }

  onMove() {
    this.left <= -this.width / 2 && (this.left = 0);
  }
}
