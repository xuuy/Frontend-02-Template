/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./f7.js":
/*!***************!*\
  !*** ./f7.js ***!
  \***************/
/*! exports provided: Component, h, render */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"Component\", function() { return Component; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"h\", function() { return h; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"render\", function() { return render; });\nfunction _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }\n\nfunction _nonIterableSpread() { throw new TypeError(\"Invalid attempt to spread non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _iterableToArray(iter) { if (typeof Symbol !== \"undefined\" && Symbol.iterator in Object(iter)) return Array.from(iter); }\n\nfunction _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }\n\nfunction _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }\n\nfunction _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nvar Component = /*#__PURE__*/function () {\n  function Component(props) {\n    _classCallCheck(this, Component);\n\n    this.props = props || {};\n  }\n\n  _createClass(Component, [{\n    key: \"setState\",\n    value: function setState(state, callback) {\n      this.state = Object.assign(this.state, state);\n      callback && callback();\n    }\n  }]);\n\n  return Component;\n}();\n\nfunction isVaildTag(tag) {\n  return typeof tag === \"string\" || typeof tag === \"function\";\n} // 事件委托\n\n\nvar eventId = 0;\nvar events = {\n  click: new Map()\n};\nObject.keys(events).forEach(function (type) {\n  return document.body.addEventListener(type, function (event) {\n    var target = event.target;\n    var callback = events[type].get(target.eventId);\n\n    if (callback) {\n      callback(_objectSpread(_objectSpread({}, event), {}, {\n        currentTarget: event.target\n      }));\n    }\n  });\n}); // 1. event attribute\n// 2. style attribute\n// 3. native attribute(no contains event and style)\n// 4. custom attribute\n\nvar nativeAttr = {};\n\nvar isNumber = function isNumber(n) {\n  return /^(\\.?[0-9]+|[0-9]+\\.?[0-9]*)/.test(n);\n};\n\nvar addPx = function addPx(n) {\n  return n + \"px\";\n};\n\nvar calcStyle = function calcStyle(styles) {\n  var reg = /([a-z]+)([A-Z][a-z]+)([A-Z][a-z]+)?/;\n  return Object.keys(styles).map(function (key) {\n    reg.test(key);\n    var name = key.replace(reg, function (i, a, b, c) {\n      return a + (b ? \"-\" + b.toLowerCase() : c ? \"-\" + c.toLowerCase() : \"\");\n    });\n    return \"\".concat(name, \": \").concat(isNumber(styles[key]) ? addPx(styles[key]) : styles[key]);\n  }).join(\";\");\n};\n\nvar handleAttribute = function handleAttribute(element, props) {\n  for (var key in props) {\n    if (key !== \"children\") {\n      if (props.hasOwnProperty(key)) {\n        if (/^on([A-Z].+)/.test(key)) {\n          // 事件由body进行分发\n          var eid = eventId++; // 防止被人窜写、删除\n\n          Object.defineProperty(element, \"eventId\", {\n            value: eid\n          });\n          events[RegExp.$1.toLowerCase()].set(eid, props[key]);\n        } else if (key === \"style\") {\n          element.setAttribute(\"style\", calcStyle(props[key]));\n        } else if (key === 'className') {\n          element.classList.add(props[key]);\n        } else {\n          element.setAttribute(key, props[key]);\n        }\n      }\n    }\n  }\n};\n\nvar h = function h(Tag) {\n  var Props = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};\n\n  if (!isVaildTag(Tag)) {\n    throw new TypeError(\"tag is invalid\");\n  }\n\n  var element;\n\n  for (var _len = arguments.length, Childrens = new Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {\n    Childrens[_key - 2] = arguments[_key];\n  }\n\n  if (typeof Tag === \"string\") {\n    var _element;\n\n    element = document.createElement(Tag);\n\n    (_element = element).append.apply(_element, _toConsumableArray(Childrens.flat()));\n\n    handleAttribute(element, Props);\n  } else if (Tag.prototype instanceof Component) {\n    var instance = new Tag(_objectSpread(_objectSpread({}, Props), {}, {\n      children: Childrens\n    }));\n    return instance.render();\n  } else {\n    return Tag(_objectSpread(_objectSpread({}, Props), {}, {\n      children: Childrens\n    }));\n  }\n\n  return element;\n};\nvar render = function render(element, container) {\n  container.appendChild(element);\n};\n\n//# sourceURL=webpack:///./f7.js?");

/***/ }),

