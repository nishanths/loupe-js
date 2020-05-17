# Loupe

An image magnifier for JavaScript. Based on this [Codepen](https://codepen.io/pixelacorn/pen/eNObea).

## Install

TODO

## Demo

https://nishanths.github.io/loupe/

## Documentation

### Basic example

```typescript
import { Loupe, LoupeOp enableLoupe } from "@nishanths/loupe"

const img = document.querySelector("img")!

const loupe = new Loupe()
enableLoupe(img, img.src, loupe)
```

### Loupe

The `Loupe` constructor constructs a loupe object. By default the loupe element
is placed at the end of `document.body`.

Pass in a `LoupeOptions` object to the constructor to customize the loupe.

All propeties are optional.

```typescript
type LoupeOptions = {
	magnification?: number // magnification level
	width?: number | string // width of the loupe
	height?: number | string // height of the loupe
	container?: Node // containing node
	additionalClassName?: string // additional class name to add to the loupe element
	style?: Partial<CSSStyleDeclaration> // additional styles to add to the loupe element
	shape?: Shape // shape of the loupe: "rectangle" | "circle"
}
```

The default values are

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

