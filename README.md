# Loupe

An image magnifier for JavaScript. Based on this [Codepen](https://codepen.io/pixelacorn/pen/eNObea).

<a href="https://nishanths.github.io/loupe">
	<img src="https://i.ibb.co/hRkZ1X2/Screen-Shot-2020-05-17-at-6-46-48-PM.png" alt="Screen-Shot-2020-05-17-at-6-46-48-PM" border="0">
</a>

## Install

TODO

## Demo

https://nishanths.github.io/loupe/

## Documentation

### Basic example

```typescript
import { Loupe, enableLoupe } from "@nishanths/loupe"

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

All propeties are optional. By default the loupe element is placed at the end of `document.body`. If the `shape` is `circle` you should use the same values for `width` and `height`.

The default `LoupeOptions` values are

```typescript
{
	magnification: 2,
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

It returns a function that can be later be used to remove the loupe from the target
element.

## License

BSD 2-Clause
