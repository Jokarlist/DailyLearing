const src = require("./assets/webpack.png");

console.log(src);

const img = document.createElement("img");

img.src = src;
document.body.appendChild(img);