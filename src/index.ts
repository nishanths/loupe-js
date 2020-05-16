const magnification = 2.5
const magnifierSize = 250

const loupe: HTMLDivElement = (() => {
	const e = document.createElement("div")
	e.classList.add("__loupe")
	return e
})()

export const init = (doc: Document = document) => {
	doc.body.appendChild(loupe)
}

export const addLoupe = (elem: HTMLElement, imgUrl: string, doc: Document = document): (() => void) => {
	const handler = () => {
		handleMouseOver(elem, imgUrl, doc)
	}
	elem.addEventListener("mouseover", handler)

	return () => {
		elem.removeEventListener("mouseover", handler)
	}
}

const handleMouseOver = (target: HTMLElement, imgUrl: string, doc: Document) => {
	Object.assign(target.style, { cursor: "none" })
	Object.assign(loupe.style, { display: "block" })

	const targetRect = target.getBoundingClientRect()
	const targetOffset = { top: targetRect.top + doc.body.scrollTop, left: targetRect.left + doc.body.scrollLeft }
	const loupeRect = loupe.getBoundingClientRect()
	const right = targetOffset.left + targetRect.width
	const bottom = targetOffset.top + targetRect.height

	Object.assign(loupe.style, {
		backgroundSize: px(targetRect.width * magnification) + " " + px(targetRect.height * magnification),
		backgroundImage: `url(${imgUrl})`,
		width: px(250),
		height: px(250),
	})

	const docMouseMoveHandler = (e: MouseEvent): void => {
		if ((e.pageX < targetOffset.left - loupeRect.width / 12) ||
			(e.pageX > right + loupeRect.width / 12) ||
			(e.pageY < targetOffset.top - loupeRect.width / 12) ||
			(e.pageY > bottom + loupeRect.width / 12)) {
			Object.assign(loupe.style, { display: "none" })
			doc.removeEventListener("mousemove", docMouseMoveHandler)
			return
		}

		const posx = (e.pageX - targetOffset.left) * magnification - loupeRect.width / 2
		const posy = (e.pageY - targetOffset.top) * magnification - loupeRect.width / 2
		Object.assign(loupe.style, {
			left: px(e.pageX - loupeRect.width / 2),
			top: px(e.pageY - loupeRect.width / 2),
			backgroundPosition: `-${px(posx)} -${px(posy)}`,
		})
	}
	doc.addEventListener("mousemove", docMouseMoveHandler)
}

const px = (v: number): string => v + "px"

const wnd = window as unknown as Window & { loupe: any }
wnd.loupe = {
	init,
	addLoupe,
}
