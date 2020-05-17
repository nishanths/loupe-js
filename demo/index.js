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
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// Original jQuery implementation: https://codepen.io/pixelacorn/pen/eNObea
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableLoupe = exports.Loupe = void 0;
var px = function (v) { return v + "px"; };
window.loupe = exports;
var Loupe = /** @class */ (function () {
    function Loupe(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.magnification, magnification = _c === void 0 ? 2.25 : _c, _d = _b.width, width = _d === void 0 ? 250 : _d, _e = _b.height, height = _e === void 0 ? 250 / 1.6 : _e, _f = _b.container, container = _f === void 0 ? document.body : _f, additionalClassName = _b.additionalClassName, style = _b.style, _g = _b.shape, shape = _g === void 0 ? "rectangle" : _g;
        this.magnification = magnification;
        this.width = typeof width === "number" ? px(width) : width;
        this.height = typeof height === "number" ? px(height) : height;
        this.shape = shape;
        this.elem = document.createElement("div");
        this.elem.classList.add("__loupe");
        if (additionalClassName !== undefined) {
            this.elem.classList.add(additionalClassName);
        }
        if (style !== undefined) {
            Object.assign(this.elem.style, style);
        }
        container.appendChild(this.elem);
    }
    return Loupe;
}());
exports.Loupe = Loupe;
exports.enableLoupe = function (target, imgUrl, loupe) {
    var doc = target.ownerDocument;
    var wnd = doc.defaultView;
    var handler = function () {
        Object.assign(target.style, { cursor: "none" });
        Object.assign(loupe.elem.style, { display: "block" });
        var targetRect = target.getBoundingClientRect();
        var width = targetRect.width;
        var height = targetRect.height;
        // left and top copied from jQuery $(offset)
        // https://j11y.io/jquery/#v=1.11.2&fn=jQuery.fn.offset
        var left = targetRect.left + ((wnd === null || wnd === void 0 ? void 0 : wnd.pageXOffset) || doc.documentElement.scrollLeft) - (doc.documentElement.clientLeft || 0);
        var top = targetRect.top + ((wnd === null || wnd === void 0 ? void 0 : wnd.pageYOffset) || doc.documentElement.scrollTop) - (doc.documentElement.clientTop || 0);
        var right = left + targetRect.width;
        var bottom = top + targetRect.height;
        Object.assign(loupe.elem.style, {
            backgroundSize: width * loupe.magnification + 'px ' + height * loupe.magnification + "px",
            backgroundImage: 'url("' + imgUrl + '")',
            width: loupe.width,
            height: loupe.height
        });
        if (loupe.shape === "circle") {
            Object.assign(loupe.elem.style, { borderRadius: "50%" });
        }
        var loupeOffset = loupe.elem.getBoundingClientRect().width / 2;
        var docMouseMoveHandler = function (e) {
            if (e.pageX < left - loupeOffset / 6 ||
                e.pageX > right + loupeOffset / 6 ||
                e.pageY < top - loupeOffset / 6 ||
                e.pageY > bottom + loupeOffset / 6) {
                Object.assign(loupe.elem.style, { display: "none" });
                doc.removeEventListener("mousemove", docMouseMoveHandler);
                return;
            }
            var bgPosX = -((e.pageX - left) * loupe.magnification - loupeOffset);
            var bgPosY = -((e.pageY - top) * loupe.magnification - loupeOffset);
            Object.assign(loupe.elem.style, {
                left: px(e.pageX - loupeOffset),
                top: px(e.pageY - loupeOffset),
                backgroundPosition: px(bgPosX) + " " + px(bgPosY)
            });
        };
        doc.addEventListener("mousemove", docMouseMoveHandler);
    };
    target.addEventListener("mouseover", handler);
    return function () { target.removeEventListener("mouseover", handler); };
};


/***/ })

/******/ });
//# sourceMappingURL=index.js.map
