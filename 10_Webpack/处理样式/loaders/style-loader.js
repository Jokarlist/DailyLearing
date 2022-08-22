module.exports = function (sourceCode) {
  return `
  const style = document.createElement("style");
  style.innerHTML = \`${sourceCode}\`;
  document.head.appendChild(style);
  module.exports = \`${sourceCode}\`;
  `;
};