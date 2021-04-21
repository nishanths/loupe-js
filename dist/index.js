"use strict";
// Original jQuery implementation (without touch event support, customizable shape
// and styles): https://codepen.io/pixelacorn/pen/eNObea
Object.defineProperty(exports, "__esModule", { value: true });
exports.enableLoupe = exports.Loupe = void 0;
var px = function (v) { return v + "px"; };
// A Loupe represents the loupe element and its properties such as
// magnification level and size.
//
// Use enableLoupe to add the loupe to an image-displaying element of your
// choice.
var Loupe = /** @class */ (function () {
    function Loupe(_a) {
        var _b = _a === void 0 ? {} : _a, _c = _b.magnification, magnification = _c === void 0 ? 2.25 : _c, _d = _b.width, width = _d === void 0 ? 250 : _d, _e = _b.height, height = _e === void 0 ? 250 / 1.6 : _e, _f = _b.container, container = _f === void 0 ? document.body : _f, additionalClassName = _b.additionalClassName, style = _b.style, _g = _b.shape, shape = _g === void 0 ? "rectangle" : _g;
        this.magnification = magnification;
        this.width = typeof width === "number" ? px(width) : width;
        this.height = typeof height === "number" ? px(height) : height;
        this.container = container;
        this.shape = shape;
        this.elem = document.createElement("div");
        this.elem.classList.add("__loupe");
        if (additionalClassName !== undefined) {
            this.elem.classList.add(additionalClassName);
        }
        if (style !== undefined) {
            Object.assign(this.elem.style, style);
        }
        this.container.appendChild(this.elem);
    }
    Loupe.prototype.unmount = function () {
        this.container.removeChild(this.elem);
    };
    return Loupe;
}());
exports.Loupe = Loupe;
// enableLoupe adds the specified loupe object to the target element. The target
// element can be, for instance, an <img> element or a <div> element with a
// background-image.
//
// enableLoupe returns a function that can be later be used to disable the loupe
// on the target element.
exports.enableLoupe = function (target, imgUrl, loupe) {
    var doc = target.ownerDocument;
    var wnd = doc.defaultView;
    var resetTouchScroll = disableTouchScroll(target);
    var moveHandlers = {
        docMouseMoveHandler: undefined,
        docTouchMoveHandler: undefined,
    };
    var stopMouseMove = function () {
        if (moveHandlers.docMouseMoveHandler !== undefined) {
            Object.assign(loupe.elem.style, { display: "none", visibility: "hidden" });
            doc.removeEventListener("mousemove", moveHandlers.docMouseMoveHandler);
            moveHandlers.docMouseMoveHandler = undefined;
        }
    };
    var stopTouchMove = function () {
        if (moveHandlers.docTouchMoveHandler !== undefined) {
            Object.assign(loupe.elem.style, { display: "none", visibility: "hidden" });
            doc.removeEventListener("touchmove", moveHandlers.docTouchMoveHandler);
            moveHandlers.docTouchMoveHandler = undefined;
        }
    };
    var handler = function () {
        Object.assign(target.style, { cursor: "none" });
        Object.assign(loupe.elem.style, { display: "block", visibility: "hidden" });
        var exitDistance = 5;
        var zoomingImg = document.createElement('img');
        zoomingImg.src = imgUrl;
        var targetRect = target.getBoundingClientRect();
        var width = zoomingImg.width;
        var height = zoomingImg.height;
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
        moveHandlers.docMouseMoveHandler = function (e) {
            if (e.pageX < left - exitDistance ||
                e.pageX > right + exitDistance ||
                e.pageY < top - exitDistance ||
                e.pageY > bottom + exitDistance) {
                stopMouseMove();
                return;
            }
            Object.assign(loupe.elem.style, { display: "block", visibility: "visible" });
            var positionX = -e.pageX + left;
            var percentX = positionX * 100 / targetRect.width;
            var zoomingPercentX = width * loupe.magnification * percentX / 100 + loupeOffset;
            var positionY = -e.pageY + top;
            var percentY = positionY * 100 / targetRect.height;
            var zoomingPercentY = height * loupe.magnification * percentY / 100 + loupeOffset;
            var bgPosX = zoomingPercentX;
            var bgPosY = zoomingPercentY;
            Object.assign(loupe.elem.style, {
                left: px(e.pageX - loupeOffset),
                top: px(e.pageY - loupeOffset),
                backgroundPosition: px(bgPosX) + " " + px(bgPosY)
            });
        };
        moveHandlers.docTouchMoveHandler = function (e) {
            var t = e.touches.item(0);
            if (!t) {
                return;
            }
            if (t.pageX < left - exitDistance ||
                t.pageX > right + exitDistance ||
                t.pageY < top - exitDistance ||
                t.pageY > bottom + exitDistance) {
                stopTouchMove();
                return;
            }
            Object.assign(loupe.elem.style, { display: "block", visibility: "visible" });
            var positionX = -t.pageX + left;
            var percentX = positionX * 100 / targetRect.width;
            var zoomingPercentX = width * loupe.magnification * percentX / 100 + loupeOffset;
            var positionY = -t.pageY + top;
            var percentY = positionY * 100 / targetRect.height;
            var zoomingPercentY = height * loupe.magnification * percentY / 100 + loupeOffset;
            var bgPosX = zoomingPercentX;
            var bgPosY = zoomingPercentY;
            Object.assign(loupe.elem.style, {
                left: px(t.pageX - loupeOffset),
                top: px(t.pageY - loupeOffset),
                backgroundPosition: px(bgPosX) + " " + px(bgPosY)
            });
        };
        doc.addEventListener("mousemove", moveHandlers.docMouseMoveHandler);
        doc.addEventListener("touchmove", moveHandlers.docTouchMoveHandler);
    };
    target.addEventListener("mouseover", handler);
    target.addEventListener("touchstart", handler);
    return function () {
        resetTouchScroll();
        stopMouseMove();
        stopTouchMove();
        target.removeEventListener("mouseover", handler);
        target.removeEventListener("touchstart", handler);
    };
};
var disableTouchScroll = function (elem) {
    var old = elem.style.touchAction;
    Object.assign(elem.style, { touchAction: "none" }); // https://stackoverflow.com/a/43275544/3309046
    return function () { Object.assign(elem.style, { touchAction: old }); };
};
