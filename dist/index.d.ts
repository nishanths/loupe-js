export declare type LoupeOptions = {
    magnification?: number;
    width?: number | string;
    height?: number | string;
    container?: Node;
    additionalClassName?: string;
    style?: Partial<CSSStyleDeclaration>;
    shape?: Shape;
};
export declare type Shape = "rectangle" | "circle";
export declare class Loupe {
    readonly magnification: number;
    readonly width: string;
    readonly height: string;
    readonly elem: HTMLDivElement;
    readonly shape: Shape;
    readonly container: Node;
    constructor({ magnification, width, height, container, additionalClassName, style, shape }?: LoupeOptions);
    unmount(): void;
}
export declare const enableLoupe: (target: HTMLElement | SVGElement, imgUrl: string, loupe: Loupe) => () => void;
