import { Color } from "./Color.js";

class Paper {

    private canvas: HTMLCanvasElement;
    private ctx: CanvasRenderingContext2D;
    private imageData: ImageData;

    private canvasWidth: number;
    private canvasHeight: number;
    private aspectRatio: number;

    constructor() {
        this.canvas = document.createElement("canvas");

        this.canvasWidth = window.innerWidth > 0 ? window.innerWidth : 1;
        this.canvasHeight = window.innerHeight > 0 ? window.innerHeight : 1;
        this.aspectRatio = this.canvasWidth / this.canvasHeight;

        this.canvas.width = this.canvasWidth;
        this.canvas.height = this.canvasHeight;

        document.body.insertBefore(this.canvas, null);

        const nullCtx: CanvasRenderingContext2D | null = this.canvas.getContext("2d");
        if (nullCtx == null) {
            throw new Error("[main]: nullCtx is null.");
        }

        this.ctx = nullCtx;

        this.imageData = this.ctx.createImageData(this.canvasWidth, this.canvasHeight);
    }

    public getAspectRatio(): number {
        return this.aspectRatio;
    }

    public getCanvasWidth(): number {
        return this.canvasWidth;
    }
    public getCanvasHeight(): number {
        return this.canvasHeight;
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