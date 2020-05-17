// Original jQuery implementation: https://codepen.io/pixelacorn/pen/eNObea

const px = (v: number): string => v + "px"

export type LoupeOptions = {
	magnification?: number // magnification level
	width?: number | string // width of the loupe
	height?: number | string // height of the loupe
	container?: Node // containing node
	additionalClassName?: string // additional class name to add to the loupe element
	style?: Partial<CSSStyleDeclaration> // additional styles to add to the loupe element
	shape?: Shape // shape of the loupe: "rectangle" | "shape"
}

export type Shape  = "rectangle" | "circle"

export class Loupe {
	readonly magnification: number
	readonly width: string
	readonly height: string
	readonly elem: HTMLDivElement
	readonly shape: Shape

	constructor({
		magnification = 2,
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
		this.shape = shape

		this.elem = document.createElement("div")
		this.elem.classList.add("__loupe")
		if (additionalClassName !== undefined) {
			this.elem.classList.add(additionalClassName)
		}
		if (style !== undefined) {
			Object.assign(this.elem.style, style)
		}
		container.appendChild(this.elem)
	}
}

export const enableLoupe = (target: HTMLElement, imgUrl: string, loupe: Loupe) => {
	const doc = target.ownerDocument
	const wnd = doc.defaultView

	const handler = function() {
		Object.assign(target.style, { cursor: "none" })
		Object.assign(loupe.elem.style, { display: "block" })

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

		const docMouseMoveHandler = function(e: MouseEvent) {
			if (e.pageX < left - loupeOffset / 6 ||
				e.pageX > right + loupeOffset / 6 ||
				e.pageY < top - loupeOffset / 6 ||
				e.pageY > bottom + loupeOffset / 6) {
				Object.assign(loupe.elem.style, { display: "none" })
				doc.removeEventListener("mousemove", docMouseMoveHandler)
				return
			}
			const bgPosX = -((e.pageX - left) * loupe.magnification - loupeOffset)
			const bgPosY = -((e.pageY - top) * loupe.magnification - loupeOffset)
			Object.assign(loupe.elem.style, {
				left: px(e.pageX - loupeOffset),
				top: px(e.pageY - loupeOffset),
				backgroundPosition: px(bgPosX) + " " + px(bgPosY)
			});
		}
		doc.addEventListener("mousemove", docMouseMoveHandler)
	}

	target.addEventListener("mouseover", handler);
	return () => { target.removeEventListener("mouseover", handler) }
}
