const { Loupe, addLoupe } = window.loupe
const useRectangle = new URLSearchParams(window.location.search).get("shape") === "rectangle"

const magnification = 2

const opt = useRectangle ? {
	magnification,
} : {
	magnification,
	shape: "circle",
	width: 250,
	height: 250,
}

const l = new Loupe(opt)
const target = document.querySelector("img")
addLoupe(target, target.src, l)

