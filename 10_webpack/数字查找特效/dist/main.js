/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/index.js":
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _page_event__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./page/event */ \"./src/page/event.js\");\n\n\n//# sourceURL=webpack://prime_identify/./src/index.js?");

/***/ }),

/***/ "./src/page/appendNumber.js":
/*!**********************************!*\
  !*** ./src/page/appendNumber.js ***!
  \**********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _util_randomColor__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/randomColor */ \"./src/util/randomColor.js\");\n\r\n\r\n\r\nconst divContainer = document.getElementById(\"divContainer\");\r\nconst divCenter = document.getElementById(\"divCenter\");\r\n\r\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(num, isPrime) {\r\n  const span = document.createElement(\"span\");\r\n\r\n  span.innerText = num;\r\n\r\n  if (isPrime) {\r\n    const color = (0,_util_randomColor__WEBPACK_IMPORTED_MODULE_0__[\"default\"])();\r\n    span.style.color = color;\r\n    createCenterPrimeNumber(num, color);\r\n  }\r\n\r\n  divContainer.appendChild(span);\r\n  divCenter.innerText = num;\r\n}\r\n\r\nfunction createCenterPrimeNumber(num, color) {\r\n  const div = document.createElement(\"div\");\r\n\r\n  div.className = \"center\";\r\n  div.innerText = num;\r\n  div.style.color = color;\r\n  document.body.appendChild(div);\r\n\r\n  window.getComputedStyle(div).left;\r\n\r\n  div.style.transform = `translate(${(0,_util_randomColor__WEBPACK_IMPORTED_MODULE_0__.getRandom)(-200, 200)}px, ${(0,_util_randomColor__WEBPACK_IMPORTED_MODULE_0__.getRandom)(-200, 200)}px)`;\r\n  div.style.opacity = 0;\r\n}\r\n\r\n\n\n//# sourceURL=webpack://prime_identify/./src/page/appendNumber.js?");

/***/ }),

/***/ "./src/page/event.js":
/*!***************************!*\
  !*** ./src/page/event.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _util_NumberTimer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../util/NumberTimer */ \"./src/util/NumberTimer.js\");\n/* harmony import */ var _page_appendNumber__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../page/appendNumber */ \"./src/page/appendNumber.js\");\n\r\n\r\n\r\nconst n = new _util_NumberTimer__WEBPACK_IMPORTED_MODULE_0__[\"default\"](100);\r\n\r\nn.onNumberCreated = function (num, isPrime) {\r\n  (0,_page_appendNumber__WEBPACK_IMPORTED_MODULE_1__[\"default\"])(num, isPrime);\r\n};\r\n\r\nlet isStart = false;\r\n\r\nwindow.onclick = () => {\r\n  if (isStart) {\r\n    n.stop();\r\n    isStart = false;\r\n  } else {\r\n    n.start();\r\n    isStart = true;\r\n  }\r\n}\r\n\n\n//# sourceURL=webpack://prime_identify/./src/page/event.js?");

/***/ }),

/***/ "./src/util/NumberTimer.js":
/*!*********************************!*\
  !*** ./src/util/NumberTimer.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _isPrime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./isPrime */ \"./src/util/isPrime.js\");\n\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (class {\r\n  constructor(duration = 500) {\r\n    this.duration = duration;\r\n    this.number = 1;\r\n    this.timer = null;\r\n    this.onNumberCreated = null;\r\n  }\r\n\r\n  start() {\r\n    if (this.timer) {\r\n      return;\r\n    }\r\n\r\n    this.timer = setInterval(() => {\r\n      this.onNumberCreated &&\r\n        this.onNumberCreated(this.number, (0,_isPrime__WEBPACK_IMPORTED_MODULE_0__[\"default\"])(this.number));\r\n      this.number++;\r\n    }, this.duration);\r\n  }\r\n\r\n  stop() {\r\n    clearInterval(this.timer);\r\n    this.timer = null;\r\n  }\r\n});\r\n\n\n//# sourceURL=webpack://prime_identify/./src/util/NumberTimer.js?");

/***/ }),

/***/ "./src/util/isPrime.js":
/*!*****************************!*\
  !*** ./src/util/isPrime.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__(num) {\r\n  if (num < 2) {\r\n    return false;\r\n  }\r\n\r\n  for (let i = 2; i <= Math.floor(Math.sqrt(num)); i++) {\r\n    if (num % i === 0) {\r\n      return false;\r\n    }\r\n  }\r\n\r\n  return true;\r\n}\n\n//# sourceURL=webpack://prime_identify/./src/util/isPrime.js?");

/***/ }),

/***/ "./src/util/randomColor.js":
/*!*********************************!*\
  !*** ./src/util/randomColor.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"getRandom\": () => (/* binding */ getRandom),\n/* harmony export */   \"default\": () => (/* export default binding */ __WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst colors = [\r\n  \"#f26395\",\r\n  \"#62efab\",\r\n  \"#ef7658\",\r\n  \"#ffe868\",\r\n  \"#80e3f7\",\r\n  \"#d781f9\",\r\n];\r\n\r\n/**\r\n * 在指定范围内获取一个随机数\r\n * @param {number} min\r\n * @param {number} max\r\n * @returns\r\n */\r\nfunction getRandom(min, max) {\r\n  return Math.floor(Math.random() * (max - min) + min);\r\n}\r\n\r\n/* harmony default export */ function __WEBPACK_DEFAULT_EXPORT__() {\r\n  return colors[getRandom(0, colors.length)];\r\n}\r\n\n\n//# sourceURL=webpack://prime_identify/./src/util/randomColor.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/index.js");
/******/ 	
/******/ })()
;