/***/ "./images/w1.jpg":
/*!***********************!*\
  !*** ./images/w1.jpg ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"img/w1.jpg\");\n\n//# sourceURL=webpack:///./images/w1.jpg?");

/***/ }),

/***/ "./images/w2.jpg":
/*!***********************!*\
  !*** ./images/w2.jpg ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"img/w2.jpg\");\n\n//# sourceURL=webpack:///./images/w2.jpg?");

/***/ }),

/***/ "./images/w3.jpg":
/*!***********************!*\
  !*** ./images/w3.jpg ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"img/w3.jpg\");\n\n//# sourceURL=webpack:///./images/w3.jpg?");

/***/ }),

/***/ "./images/w4.jpg":
/*!***********************!*\
  !*** ./images/w4.jpg ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"img/w4.jpg\");\n\n//# sourceURL=webpack:///./images/w4.jpg?");

/***/ }),

/***/ "./images/w5.jpg":
/*!***********************!*\
  !*** ./images/w5.jpg ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony default export */ __webpack_exports__[\"default\"] = (__webpack_require__.p + \"img/w5.jpg\");\n\n//# sourceURL=webpack:///./images/w5.jpg?");

/***/ }),

/***/ "./main.js":
/*!*****************!*\
  !*** ./main.js ***!
  \*****************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _f7_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./f7.js */ \"./f7.js\");\n/* harmony import */ var _images_w1_jpg__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./images/w1.jpg */ \"./images/w1.jpg\");\n/* harmony import */ var _images_w2_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./images/w2.jpg */ \"./images/w2.jpg\");\n/* harmony import */ var _images_w3_jpg__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./images/w3.jpg */ \"./images/w3.jpg\");\n/* harmony import */ var _images_w4_jpg__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./images/w4.jpg */ \"./images/w4.jpg\");\n/* harmony import */ var _images_w5_jpg__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./images/w5.jpg */ \"./images/w5.jpg\");\nfunction _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === \"undefined\" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === \"number\") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError(\"Invalid attempt to iterate non-iterable instance.\\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.\"); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it[\"return\"] != null) it[\"return\"](); } finally { if (didErr) throw err; } } }; }\n\nfunction _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === \"string\") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === \"Object\" && o.constructor) n = o.constructor.name; if (n === \"Map\" || n === \"Set\") return Array.from(o); if (n === \"Arguments\" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }\n\nfunction _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }\n\nfunction _objectDestructuringEmpty(obj) { if (obj == null) throw new TypeError(\"Cannot destructure undefined\"); }\n\nfunction _typeof(obj) { \"@babel/helpers - typeof\"; if (typeof Symbol === \"function\" && typeof Symbol.iterator === \"symbol\") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === \"function\" && obj.constructor === Symbol && obj !== Symbol.prototype ? \"symbol\" : typeof obj; }; } return _typeof(obj); }\n\nfunction _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError(\"Cannot call a class as a function\"); } }\n\nfunction _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if (\"value\" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }\n\nfunction _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }\n\nfunction _inherits(subClass, superClass) { if (typeof superClass !== \"function\" && superClass !== null) { throw new TypeError(\"Super expression must either be null or a function\"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }\n\nfunction _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }\n\nfunction _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }\n\nfunction _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === \"object\" || typeof call === \"function\")) { return call; } return _assertThisInitialized(self); }\n\nfunction _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError(\"this hasn't been initialised - super() hasn't been called\"); } return self; }\n\nfunction _isNativeReflectConstruct() { if (typeof Reflect === \"undefined\" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === \"function\") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }\n\nfunction _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }\n\n\n\n\n\n\n\n\nvar App = /*#__PURE__*/function (_Component) {\n  _inherits(App, _Component);\n\n  var _super = _createSuper(App);\n\n  function App(props) {\n    _classCallCheck(this, App);\n\n    return _super.call(this, props);\n  }\n\n  _createClass(App, [{\n    key: \"render\",\n    value: function render() {\n      return Object(_f7_js__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"div\", {\n        className: \"wrapper\"\n      }, Object(_f7_js__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"p\", {\n        className: \"title\"\n      }, \"\\u8F6E\\u64AD\\u56FE\"), Object(_f7_js__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"label\", {\n        \"for\": \"autoplay\"\n      }, \"\\u81EA\\u52A8\\u8F6E\\u64AD\", Object(_f7_js__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"input\", {\n        type: \"checkbox\",\n        id: \"autoplay\"\n      })), Object(_f7_js__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"label\", {\n        \"for\": \"duration\"\n      }, \"\\u65F6\\u957F\", Object(_f7_js__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"input\", {\n        type: \"range\",\n        id: \"duration\"\n      })), Object(_f7_js__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"label\", {\n        \"for\": \"timing\"\n      }, \"\\u8D1D\\u585E\\u5C14\\u66F2\\u7EBF\", Object(_f7_js__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"select\", null, Object(_f7_js__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"option\", null, \"ease\"), Object(_f7_js__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"option\", null, \"easeIn\"), Object(_f7_js__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"option\", null, \"easeOut\"))), this.props.children);\n    }\n  }]);\n\n  return App;\n}(_f7_js__WEBPACK_IMPORTED_MODULE_0__[\"Component\"]);\n\nvar Carousel = function Carousel(props) {\n  _objectDestructuringEmpty(props); //鼠标事件\n\n\n  setTimeout(function () {\n    var container = document.getElementById('container');\n    var position = 0;\n    container.addEventListener('mousedown', function (event) {\n      var children = container.children;\n      var startX = event.clientX;\n\n      var move = function move(event) {\n        var x = event.clientX - startX;\n\n        var _iterator = _createForOfIteratorHelper(children),\n            _step;\n\n        try {\n          for (_iterator.s(); !(_step = _iterator.n()).done;) {\n            var child = _step.value;\n            child.style.transition = 'none';\n            child.style.transform = \"translateX(\".concat(-position * 500 + x, \"px)\");\n          }\n        } catch (err) {\n          _iterator.e(err);\n        } finally {\n          _iterator.f();\n        }\n      };\n\n      var up = function up(event) {\n        var x = event.clientX - startX;\n        position = position - Math.round(x / 500);\n\n        var _iterator2 = _createForOfIteratorHelper(children),\n            _step2;\n\n        try {\n          for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {\n            var child = _step2.value;\n            child.style.transition = '';\n            child.style.transform = \"translateX(\".concat(-position * 500, \"px)\");\n          }\n        } catch (err) {\n          _iterator2.e(err);\n        } finally {\n          _iterator2.f();\n        }\n\n        document.removeEventListener('mousemove', move);\n        document.removeEventListener('mousemove', up);\n      };\n\n      document.addEventListener('mousemove', move);\n      document.addEventListener('mouseup', up);\n    });\n  }); // setInterval(() => {\n  //   const len = props.images.length\n  //   let currentIndex = 0\n  //   const container = document.getElementById('container')\n  //   const children = container.children\n  //   let nextIndex = (currentIndex + 1) % len\n  //   let current = children[currentIndex]\n  //   let next = children[nextIndex]\n  //   next.style.transition = 'none'\n  //   next.style.transform = `translateX(${100 - nextIndex * 100}%)`\n  //   console.log(currentIndex, nextIndex)\n  //   setTimeout(() => {\n  //     next.style.transition = ''\n  //     current.style.transform = `translateX(${-100 - currentIndex * 100}%)`\n  //     next.style.transform = `translateX(${- nextIndex * 100}%)`\n  //     currentIndex = nextIndex\n  //   }, 16)\n  // }, 2000)\n\n  return Object(_f7_js__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"div\", {\n    className: \"carousel\",\n    id: \"container\"\n  }, props.images.map(function (url) {\n    return Object(_f7_js__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(\"div\", {\n      className: \"carousel-item\",\n      style: {\n        backgroundImage: \"url(\".concat(url, \")\")\n      }\n    });\n  }));\n};\n\nObject(_f7_js__WEBPACK_IMPORTED_MODULE_0__[\"render\"])(Object(_f7_js__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(App, null, Object(_f7_js__WEBPACK_IMPORTED_MODULE_0__[\"h\"])(Carousel, {\n  images: [_images_w1_jpg__WEBPACK_IMPORTED_MODULE_1__[\"default\"], _images_w2_jpg__WEBPACK_IMPORTED_MODULE_2__[\"default\"], _images_w3_jpg__WEBPACK_IMPORTED_MODULE_3__[\"default\"], _images_w4_jpg__WEBPACK_IMPORTED_MODULE_4__[\"default\"], _images_w5_jpg__WEBPACK_IMPORTED_MODULE_5__[\"default\"]]\n})), document.getElementById(\"root\"));\n\n//# sourceURL=webpack:///./main.js?");

/***/ })

/******/ });