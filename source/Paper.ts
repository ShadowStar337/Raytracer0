import { Color } from "./Color.js";

class Paper {

    canvas: HTMLCanvasElement;
    ctx: CanvasRenderingContext2D;
    imageData: ImageData;

    constructor() {
        this.canvas = document.createElement("canvas");
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        document.body.insertBefore(this.canvas, null);

        const nullCtx: CanvasRenderingContext2D | null = this.canvas.getContext("2d");
        if (nullCtx == null) {
            throw new Error("[main]: nullCtx is null.");
        }

        this.ctx = nullCtx;

        this.imageData = this.ctx.createImageData(window.innerWidth, window.innerHeight);
    }

    public getPixel(x: number, y: number): Color {
        const color: Color = new Color();

        const pixelIndex: number = y * this.imageData.width * 4 + x * 4;

        const red: number = this.imageData.data[pixelIndex + 0];
        const green: number = this.imageData.data[pixelIndex + 1];
        const blue: number = this.imageData.data[pixelIndex + 2];
        
        color.fromValues(red, green, blue);
        return color;
    }

    public setPixel(x: number, y: number, color: Color): void {
        const pixelIndex: number = y * this.imageData.width * 4 + x * 4;
        this.imageData.data[pixelIndex + 0] = color.getRed();
        this.imageData.data[pixelIndex + 1] = color.getGreen();
        this.imageData.data[pixelIndex + 2] = color.getBlue();
        this.imageData.data[pixelIndex + 3] = 255;
    }

    public draw(): void {
        this.ctx.putImageData(this.imageData, 0, 0);
    }
}

export { Paper };