const { Loupe, enableLoupe } = window.loupe
const useRectangle = new URLSearchParams(window.location.search).get("shape") === "rectangle"

const magnification = 2.25
const style = {
	borderColor: "white",
	boxShadow: "4px 5px 5px 4px rgba(0,0,0,0.5)",
}

const opt = useRectangle ? {
	magnification,
	style,
} : {
	magnification,
	shape: "circle",
	width: 250,
	height: 250,
	style,
}

const l = new Loupe(opt)
const target = document.querySelector("img")
enableLoupe(target, target.src, l)

