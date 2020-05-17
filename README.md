# Loupe

An image magnifier for JavaScript. Based on this [Codepen](https://codepen.io/pixelacorn/pen/eNObea).

(A loupe is a small magnification device.)

Demo: https://nishanths.github.io/loupe-js/

<a href="https://nishanths.github.io/loupe-js">
	<img src="https://i.ibb.co/hRkZ1X2/Screen-Shot-2020-05-17-at-6-46-48-PM.png" alt="Screen-Shot-2020-05-17-at-6-46-48-PM" border="0">
</a>

## Install

Use npm or yarn

```
npm i --save loupe-js
```

```
yarn add loupe-js
```

If you want to evaluate the package quickly use `demo/index.js`, which has the module's
exports in `window.loupe`.

## Basic example

Import "loupe-js" and the related CSS file.

```typescript
import { Loupe, enableLoupe } from "loupe-js"
import "loupe-js/dist/style.css"

const img = document.querySelector("img")!

const loupe = new Loupe({
	magnification: 2,
	width: 250,
	height: 250,
	style: { boxShadow: "4px 5px 5px 4px rgba(0,0,0,0.5)" },
	shape: "circle",
})
enableLoupe(img, img.src, loupe)
```

## Documentation

### Loupe

The `Loupe` constructor constructs a loupe object.

Pass in a `LoupeOptions` object to the constructor to customize the loupe.

```typescript
type LoupeOptions = {
	magnification?: number // magnification level
	width?: number | string // width of the loupe
	height?: number | string // height of the loupe
	container?: Node // containing node
	additionalClassName?: string // additional class name to add to the loupe element
	style?: Partial<CSSStyleDeclaration> // additional styles to add to the loupe element
	shape?: "rectangle" | "circle" // shape of the loupe
}
```

All propeties are optional. By default the loupe element is placed at the end of `document.body`.
If the `shape` is `circle` you should use the same values for `width` and `height`.
The `additionalClassName` and `style` properties are useful to add custom styles
to the loupe element.

The default `LoupeOptions` values are

```typescript
{
	magnification: 2.25,
	width: 250,
	height: 250 / 1.6,
	container: document.body,
	additionalClassName: undefined,
	style: undefined,
	shape: "rectangle",
}
```

### enableLoupe

`enableLoupe` adds the specified `loupe` object to the `target` element. The `target`
element can be, for instance, an `<img>` element or a `<div>` element with a
`background-image`.

The `imgUrl` is the URL to the image. For example, this is the `src` property
of the `<img>` element, or the value of the `background-image` CSS property for
the `<div>` element.

```typescript
const enableLoupe: (target: HTMLElement, imgUrl: string, loupe: Loupe) => () => void;
```

`enableLoupe` returns a function that can be later be used to disable the loupe
on the target element.

## License

BSD 2-Clause
