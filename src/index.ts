// Original jQuery implementation (without touch event support, customizable shape
// and styles): https://codepen.io/pixelacorn/pen/eNObea

const px = (v: number): string => v + "px"

export type LoupeOptions = {
	magnification?: number // magnification level (default: 2.25)
	width?: number | string // width of the loupe (default: 250)
	height?: number | string // height of the loupe (default: 250/1.6)
	container?: Node // containing node (default: document.body)
	additionalClassName?: string // additional class name to add to the loupe element (default: undefined)
	style?: Partial<CSSStyleDeclaration> // additional styles to add to the loupe element (default: undefined)
	shape?: Shape // shape of the loupe: "rectangle" | "circle" (default: "rectangle")
}

// Shape represents the shape of the loupe.
export type Shape = "rectangle" | "circle"

// A Loupe represents the loupe element and its properties such as
// magnification level and size.
//
// Use enableLoupe to add the loupe to an image-displaying element of your
// choice.
export class Loupe {
	readonly magnification: number
	readonly width: string
	readonly height: string
	readonly elem: HTMLDivElement
	readonly shape: Shape
	readonly container: Node

	constructor({
		magnification = 2.25,
		width = 250,
		height = 250 / 1.6,
		container = document.body,
		additionalClassName,
		style,
		shape = "rectangle"
	}: LoupeOptions = {}) {
		this.magnification = magnification
		this.width = typeof width === "number" ? px(width) : width
		this.height = typeof height === "number" ? px(height) : height
		this.container = container
		this.shape = shape

		this.elem = document.createElement("div")
		this.elem.classList.add("__loupe")
		if (additionalClassName !== undefined) {
			this.elem.classList.add(additionalClassName)
		}
		if (style !== undefined) {
			Object.assign(this.elem.style, style)
		}
		this.container.appendChild(this.elem)
	}

	unmount(): void {
		this.container.removeChild(this.elem)
	}
}

// enableLoupe adds the specified loupe object to the target element. The target
// element can be, for instance, an <img> element or a <div> element with a
// background-image.
//
// enableLoupe returns a function that can be later be used to disable the loupe
// on the target element.
export const enableLoupe = (target: HTMLElement | SVGElement, imgUrl: string, loupe: Loupe) => {
	const doc = target.ownerDocument
	const wnd = doc.defaultView

	const resetTouchScroll = disableTouchScroll(target)

	const moveHandlers: {
		docMouseMoveHandler: ((e: MouseEvent) => void) | undefined
		docTouchMoveHandler: ((e: TouchEvent) => void) | undefined
	} = {
		docMouseMoveHandler: undefined,
		docTouchMoveHandler: undefined,
	}

	const stopMouseMove = () => {
		if (moveHandlers.docMouseMoveHandler !== undefined) {
			Object.assign(loupe.elem.style, { display: "none", visibility: "hidden" })
			doc.removeEventListener("mousemove", moveHandlers.docMouseMoveHandler)
			moveHandlers.docMouseMoveHandler = undefined
		}
	}
	const stopTouchMove = () => {
		if (moveHandlers.docTouchMoveHandler !== undefined) {
			Object.assign(loupe.elem.style, { display: "none", visibility: "hidden" })
			doc.removeEventListener("touchmove", moveHandlers.docTouchMoveHandler)
			moveHandlers.docTouchMoveHandler = undefined
		}
	}

	const handler = function() {
		Object.assign(target.style, { cursor: "none" })
		Object.assign(loupe.elem.style, { display: "block", visibility: "hidden" })

		const targetRect = target.getBoundingClientRect()
		const width = targetRect.width
		const height = targetRect.height
		// left and top copied from jQuery $(offset)
		// https://j11y.io/jquery/#v=1.11.2&fn=jQuery.fn.offset
		const left = targetRect.left + (wnd?.pageXOffset || doc.documentElement.scrollLeft) - (doc.documentElement.clientLeft || 0)
		const top = targetRect.top + (wnd?.pageYOffset || doc.documentElement.scrollTop) - (doc.documentElement.clientTop || 0)
		const right = left + targetRect.width;
		const bottom = top + targetRect.height;

		Object.assign(loupe.elem.style, {
			backgroundSize: width * loupe.magnification + 'px ' + height * loupe.magnification + "px",
			backgroundImage: 'url("' + imgUrl + '")',
			width: loupe.width,
			height: loupe.height
		});
		if (loupe.shape === "circle") {
			Object.assign(loupe.elem.style, { borderRadius: "50%" })
		}

		const loupeOffset = loupe.elem.getBoundingClientRect().width / 2;

		moveHandlers.docMouseMoveHandler = function(e: MouseEvent) {
			if (e.pageX < left - loupeOffset / 6 ||
				e.pageX > right + loupeOffset / 6 ||
				e.pageY < top - loupeOffset / 6 ||
				e.pageY > bottom + loupeOffset / 6) {
				stopMouseMove()
				return
			}
			Object.assign(loupe.elem.style, { display: "block", visibility: "visible" })
			const bgPosX = -((e.pageX - left) * loupe.magnification - loupeOffset)
			const bgPosY = -((e.pageY - top) * loupe.magnification - loupeOffset)
			Object.assign(loupe.elem.style, {
				left: px(e.pageX - loupeOffset),
				top: px(e.pageY - loupeOffset),
				backgroundPosition: px(bgPosX) + " " + px(bgPosY)
			});
		}
		moveHandlers.docTouchMoveHandler = function(e: TouchEvent) {
			const t = e.touches.item(0)
			if (!t) {
				return
			}
			if (t.pageX < left - loupeOffset / 6 ||
				t.pageX > right + loupeOffset / 6 ||
				t.pageY < top - loupeOffset / 6 ||
				t.pageY > bottom + loupeOffset / 6) {
				stopTouchMove()
				return
			}
			Object.assign(loupe.elem.style, { display: "block", visibility: "visible" })
			const bgPosX = -((t.pageX - left) * loupe.magnification - loupeOffset)
			const bgPosY = -((t.pageY - top) * loupe.magnification - loupeOffset)
			Object.assign(loupe.elem.style, {
				left: px(t.pageX - loupeOffset),
				top: px(t.pageY - loupeOffset),
				backgroundPosition: px(bgPosX) + " " + px(bgPosY)
			});
		}
		doc.addEventListener("mousemove", moveHandlers.docMouseMoveHandler)
		doc.addEventListener("touchmove", moveHandlers.docTouchMoveHandler)
	}

	target.addEventListener("mouseover", handler)
	target.addEventListener("touchstart", handler)

	return () => {
		resetTouchScroll()
		stopMouseMove()
		stopTouchMove()
		target.removeEventListener("mouseover", handler)
		target.removeEventListener("touchstart", handler)
	}
}

const disableTouchScroll = (target: HTMLElement | SVGElement): (() => void) => {
	const old = target.style.touchAction
	Object.assign(target.style, { touchAction: "none" }) // https://stackoverflow.com/a/43275544/3309046
	return () => { Object.assign(target.style, { touchAction: old }) }
}
